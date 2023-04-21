<template>
  <div>
    <v-card :width="isCard ? '50%' : '100%'" flat>
      <v-img :height="height" :width="width" :src="logo" contain />
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
    logoPath: {
      type: String,
      default: "logo.png",
    },
  },
  computed: {
    logo() {
      return require(`../assets/${this.logoPath}`);
    },
  },
};
</script>

<style scoped></style>
