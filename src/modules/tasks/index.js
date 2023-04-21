import taskRoutes from "./taskRoutes";
import taskStore from "./taskStore";

export default {
  install(Vue, options) {
    if (options.router) {
      options.router.addRoute(...taskRoutes);
    }

    if (options.store) {
      options.store.registerModule("Tasks", taskStore);
    }
  },
};
