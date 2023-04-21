<template>
  <div>
    <div class="mb-10 mt-10"><Logo /></div>
    <div class="text-justify mt-4 pb-0">
      <v-alert
        v-if="$store.getters['Auth/alert'].status"
        outlined
        dense
        border="left"
        :type="
          $store.getters['Auth/alert'].status === 'success'
            ? 'success'
            : 'error'
        "
        class="mb-10"
      >
        {{ $store.getters["Auth/alert"].message }}
      </v-alert>

      <v-text-field
        ref="email"
        v-model="formData.email"
        dense
        outlined
        @copy.prevent
        @paste.prevent
        type="email"
        prepend-inner-icon="email"
        label="Your E-mail"
        persistent-placeholder
        :rules="rules.email"
      />
    </div>

    <v-card-actions class="">
      <v-row>
        <v-col cols="12">
          <span class="">Already have an account?</span>
          <router-link :to="{ name: 'Login' }" class="text-decoration-none">
            Sign In
          </router-link>
        </v-col>
        <v-col cols="12">
          <v-btn color="primary" class="text-capitalize" block @click="reset">
            Send Password Reset Link
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </div>
</template>

<script>
import Logo from "../../../components/Logo";
export default {
  name: "ForgotPassword",
  components: { Logo },
  data: function () {
    return {
      formData: {
        email: "",
      },
    };
  },
  computed: {
    rules() {
      return {
        email: [
          (v) => !!v || "E-mail is required",
          (v) => /.+@.+/.test(v) || "E-mail must be valid",
        ],
      };
    },
  },
  methods: {
    reset: function () {
      let isValid = true;
      for (const key in this.formData) {
        isValid = isValid ? this.$refs[key].validate(true) : false;
      }
      if (isValid) {
        this.$store.dispatch("Auth/forgotPassword", { ...this.formData });
      }
    },
  },
};
</script>

<style scoped></style>