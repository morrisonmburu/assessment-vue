<template>
  <div>
    <v-card :width="isCard ? '50%' : '100%'" flat>
      <v-img
        :height="height"
        :width="width"
        src="../assets/logo.png"
        contain
      />
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Logo",
  props: {
    height: {
      type: [Number, String],
      default: () => 50,
    },
    width: {
      type: [Number, String],
      default: () => 50,
    },
    isCard: {
      type: Boolean,
      default: () => true,
    },
    rounded: {},
  },
};
</script>

<style scoped></style>