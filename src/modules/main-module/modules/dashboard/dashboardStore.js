import _ from "lodash";
import dashboardConstants from "./dashboardConstants";
import { call } from "@/service";
import { AuthService } from "../auth";

export default {
  namespaced: true,
  state: {
    loading: false,
    miniDrawer: false,
    dialogLoading: false,
    links: [],
    stats: {},
  },
  mutations: {
    SET_LOADING: (state, payload) => {
      state.loading = payload;
    },

    SET_DIALOG_LOADING: (state, payload) => {
      state.dialogLoading = payload;
    },

    SET_LINKS: (state, payload) => {
      if (_.findIndex(state.links, payload) === -1) {
        if (payload.access && AuthService.user) {
          if (AuthService.user.user_type === "SUPER_ADMIN") {
            state.links.push(payload);
          }
        } else {
          state.links.push(payload);
        }
      }
    },

    SET_MINI_DRAWER: (state, payload) => {
      state.miniDrawer = payload;
    },

    SET_STATS: (state, payload) => {
      state.stats = payload;
    },
  },

  getters: {
    loading: (state) => state.loading,
    dialogLoading: (state) => state.dialogLoading,
    links: (state) => {
      return _.orderBy(state.links, (link) => link.order);
    },
    miniDrawer: (state) => state.miniDrawer,
    stats: (state) => state.stats,
  },

  actions: {
    setMiniDrawer: ({ commit }, data) => {
      commit("SET_MINI_DRAWER", data);
    },

    setLinks: ({ commit }, data) => {
      commit("SET_LINKS", data);
    },

    getStats: ({ commit }) => {
      commit("SET_LOADING", true);
      call("get", dashboardConstants.stats)
        .then((res) => {
          commit("SET_STATS", res.data);
          commit("SET_LOADING", false);
        })
        .catch((err) => {
          commit("SET_LOADING", false);
          console.log(err);
        });
    },
  },
};
