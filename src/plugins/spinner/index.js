import Spinner from "./views/Spinner";
import store from "./store";

export default {
  install(Vue, options) {
    Vue.component("loader", Spinner);
    options.store.registerModule("Loader", store);
  },
};
