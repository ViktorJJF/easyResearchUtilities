const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require('puppeteer');
const {
  timeout
} = require("../../utils/utils")
//models
const Goal = require("../../models/goals.js");

//Controllers
const goal_controller = require("../../controllers/goalController.js");
//tools
const dateTools = require("../../tools/dateTools.js");

//Goals routes
router.get("/scopus", (req, res) => {
  let query = req.query.query;
  let researches = [];
  axios
    .get("https://api.elsevier.com/content/search/scopus", {
      params: {
        apiKey: "31e902af6719cdfa49e2dd91789217bd",
        query,
        field: "prism:doi,dc:title,prism:coverDate",
      },
    })
    .then((resAxios) => {
      resAxios.data["search-results"].entry.forEach((entry) => {
        let research = {
          title: entry["dc:title"],
          abstract: "",
          doi: entry["prism:doi"],
          link: "https://doi.org/" + entry["prism:doi"],
          date: entry["prism:coverDate"],
        };
        researches.push(research);
      });
      res.status(200).json({
        ok: true,
        researches
      });
    })
    .catch((err) => {
      console.error(err);
    });
});
router.get("/renati", (req, res) => {
  let query = encodeURI(req.query.query);
  let url =
    "http://renati.sunedu.gob.pe/simple-search?location=&query=" +
    query +
    "&rpp=25&sort_by=dc.date.issued_dt&order=DESC&etal=0";
  axios
    .get(url)
    .then((resAxios) => {
      let researches = [];
      let $ = cheerio.load(resAxios.data);
      $(".item-list-item").each((i, e) => {
        let research = {
          title: $(".field-title>a", e).text(),
          abstract: "",
          doi: "",
          link: "http://renati.sunedu.gob.pe/" +
            $(".field-title a", e).attr("href"),
          date: $(".field-date", e).text(),
        };
        researches.push(research);
      });
      res.status(200).json({
        ok: true,
        researches
      });
    })
    .catch((err) => {
      console.error(err);
    });
});
router.get("/scielo", (req, res) => {
  let query = encodeURI(req.query.query);
  let url =
    "https://search.scielo.org/?q=c" +
    query +
    "&lang=es&count=30&from=0&output=site&sort=&format=summary&fb=&page=1&q=" +
    query +
    "&lang=es&page=1";
  axios
    .get(url)
    .then((resAxios) => {
      let researches = [];
      let $ = cheerio.load(resAxios.data);
      $(".item").each((i, e) => {
        let research = {
          title: $(".title", e).text(),
          abstract: "",
          doi: $(".DOIResults>a", e).text(),
          link: $(".line>a", e).attr("href"),
          date: $(".line.source>span:nth-child(3)", e).text(),
        };
        researches.push(research);
      });
      res.status(200).json({
        ok: true,
        researches
      });
    })
    .catch((err) => {
      console.error(err);
    });
});
router.get("/ieee", async (req, res) => {
  let researches = [];
  let query = encodeURI(req.query.query);
  let url = `https://ieeexplore.ieee.org/search/searchresult.jsp?queryText=${query}&highlight=true&returnFacets=ALL&returnType=SEARCH&sortType=newest`;
  //begin puppeteer
  try {
    var browser = await puppeteer.launch({
      headless: false
    });
    const page = await browser.newPage();
    //prevent css and images
    // await page.setRequestInterception(true);

    // page.on('request', (req) => {
    //   if (req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image') {
    //     req.abort();
    //   } else {
    //     req.continue();
    //   }
    // });

    await page.goto(url);
    await timeout(3000);
    researches = await page.evaluate(() => {
      let localResearches = [];
      let researchesNodes = document.querySelectorAll(".List-results-items");
      researchesNodes.forEach(researchNode => {
        let research = {
          title: researchNode.querySelector("a[_ngcontent-c23]").innerText,
          abstract: "",
          doi: "",
          link: researchNode.querySelector("a[xplmathjax]").href,
          date: researchNode.querySelector("span[xplhighlight]").innerText,
        };
        localResearches.push(research);
      });
      return localResearches;
    });
    console.log("las investigaciones: ", researches);
  } catch (error) {
    console.log("un error en puppeteer: ", error);
  } finally {
    await browser.close();
  }
  res.status(200).json({
    ok: true,
    researches
  });
});
router.post("/goals", goal_controller.goal_create);
router.put("/goal/:id", goal_controller.goal_update);
router.delete("/goal/:id", goal_controller.goal_delete);

module.exports = router;