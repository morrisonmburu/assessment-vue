import { AuthRoutes, AuthStore } from "./modules/auth";
import { landingStore } from "./modules/landing";
import {
  dashboardRoutes,
  dashboardStore,
  dashboardLinks,
} from "./modules/dashboard";

export default {
  install(Vue, options) {
    // eslint-disable-next-line no-global-assign
    Event = new Vue();

    if (options.router) {
      options.router.addRoute(...dashboardRoutes);
      options.router.addRoute(...AuthRoutes);
    }

    if (options.store) {
      options.store.registerModule("Dashboard", dashboardStore);
      options.store.registerModule("Auth", AuthStore);
      options.store.registerModule("Landing", landingStore);
      options.store.dispatch("Dashboard/setLinks", dashboardLinks);
    }
  },
};