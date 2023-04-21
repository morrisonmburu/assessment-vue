<template>
  <v-overlay
    v-if="$store.getters['Dashboard/loading']"
    z-index="10"
    color="drawerBackground"
    opacity=".3"
  >
    <div class="d-flex flex-column">
      <v-progress-circular
        indeterminate
        size="50"
        width="3"
        color="loaderColor"
        class="align-self-center mt-3"
      ></v-progress-circular>
    </div>
  </v-overlay>
</template>

<script>
export default {
  name: "Spinner",
};
</script>

<style scoped></style>
