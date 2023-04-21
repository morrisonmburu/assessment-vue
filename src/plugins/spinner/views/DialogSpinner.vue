<template>
  <v-overlay
    v-if="$store.getters['Dashboard/dialogLoading']"
    z-index="10"
    opacity=".2"
  >
    <v-progress-circular
      indeterminate
      size="70"
      width="2"
      color="loaderColor"
      class="align-self-center mt-3"
    ></v-progress-circular>
  </v-overlay>
</template>

<script>
export default {
  name: "DialogSpinner",
};
</script>

<style scoped></style>