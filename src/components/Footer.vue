<template>
  <v-footer app :inset="true" elevation="12" class="overline">
    <span style="font-size: 0.625rem"> Task Management </span>
    <v-spacer />

    <span style="font-size: 0.625rem">
      {{ appName }} © {{ new Date().getFullYear() }}
    </span>

    <v-spacer />

    <v-btn x-small text href="" target="_blank">
      Solutech Limited
      <v-icon x-small right> mdi-open-in-new </v-icon>
    </v-btn>
  </v-footer>
</template>

<script>
import { appName } from "@/environment/environment";
export default {
  name: "Footer",
  props: {
    opacity: {
      type: String,
      default: "1",
    },
  },
  computed: {
    appName() {
      return appName;
    },
  },
};
</script>

<style scoped></style>
