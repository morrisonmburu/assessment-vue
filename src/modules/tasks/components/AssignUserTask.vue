<template>
  <v-dialog persistent v-model="dialog" width="50%">
    <v-card class="mx-auto">
      <v-card-title class="card--title">
        Select User to Assign Task - {{ task.name }}
        <v-spacer />
        <v-btn icon large color="error" @click="$router.back()">
          <v-icon>close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-card-text class="mt-4">
        <v-autocomplete
          v-model="selected"
          outlined
          :items="users"
          :item-text="(item) => item.email_address"
          :item-value="(item) => item.id"
          clearable
          multiple
          return-object
          label="Select User"
          persistent-placeholder
          placeholder="Select User"
          chips
        />
        <v-textarea
          v-model="remarks"
          placeholder="Enter Remarks"
          persistent-placeholder
          outlined
          required
          dense
          rows="3"
        >
          <template v-slot:label>
            <span>Remarks</span>
          </template>
        </v-textarea>
      </v-card-text>
      <v-divider />
      <v-card-actions class="card--actions"
        ><v-spacer />
        <v-btn color="primary" @click="assignTask">
          Assign Task</v-btn
        ></v-card-actions
      >
      <DialogSpinnerVue />
    </v-card>
  </v-dialog>
</template>
<script>
import DialogSpinnerVue from "@/plugins/spinner/views/DialogSpinner.vue";
export default {
  name: "AssignUserTask",
  components: {
    DialogSpinnerVue,
  },
  data: function () {
    return {
      isValid: false,
      dialog: true,
      selected: [],
      remarks: "",
    };
  },
  beforeRouteEnter(to, from, next) {
    next((v) => {
      if (to.params.id) {
        v.$store.dispatch("Task/getTask", to.params.id);
      }
    });
  },
  computed: {
    task() {
      return this.$store.getters["Task/taskGetters"]("task");
    },
    users() {
      return this.$store.getters["Task/taskGetters"]("users");
    },
  },
  methods: {
    assignTask() {
      this.$store.dispatch("Task/createUserTask", {
        ...this.task,
        remarks: this.remarks,
        users: this.selected,
      });
    },
  },
  watch: {},
};
</script>
<style>
@import url("../styles.css");
</style>
