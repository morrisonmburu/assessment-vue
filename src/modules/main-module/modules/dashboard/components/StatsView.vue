<template>
  <div>
    <slot name="stats">
      <v-layout row wrap>
        <v-flex
          v-for="(item, i) in data"
          :key="i"
          xs6
          sm3
          xl2
          class="lg5-custom"
        >
          <v-card :elevation="5" class="ma-2" rounded>
            <v-list dense>
              <v-list-item dense>
                <v-list-item-content>
                  <div class="text-lg-h4">{{ item.count }}</div>
                  <v-list-item-subtitle>{{ item.name }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-avatar :color="item.avatarColor" size="50">
                    <v-icon :color="item.iconColor">{{ item.icon }}</v-icon>
                  </v-avatar>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card>
        </v-flex>
      </v-layout>
    </slot>
  </div>
</template>
<script>
export default {
  name: "StatsView",
  props: {
    data: Array,
  },
  data: function () {
    return {};
  },
};
</script>
<style>
@media (min-width: 960px) {
  .flex.md3.lg5-custom {
    width: 20%;
    max-width: 20%;
    flex-basis: 20%;
  }
}
</style>
