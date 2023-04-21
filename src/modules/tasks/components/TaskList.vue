<template>
  <!-- eslint-disable vue/valid-v-slot -->
  <v-card class="mx-auto" flat>
    <v-card-title>
      <span class="text-lg-h4"> {{ isUserTasks ? "My" : "" }} Tasks</span>
      <v-spacer />
      <v-text-field
        prepend-inner-icon="search"
        outlined
        rounded
        placeholder="Search"
        dense
        v-model="search"
      ></v-text-field>
      <v-spacer />

      <v-btn id="addIssue" color="primary" @click="addTask" v-if="!isUserTasks">
        <v-icon class="mx-2">add</v-icon>
        Add task
      </v-btn>
    </v-card-title>

    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="tasks"
        light
        calculate-widths
        :search="search"
        @dblclick:row="selectTask"
      >
        <template v-slot:item.name="{ item }">
          <a @click="selectTask($event, item)">
            <span
              class="secondary--text text--darken-4 text-capitlize"
              v-if="item.name"
              v-html="item.name"
            />
          </a>
        </template>

        <template v-slot:item.description="{ item }">
          <a @click="selectTask($event, item)">
            <span
              class="secondary--text text--darken-4 text-capitlize"
              v-if="item.description"
              v-html="
                item.description.length > 40
                  ? `${item.description.slice(0, 40)}...`
                  : item.description
              "
            />
          </a>
        </template>

        <template v-slot:item.status="{ item }">
          <v-chip
            label
            small
            :color="`${statusColor(item.status.name)} lighten-5`"
            :class="`${statusColor(
              item.status.name
            )}--text text--darken-4 text-capitlize`"
            >{{ item.status.name }}</v-chip
          >
        </template>
        <template v-slot:item.due_date="{ item }">
          <span>{{ $root.getDateFormat(item.due_date) }}</span>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-on="on" :attrs="attrs" icon>
                <v-icon size="25">more_horiz</v-icon>
              </v-btn>
            </template>

            <v-list dense class="viewTasks">
              <v-list-item
                dense
                v-for="(action, i) in actions"
                :key="i"
                :disabled="action.disabled"
                @click="action.action($event, item)"
                :class="`${action.disabled ? 'grey' : action.color}--text`"
              >
                <v-list-item-title>
                  <v-icon :color="action.disabled ? 'grey' : action.color">{{
                    action.icon
                  }}</v-icon>
                  {{ action.text }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>
<script>
// import { helper } from "@/utils";
export default {
  name: "TaskList",
  data: function () {
    return {
      search: "",
    };
  },
  beforeRouteEnter(to, from, next) {
    next((v) => {
      if (v.isUserTasks) {
        v.$store.dispatch("Task/getUserTasks");
      } else {
        v.$store.dispatch("Task/getTasks");
      }
      v.$store.dispatch("Task/getStatuses");
      v.$store.dispatch("Task/getUsers");
    });
  },
  computed: {
    headers() {
      return [
        {
          text: "No.",
          value: "id",
          align: "start",
          sortable: true,
        },
        {
          text: "name",
          value: "name",
          align: "start",
          sortable: false,
        },
        {
          text: "Description",
          value: "description",
          align: "start",
          sortable: false,
        },
        {
          text: "Due On",
          value: "due_date",
          align: "start",
          sortable: false,
        },
        {
          text: "Status",
          value: "status",
          align: "start",
          sortable: true,
        },
        {
          text: "",
          value: "actions",
          align: "end",
          sortable: true,
        },
      ];
    },
    tasks() {
      return this.$store.getters["Task/taskGetters"]("tasks");
    },
    actions: function () {
      return [
        {
          text: "Edit Task",
          icon: "edit",
          color: "primary",
          disabled: false,
          action: (event, item) => {
            this.$root.routeTo({
              name: "TaskCard",
              params: { id: parseInt(item.id) },
              query: { action: "edit" },
            });
          },
        },
        {
          text: "Assign Task",
          disabled: false,
          icon: "person_add",
          color: "primary",
          action: (event, item) => {
            this.$root.routeTo({
              name: "AssignUserTask",
              params: { id: parseInt(item.id) },
            });
          },
        },
        {
          text: "Update Status",
          icon: "edit",
          color: "primary",
          disabled: !this.isUserTasks,
          action: (event, item) => {
            this.$root.routeTo({
              name: "TaskCard",
              params: { id: parseInt(item.user_task_id) },
              query: { action: "edit", type: "my--tasks" },
            });
          },
        },
        {
          text: "Delete Task",
          disabled: false,
          icon: "delete",
          color: "error",
          action: (event, item) => {
            this.$confirm.show({
              title: "Delete Task",
              text: "Are you sure you want to delete this task?",
              onConfirm: () => {
                this.$store.dispatch("Task/deleteTask", item.id);
              },
            });
          },
        },
      ];
    },
    isUserTasks() {
      return this.$root.decryptRoute(this.$route).query.type === "my--tasks";
    },
  },
  methods: {
    updateSearch(val) {
      this.searchInput = val;
    },
    statusColor(status) {
      return this.$root.getStatusColor(status);
    },
    selectTask(event, item) {
      console.log(item);
    },
    addTask() {
      this.$router.push({ name: "TaskCard" });
    },
  },
};
</script>
<style>
@import "../styles.css";
</style>
