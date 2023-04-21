import taskRoutes from "./taskRoutes";
import taskStore from "./taskStore";
import taskLinks from "./taskLinks";

export default {
  install(Vue, options) {
    if (options.router) {
      options.router.addRoute(...taskRoutes);
    }

    if (options.store) {
      options.store.registerModule("Task", taskStore);
      options.store.dispatch("Dashboard/setLinks", taskLinks);
    }
  },
};
