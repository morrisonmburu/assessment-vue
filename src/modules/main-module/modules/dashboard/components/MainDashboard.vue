<template>
  <div>
    <v-card class="mx-auto" flat>
      <stats-view-vue :data="myStats" />
    </v-card>
    <v-row class="mt-2">
      <v-col cols sm="12" md="6">
        <v-card class="mx-auto">
          <pie-chart-vue :pieData="myStatsGraph" :id="'myStatsPie'" />
        </v-card>
      </v-col>
      <v-col cols sm="12" md="6">
        <v-card class="mx-auto">
          <pie-chart-vue :pieData="allStatsGraph" :id="'allStatsPie'" />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import PieChartVue from "./charts/PieChart.vue";
import StatsViewVue from "./StatsView.vue";
export default {
  name: "MainDashboard",
  components: {
    StatsViewVue,
    PieChartVue,
  },
  data() {
    return {};
  },
  beforeRouteEnter(to, from, next) {
    next((v) => {
      v.$store.dispatch("Dashboard/getStats");
    });
  },
  computed: {
    stats() {
      return this.$store.getters["Dashboard/stats"];
    },
    myStats() {
      return this.stats.tasks
        ? [
            {
              count: this.stats.tasks,
              name: "All Tasks",
              avatarColor: "light-blue lighten-4",
              iconColor: "light-blue darken-4",
              icon: "task",
            },
            {
              count: this.stats.assignedtasks,
              name: "All Assigned Tasks",
              avatarColor: "light-blue lighten-4",
              iconColor: "light-blue darken-4",
              icon: "task",
            },
            ...Object.keys(this.stats.mystatus).map((item) => {
              return {
                count: this.stats.mystatus[item],
                name: `${item} Tasks`,
                avatarColor: `${this.$root.getStatusColor(item)} lighten-4`,
                iconColor: `${this.$root.getStatusColor(item)} darken-4`,
                icon: "task",
              };
            }),
          ]
        : [];
    },
    myStatsGraph() {
      return this.stats.mystatus
        ? {
            title: "My Tasks",
            labels: Object.keys(this.stats.mystatus).map((item) => {
              return item;
            }),
            data: Object.keys(this.stats.mystatus).map((item) => {
              return this.stats.mystatus[item];
            }),
            colors: Object.keys(this.stats.mystatus).map((item) => {
              return this.$root.getStatusChartColor(item);
            }),
          }
        : {};
    },
    allStatsGraph() {
      return this.stats.allstatus
        ? {
            title: "All Tasks",
            labels: Object.keys(this.stats.allstatus).map((item) => {
              return item;
            }),
            data: Object.keys(this.stats.allstatus).map((item) => {
              return this.stats.allstatus[item];
            }),
            colors: Object.keys(this.stats.allstatus).map((item) => {
              return this.$root.getStatusChartColor(item);
            }),
          }
        : {};
    },
  },
};
</script>
