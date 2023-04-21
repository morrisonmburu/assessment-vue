<template>
  <v-app id="inspire" style="background-color: #f0f0f0">
    <AppBarTopVue />
    <DrawerBarVue />
    <div>
      <router-view name="view" />
      <router-view name="action" />
    </div>
    <spinner />
    <confirmation />
    <Footer />
  </v-app>
</template>

<script>
import Footer from "@/components/Footer";
import Spinner from "@/plugins/spinner/views/Spinner";
import { AuthService } from "../../auth";
/** components */
import AppBarTopVue from "../components/Bars/AppBarTop.vue";
import DrawerBarVue from "../components/Bars/DrawerBar.vue";
export default {
  name: "DashboardLayout",
  components: {
    Spinner,
    Footer,
    AppBarTopVue,
    DrawerBarVue,
  },
  data: () => ({
    drawer: null,
    leftDrawer: false,
    mini: false,
    selectedItem: 0,
    fav: true,
    menu: false,
    message: false,
    hints: true,
  }),
  computed: {
    user() {
      return this.$store.getters["Auth/user"];
    },
    links() {
      return this.$store.getters["Dashboard/links"]
        .filter((item) => !item.disabled && item.title !== "Administration")
        .map((link) => {
          link.sublinks = link.sublinks || [];
          return link;
        });
    },
  },
  methods: {
    logout() {
      AuthService.logout();
    },
  },
};
</script>

<style>
@import url("../styles.css");
</style>
