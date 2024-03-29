import "@mdi/font/css/materialdesignicons.css"; //material design icons
import Vue from "vue";
import Vuetify from "vuetify/lib";
import theme from "./theme";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi",
  },
  theme,
});
