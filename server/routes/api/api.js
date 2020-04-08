const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
//models
const Goal = require("../../models/goals.js");

//Controllers
const goal_controller = require("../../controllers/goalController.js");
//tools
const dateTools = require("../../tools/dateTools.js");

//Goals routes
router.get("/scopus", (req, res) => {
  let query = req.query.query;
  axios
    .get("https://api.elsevier.com/content/search/scopus", {
      params: {
        apiKey: "31e902af6719cdfa49e2dd91789217bd",
        query,
        field: "prism:doi,dc:title,prism:coverDate",
      },
    })
    .then((resAxios) => {
      let researches = [];
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
      res.status(200).json({ ok: true, researches });
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
          link:
            "http://renati.sunedu.gob.pe/" +
            $(".field-title a", e).attr("href"),
          date: $(".field-date", e).text(),
        };
        researches.push(research);
        console.log(research);
      });
      res.status(200).json({ ok: true, researches });
    })
    .catch((err) => {
      console.error(err);
    });
});
router.get("/scielo", (req, res) => {
  console.log("estoy en scielo");
  let query = encodeURI(req.query.query);
  console.log("el query: ", query);
  let url =
    "https://search.scielo.org/?q=c" +
    query +
    "&lang=es&count=30&from=0&output=site&sort=&format=summary&fb=&page=1&q=" +
    query +
    "&lang=es&page=1";
  console.debug("el linL ", url);
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
        console.log(research);
        researches.push(research);
      });
      res.status(200).json({ ok: true, researches });
    })
    .catch((err) => {
      console.error(err);
    });
});
router.post("/goals", goal_controller.goal_create);
router.put("/goal/:id", goal_controller.goal_update);
router.delete("/goal/:id", goal_controller.goal_delete);

module.exports = router;
