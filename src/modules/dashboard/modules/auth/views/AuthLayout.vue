<template>
  <v-app>
    <v-main class="d-flex main--landing">
      <router-view />
    </v-main>
    <spinner />
  </v-app>
</template>

<script>
import Spinner from "@/plugins/spinner/views/Spinner";
import { AuthService } from "../index";
export default {
  name: "AuthLayout",
  components: {
    Spinner,
  },
  beforeRouteEnter(to, from, next) {
    next((v) => {
      if (AuthService.check()) {
        v.$router.push({ name: "Main" });
      }
    });
  },
  computed: {
    auth() {
      return AuthService;
    },
  },
};
</script>

<style scoped>
@import url("../styles.css");
</style>