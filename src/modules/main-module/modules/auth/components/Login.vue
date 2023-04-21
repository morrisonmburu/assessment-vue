<template>
  <div>
    <div class="mt-n5 mb-10"><Logo /></div>
    <div class="text-lg-h5 primary--text font-weight-bold my-2">Login,</div>
    <div class="text-body-2 primary--text font-weight-bold my-2">
      Welcome back, please login to your account
    </div>
    <v-form ref="loginForm" v-model="isValid">
      <v-text-field
        ref="email"
        v-model="formData.email"
        @copy.prevent
        outlined
        persistent-placeholder
        placeholder=""
        prepend-inner-icon="email"
        :rules="rules.email"
        dense
        @keyup.enter="login()"
      >
        <template v-slot:label>
          <span class="text-body-1 font-weight-bold">Your e-mail</span>
        </template>
      </v-text-field>

      <v-text-field
        ref="password"
        v-model="formData.password"
        dense
        outlined
        @copy.prevent
        persistent-placeholder
        prepend-inner-icon="vpn_key"
        :type="showPassword ? 'text' : 'password'"
        :rules="rules.password"
        @keyup.enter="login()"
      >
        <template v-slot:append>
          <v-btn @click="showPassword = !showPassword" icon>
            <v-icon>{{
              showPassword ? "visibility" : "visibility_off"
            }}</v-icon>
          </v-btn>
        </template>
        <template v-slot:label>
          <span class="text-body-1 font-weight-bold">Your Password</span>
        </template>
      </v-text-field>
      <div>
        <v-switch label="Remember Me" class="me-3 mt-1 forgot-text" inset
          >Remember
        </v-switch>
      </div>
    </v-form>
    <div class="mt-1" v-if="!submitting">
      <v-btn block color="primary text-capitalize" width="100%" @click="login">
        <v-icon class="mx-2"> mdi-lock-open-outline </v-icon>
        <div class="login-text">Login</div>
      </v-btn>
    </div>
    <div class="mt-1" v-if="submitting">
      <v-btn color="success" class="text-capitalize" disabled width="100%">
        <v-progress-circular
          indeterminate
          color="primary"
          size="20"
          class="mx-2"
          width="2"
        />
        Signing in...Please wait
      </v-btn>
    </div>
    <div class="text-center mt-2">
      <!-- forgot link -->
      <router-link
        :to="{ name: 'forgotPassword' }"
        class="mt-1 text-decoration-none text-body-1 font-weight-bold"
        >Forgot Password?
      </router-link>
    </div>
  </div>
</template>

<script>
import Logo from "@/components/Logo";
export default {
  name: "Login",
  components: { Logo },
  data: function () {
    return {
      submitting: false,
      isValid: false,
      showPassword: false,
      message: [
        "Enter valid Email address",
        "Enter valid Password",
        "Click on <strong>LOGIN</strong> button",
      ],
      formData: {
        email: "",
        password: "",
      },
    };
  },
  mounted() {
    Event.$on("loggedIn", (val) => {
      this.submitting = val;
    });
    let message = window.localStorage.getItem("sessionExpiry");
    if (message) {
      this.$toast.info(message, {
        timeout: 0,
        position: "bottom-center",
        className: "toast",
      });
    } else {
      return null;
    }
    window.addEventListener("keyup", (event) => {
      if (event.keycode === 13) {
        this.login();
      }
    });
  },
  computed: {
    rules() {
      return {
        email: [
          (v) => !!v || "E-mail is required",
          (v) => /.+@.+/.test(v) || "E-mail must be valid",
        ],
        password: [(v) => !!v || "Password is required"],
      };
    },
  },
  methods: {
    login: function () {
      this.submitting = true;
      if (!this.isValid) {
        this.$refs.loginForm.validate();
        this.submitting = false;
      } else {
        this.$store.dispatch("Auth/login", { ...this.formData });
      }
    },
  },
};
</script>

<style scoped>
@import url("../styles.css");
</style>
