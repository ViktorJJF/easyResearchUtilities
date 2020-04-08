import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: require("./views/dashboard.vue").default,
      children: [
        {
          path: "/notas-bruses",
          name: "brusesNotes",
          component: require("./views/brusesNotes.vue").default,
        },
        {
          path: "/busqueda-bibliografia",
          name: "bibliography",
          component: require("@/views/Bibliography.vue").default,
        },
      ],
    },
  ],
});
