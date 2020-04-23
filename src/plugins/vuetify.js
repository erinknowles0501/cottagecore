// src/plugins/vuetify.js

import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

const opts = {
  theme: {
    dark: true,
    themes: {
      light: {
        primary: "#583948",
        secondary: "#001122",
        accent: "#8c9eff",
        error: "#b71c1c"
      },
      dark: {
        primary: "#7B1B44",
        secondary: "#583948",
        accent: "#8c9eff",
        error: "#b71c1c"
      }
    }
  }
};

export default new Vuetify(opts);
