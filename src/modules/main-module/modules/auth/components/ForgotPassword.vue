<template>
  <div>
    <div class="mb-10 mt-10">
      <Logo :isCard="false" :width="'30%'" :height="'30%'" />
    </div>
    <div class="text-justify mt-4 pb-0">
      <v-form v-model="isValid" ref="passwordForm">
        <v-text-field
          ref="email"
          v-model="formData.email_address"
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
      </v-form>
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
import Logo from "@/components/Logo";
export default {
  name: "ForgotPassword",
  components: { Logo },
  data: function () {
    return {
      formData: {
        email_address: "",
      },
      isValid: false,
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
      if (this.$refs.passwordForm.validate()) {
        this.$store.dispatch("Auth/forgotPassword", { ...this.formData });
      }
    },
  },
};
</script>

<style scoped></style>
