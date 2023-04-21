import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: "#064e9e",
        secondary: "#60bdc7",
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
        topbar: "#d7eafc",
        topbarText: "#064e9e",
        drawerBackground: "#064e9e",
        loaderColor: "#064e9e",
        loginBackground: "#d7eafc",
        misc: "#ffaf74",
        mainBackground: "#e9f4fe",
      },
    },
  },
  icons: {
    iconfont: "md",
  },
});
