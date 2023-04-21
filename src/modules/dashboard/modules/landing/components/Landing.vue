<template>
  <div flat class="d-flex justify-center my-10">
    <div class="top--left--landing"></div>
    <div class="top--right--landing"></div>
    <v-card flat class="mx-auto landing--card" width="70%" height="80%">
      <v-row no-gutters>
        <v-col cols="6">
          <v-card flat class="d-flex justify-center landing--card--left">
            <v-card flat class="pa-2 my-10" width="80%">
              <router-view />
            </v-card>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card
            flat
            color="loginBackground"
            class="landing--card--right"
            tile
            width="100%"
            height="100%"
          >
            <LoginSVG />
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import LoginSVG from "./LoginSVG.vue";
export default {
  name: "LandingComponent",
  data: function () {
    return {
      //
    };
  },
  components: {
    LoginSVG,
  },
};
</script>

<style>
@import url("../styles.css");
</style>