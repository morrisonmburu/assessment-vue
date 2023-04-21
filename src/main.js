import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueI18n from "vue-i18n";
/** misc npm packages */
import "material-design-icons-iconfont/dist/material-design-icons.css";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
/** global mixins */
import {
  listener,
  DataMixin,
  RouteMixin,
  DateMixin,
} from "@/modules/mixin";
/** app plugins */
import vuetify from "./plugins/vuetify";
import appAlert from "@/plugins/appAlert";
import { filters } from "@/utils";
import confirmation from "@/plugins/confirmation";
/** app modules */
import dashboard from "@/modules/dashboard";
import tasks from "@/modules/tasks";

Vue.config.productionTip = false;

window.Event = new Vue();

const options = {
  store,
  router,
};

filters.forEach((f) => {
  Vue.filter(f.name, f.execute);
});

Vue.use(VueEllipseProgress);
Vue.use(Toast);
Vue.use(confirmation);
Vue.use(appAlert);
Vue.use(VueI18n);

Vue.use(dashboard, options);
Vue.use(tasks, options);

new Vue({
  router,
  store,
  vuetify,
  mixins: [listener, DataMixin, RouteMixin, DateMixin],
  render: (h) => h(App),
}).$mount("#app");
