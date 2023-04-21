import _ from "lodash";
import dashboardConstants from "./dashboardConstants";
import { AuthService } from "../auth";

export default {
  namespaced: true,
  state: {
    loading: false,
    miniDrawer: false,
    dialogLoading: false,
    links: []
  },
  mutations: {
    SET_LOADING: (state, payload) => {
      state.loading = payload;
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

  },

  getters: {
    loading: (state) => state.loading,
    dialogLoading: (state) => state.dialogLoading,
    links: (state) => {
      return _.orderBy(state.links, (link) => link.order);
    },
    miniDrawer: (state) => state.miniDrawer,
  },

  actions: {
    setMiniDrawer: ({ commit }, data) => {
      commit("SET_MINI_DRAWER", data);
    },

    setLinks: ({ commit }, data) => {
      commit("SET_LINKS", data);
    }
  },
};