import call from "@/service/http";
import { AuthConstants } from "./index";
import AuthService from "./AuthService";

export default {
  namespaced: true,
  state: {},
  mutations: {
    MUTATE() {},
  },
  getters: {
    user: () => AuthService.user,
  },
  actions: {
    login: ({ commit }, data) => {
      commit("Dashboard/SET_LOADING", true, { root: true });
      call("post", AuthConstants.login, data)
        .then((res) => {
          AuthService.login(res.data.token, res.data.user);
          Event.$emit("ApiSuccess", "Successfully Logged in");
          commit("Dashboard/SET_LOADING", false, { root: true });
        })
        .catch((err) => {
          Event.$emit("loggedIn", false);
          commit("Dashboard/SET_LOADING", false, { root: true });
          Event.$emit("ApiError", err.response.data.message);
        });
    },

    forgotPassword: ({ commit }, data) => {
      commit("Dashboard/SET_LOADING", true, { root: true });
      call("post", AuthConstants.passwordReset, data)
        .then((res) => {
          commit("Dashboard/SET_LOADING", false, { root: true });
          Event.$emit("ApiSuccess", res.data);
        })
        .catch((err) => {
          commit("Dashboard/SET_LOADING", false, { root: true });
          Event.$emit("ApiError", err.response.data.message);
        });
    },

    resetPassword: ({ commit }, data) => {
      commit("Dashboard/SET_LOADING", true, { root: true });
      call("post", AuthConstants.password, data)
        .then((res) => {
          commit("Dashboard/SET_LOADING", false, { root: true });
          Event.$emit("ApiSuccess", "success");
          AuthService.login(res.data.token, res.data.user);
        })
        .catch((err) => {
          commit("Dashboard/SET_LOADING", false, { root: true });
          Event.$emit("ApiError", err.response.data.message);
        });
    },

    logout: () => {
      call("post", AuthConstants.logout)
        .then(() => {
          AuthService.logout();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
