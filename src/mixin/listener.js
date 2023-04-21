const listener = {
  mounted: function () {
    Event.$on("ApiError", (message) => {
      this.$toast.error(message, {
        position: "top-center",
        timeout: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: false,
        closeButton: "button",
        icon: true,
        rtl: false,
      });
    });
    Event.$on("ApiSuccess", (message) => {
      this.$toast.success(message, {
        position: "top-center",
        timeout: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: false,
        closeButton: "button",
        icon: true,
        rtl: false,
      });
    });
    Event.$on("ApiInfo", (message) => {
      this.$toast.info(message, {
        position: "top-center",
        timeout: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: false,
        closeButton: "button",
        icon: true,
        rtl: false,
      });
    });

    Event.$on("ApiWarning", (message) => {
      this.$toast.warning(message, {
        position: "top-center",
        timeout: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: false,
        closeButton: "button",
        icon: true,
        rtl: false,
      });
    });

    Event.$on("reload", () => {
      this.$router.go();
    });

    Event.$on("refetch", (action) => {
      this.$store.dispatch(`${action}`);
    });

    Event.$on("back", () => {
      this.$router.back();
    });

    Event.$on("route-change", (args) => {
      this.$router.replace({ name: args.name });
    });

    Event.$on("back-landing", () => {
      window.location.href = "/dashboard";
    });
  },
};
export default listener;