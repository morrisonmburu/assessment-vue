<template>
  <v-app-bar app elevation="0" color="topbar" height="50%">
    <v-btn icon color="topbarText" @click="closeDrawer">
      <v-icon>apps</v-icon>
    </v-btn>
    <div
      class="topbarText--text text--darken-1 text-body-1 text-no-wrap font-weight-medium"
    >
     Solutech <span class="mx-2">|</span> Task Management
    </div>
    <v-spacer />

    <v-menu
      offset-y
      left
      nudge-bottom="14"
      min-width="230"
      content-class="user-profile-menu-content"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-badge
          bottom
          color="success"
          overlap
          offset-x="12"
          offset-y="12"
          class="ms-4"
          dot
        >
          <v-avatar size="40px" v-bind="attrs" v-on="on">
            <v-img
              :src="require('@/assets/avatar.png')"
            ></v-img>
          </v-avatar>
        </v-badge>
      </template>
      <v-list>
        <div class="pb-3 pt-2">
          <v-badge
            bottom
            color="success"
            overlap
            offset-x="12"
            offset-y="12"
            class="ms-4"
            dot
          >
            <v-avatar size="40px">
              <v-img
                :src="require('@/assets/avatar.png')"
              ></v-img>
            </v-avatar>
          </v-badge>
        </div>

        <v-divider></v-divider>

        <!-- Logout -->
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title
              ><v-btn text class="account-btn" @click="logout"
                ><v-icon size="22">logout</v-icon>Logout</v-btn
              ></v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>
<script>
import { AuthService } from "@/packages/dashboard/modules/auth";
export default {
  name: "AppBarTop",
  data: function () {
    return {
        //
    };
  },
  computed: {
    user() {
      return AuthService.user;
    },
    mini() {
      return this.$store.getters["Dashboard/miniDrawer"];
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("Auth/logout");
    },
    closeDrawer() {
      this.$store.dispatch("Dashboard/setMiniDrawer", !this.mini);
    },
  },
};
</script>
<style>
.v-app-bar-title__content {
  width: 300px !important;
}
</style>