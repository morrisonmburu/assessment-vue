<template>
  <div>
    <div class="mb-10"><Logo /></div>
    <div class="text-justify mt-4 pb-0">
      <v-form ref="resetPasswordForm" @submit.prevent="reset">
        <v-alert type="info" text>
          You're Almost there, Create a new Password to login
        </v-alert>
        <v-text-field
          v-model="formData.password"
          dense
          required
          @copy.prevent
          @paste.prevent
          outlined
          :type="passwordShow ? 'text' : 'password'"
          label="New Password"
          persistent-placeholder
          placeholder="Enter a secure password"
          :rules="rules.password"
          :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="passwordShow = !passwordShow"
        >
          <template v-slot:message="{ message }">
            <ul class="my-1">
              <li
                class="my-1"
                v-for="(item, i) in formatMessage(message)"
                :key="i"
              >
                {{ item }}
              </li>
            </ul>
          </template>
        </v-text-field>

        <v-text-field
          v-model="formData.confirmPassword"
          dense
          required
          outlined
          @copy.prevent
          @paste.prevent
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          label="Confirm Password"
          persistent-placeholder
          placeholder="Enter Password again"
          :rules="rules.confirmPassword"
          @click:append="showPassword = !showPassword"
        />
      </v-form>
    </div>

    <div class="">
      <v-row>
        <v-col cols="12">
          <v-btn v-if="!submitting" color="primary" block @click="reset">
            Submit
          </v-btn>
          <v-btn v-if="submitting" color="primary" block
            ><i class="sync loading-button-spinner"></i>
            Processing...Please Wait
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import Logo from "../../../components/Logo";
export default {
  name: "SetPassword",
  components: {
    Logo,
  },
  data: function () {
    return {
      submitting: false,
      formData: {
        password: "",
        token: "",
        confirmPassword: "",
      },
      showPassword: false,
      passwordShow: false,
    };
  },
  computed: {
    rules() {
      return {
        password: [
          (v) => !!v || "Password required",
          (v) =>
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#~^()`.,;:{}_/%*?&])[A-Za-z\d@$!#~^()`.,;:{}_/%*?&]{8,16}$/.test(
              v
            ) ||
            "Password should contain: Minimum 8 and maximum 16 characters, at least one uppercase letter, one lowercase letter, one number and one special character(@$!#~^()`.,;:{}_/%*?&)",
        ],
        confirmPassword: [
          (v) => !!v || "Password is required",
          (v) => v === this.formData.password || "Password does not match",
        ],
      };
    },
  },
  methods: {
    formatMessage(message) {
      return message.split(",");
    },
    reset: function () {
      this.submitting = true;
      if (!this.$refs.resetPasswordForm.validate()) {
        this.submitting = false;
      } else {
        this.formData.token = this.$route.params.token;
        this.$store.dispatch("Auth/resetPassword", { ...this.formData });
        setTimeout(() => {
          this.submitting = false;
        }, 5000);
      }
    },
  },
};
</script>

<style scoped></style>