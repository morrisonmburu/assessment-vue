<template>
  <v-navigation-drawer
    app
    prominent
    left
    :mini-variant="$vuetify.breakpoint.mdAndUp ? mini : false"
    class="drawerBackground darken2 fill-height"
    v-model="drawer"
    elevation="0"
  >
    <div class="d-flex justify-center mt-3">
      <v-avatar :size="mini ? '40' : '80'">
        <Logo :width="'15%'" :height="'15%'" :isCard="false" />
      </v-avatar>
    </div>
    <v-list flat>
      <div v-for="(item, i) in links" :key="i">
        <v-list-group
          v-if="item.sublinks"
          class="white--text"
          v-model="item.active"
        >
          <template v-slot:activator>
            <v-list-item-icon>
              <v-icon color="white">{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </template>
          <v-list-item-group
            color="topbar"
            class="white--text"
            active-class="drawer--active"
          >
            <v-list-item
              v-for="(sub, s) in item.sublinks"
              :key="s"
              :to="sub.to"
              class="white--text"
            >
              <v-list-item-icon :class="!mini ? 'mr-2 ml-6' : 'mr-2'">
                <v-icon color="white">{{ sub.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                {{ sub.title }}
              </v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list-group>

        <v-list-item-group
          v-if="!item.sublinks"
          color="topbar"
          class="white--text"
          active-class="drawer--active"
        >
          <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
              <v-list-item
                :to="item.to"
                v-on="on"
                v-bind="attrs"
                class="white--text"
              >
                <v-list-item-icon>
                  <v-icon color="white">{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </template>
            <span>
              {{ item.title }}
            </span>
          </v-tooltip>
        </v-list-item-group>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import Logo from "@/packages/dashboard/components/Logo.vue";
export default {
  name: "DrawerBar",
  components: {
    Logo,
  },
  data: function () {
    return {
      drawer: true,
    };
  },
  computed: {
    links() {
      return this.$store.getters["Dashboard/links"];
    },
    mini() {
      return this.$store.getters["Dashboard/miniDrawer"];
    },
  },
  methods: {
    closeDrawer() {
      this.$store.dispatch("Dashboard/setMiniDrawer", !this.mini);
    },
  },
};
</script>