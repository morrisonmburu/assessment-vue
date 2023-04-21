<template>
  <v-dialog persistent v-model="dialog" width="50%">
    <v-card class="mx-auto">
      <v-card-title class="card--title">
        <span v-if="isUserTasks">My Task</span>
        <span v-else>{{ isEdit ? "Edit" : "Create" }} Task</span>
        <v-spacer />
        <v-btn icon large color="error" @click="$router.back()">
          <v-icon>close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-form ref="taskForm" v-model="isValid" class="mt-4">
          <v-text-field
            v-model="formData.name"
            :rules="rules.name"
            placeholder="Enter Task Name"
            persistent-placeholder
            outlined
            required
            :readonly="isUserTasks"
            dense
          >
            <template v-slot:label>
              <span>Name</span>
              <span class="red--text">*</span>
            </template>
          </v-text-field>
          <v-textarea
            v-model="formData.description"
            :rules="rules.description"
            placeholder="Enter Task Description"
            persistent-placeholder
            outlined
            required
            dense
            :readonly="isUserTasks"
            rows="3"
          >
            <template v-slot:label>
              <span>Description</span>
              <span class="red--text">*</span>
            </template>
          </v-textarea>
          <v-menu
            v-model="dueDateMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="formData.due_date"
                :rules="rules.due_date"
                placeholder="Enter Due Date"
                persistent-placeholder
                outlined
                required
                dense
                :readonly="isUserTasks"
                v-bind="attrs"
                v-on="on"
              >
                <template v-slot:label>
                  <span>Due Date</span>
                  <span class="red--text">*</span>
                </template>
              </v-text-field>
            </template>
            <v-date-picker
              v-model="formData.due_date"
              no-title
              scrollable
              :min="today"
              @input="dueDateMenu = false"
            />
          </v-menu>
          <v-autocomplete
            v-model="formData.status"
            :items="statuses"
            :rules="rules.status"
            placeholder="Select Status"
            persistent-placeholder
            outlined
            v-if="isUserTasks"
            required
            dense
            :item-text="(item) => item.name"
            :item-value="(item) => item.id"
          >
            <template v-slot:label>
              <span>Select Status</span>
            </template>
          </v-autocomplete>
        </v-form>
      </v-card-text>
      <v-divider />
      <v-card-actions class="card--actions"
        ><v-spacer />
        <v-btn color="primary" @click="saveTask">
          <v-icon class="mx-2">save</v-icon>
          Save</v-btn
        ></v-card-actions
      >
      <DialogSpinnerVue />
    </v-card>
  </v-dialog>
</template>
<script>
import DialogSpinnerVue from "@/plugins/spinner/views/DialogSpinner.vue";
export default {
  name: "TaskCard",
  components: {
    DialogSpinnerVue,
  },
  data: function () {
    return {
      isValid: false,
      dialog: true,
      dueDateMenu: false,
      today: new Date().toISOString().substr(0, 10),
      formData: {
        name: "",
        description: "",
        due_date: "",
      },
    };
  },
  beforeRouteEnter(to, from, next) {
    next((v) => {
      if (to.params.id) {
        if (v.isUserTasks) {
          v.$store.dispatch("Task/getUserTask", to.params.id);
        } else {
          v.$store.dispatch("Task/getTask", to.params.id);
        }
      }
    });
  },
  computed: {
    rules: function () {
      return {
        name: [
          (v) => !!v || "Name is required",
          (v) => v.length <= 255 || "Name must be less than 100 characters",
        ],
        description: [
          (v) => !!v || "Description is required",
          (v) =>
            v.length <= 255 || "Description must be less than 255 characters",
        ],
        due_date: [(v) => !!v || "Due Date is required"],
      };
    },
    isEdit() {
      const query = this.$root.decryptRoute(this.$route).query;
      return query ? query.action === "edit" : false;
    },
    task() {
      return this.$store.getters["Task/taskGetters"]("task");
    },
    isUserTasks() {
      return this.$root.decryptRoute(this.$route).query.type === "my--tasks";
    },
    statuses() {
      return this.$store.getters["Task/taskGetters"]("statuses");
    },
  },
  methods: {
    saveTask: function () {
      if (this.$refs.taskForm.validate()) {
        let data = this.$root.prepareFormData({ ...this.formData });
        if (this.isEdit) {
          data.id = this.task.id;
          data.formData = data;
          if (this.isUserTasks) {
            this.$store.dispatch("Task/updateUserTask", data);
          } else {
            this.$store.dispatch("Task/updateTask", data);
          }
        } else {
          this.$store.dispatch("Task/createTask", data);
        }
      }
    },
  },
  watch: {
    task: {
      handler(val) {
        if (val) {
          this.formData = { ...val };
          this.formData.due_date = this.$root.dashedDateFrom(val.due_date);
        }
      },
      deep: true,
    },
  },
};
</script>
<style>
@import url("../styles.css");
</style>
