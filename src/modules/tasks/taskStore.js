import { call } from "@/service";
import taskConstants from "./taskConstants";

export default {
  namespaced: true,
  state: {
    tasks: [],
    user_tasks: [],
    task: {},
    user_task: {},
  },
  mutations: {
    MUTATE: (state, payload) => {
      state[payload.state] = payload.data;
    },
  },
  getters: {
    taskGetters: (state) => (val) => state[val],
  },
  actions: {
    getTasks: ({ commit }) => {
      commit("Dashboard/SET_LOADING", true, { root: true });
      call("get", taskConstants.tasks)
        .then((res) => {
          commit("MUTATE", { state: "tasks", data: res.data });
          commit("Dashboard/SET_LOADING", false, { root: true });
        })
        .catch((err) => {
          commit("Dashboard/SET_LOADING", false, { root: true });
          Event.$emit("ApiError", err.response.data.message);
        });
    },
    getUserTasks: ({ commit }) => {
      commit("Dashboard/SET_LOADING", true, { root: true });
      call("get", taskConstants.user_tasks)
        .then((res) => {
          commit("MUTATE", { state: "user_tasks", data: res.data });
          commit("Dashboard/SET_LOADING", false, { root: true });
        })
        .catch((err) => {
          commit("Dashboard/SET_LOADING", false, { root: true });
          Event.$emit("ApiError", err.response.data.message);
        });
    },
    getTask: ({ commit }, id) => {
      commit("Dashboard/SET_LOADING", true, { root: true });
      call("get", `${taskConstants.tasks}/${id}`)
        .then((res) => {
          commit("MUTATE", { state: "task", data: res.data });
          commit("Dashboard/SET_LOADING", false, { root: true });
        })
        .catch((err) => {
          commit("Dashboard/SET_LOADING", false, { root: true });
          Event.$emit("ApiError", err.response.data.message);
        });
    },
    getUserTask: ({ commit }, id) => {
      commit("Dashboard/SET_LOADING", true, { root: true });
      call("get", `${taskConstants.user_tasks}/${id}`)
        .then((res) => {
          commit("MUTATE", { state: "user_task", data: res.data });
          commit("Dashboard/SET_LOADING", false, { root: true });
        })
        .catch((err) => {
          commit("Dashboard/SET_LOADING", false, { root: true });
          Event.$emit("ApiError", err.response.data.message);
        });
    },
    createTask: ({ commit }, data) => {
      commit("Dashboard/SET_LOADING", true, { root: true });
      call("post", taskConstants.tasks, data)
        .then((res) => {
          commit("Dashboard/SET_LOADING", false, { root: true });
          Event.$emit("ApiSuccess", res.data);
        })
        .catch((err) => {
          commit("Dashboard/SET_LOADING", false, { root: true });
          Event.$emit("ApiError", err.response.data.message);
        });
    },
    createUserTask: ({ commit }, data) => {
      commit("Dashboard/SET_LOADING", true, { root: true });
      call("post", taskConstants.user_tasks, data)
        .then((res) => {
          commit("Dashboard/SET_LOADING", false, { root: true });
          Event.$emit("ApiSuccess", res.data);
        })
        .catch((err) => {
          commit("Dashboard/SET_LOADING", false, { root: true });
          Event.$emit("ApiError", err.response.data.message);
        });
    },
    updateTask: ({ commit }, data) => {
      commit("Dashboard/SET_LOADING", true, { root: true });
      call("patch", `${taskConstants.tasks}/${data.id}`, data)
        .then((res) => {
          commit("Dashboard/SET_LOADING", false, { root: true });
          Event.$emit("ApiSuccess", res.data);
        })
        .catch((err) => {
          commit("Dashboard/SET_LOADING", false, { root: true });
          Event.$emit("ApiError", err.response.data.message);
        });
    },
    updateUserTask: ({ commit }, data) => {
      commit("Dashboard/SET_LOADING", true, { root: true });
      call("patch", `${taskConstants.user_tasks}/${data.id}`, data)
        .then((res) => {
          commit("Dashboard/SET_LOADING", false, { root: true });
          Event.$emit("ApiSuccess", res.data);
        })
        .catch((err) => {
          commit("Dashboard/SET_LOADING", false, { root: true });
          Event.$emit("ApiError", err.response.data.message);
        });
    },
    deleteTask: ({ commit }, id) => {
      commit("Dashboard/SET_LOADING", true, { root: true });
      call("delete", `${taskConstants.tasks}/${id}`)
        .then((res) => {
          commit("Dashboard/SET_LOADING", false, { root: true });
          Event.$emit("ApiSuccess", res.data);
        })
        .catch((err) => {
          commit("Dashboard/SET_LOADING", false, { root: true });
          Event.$emit("ApiError", err.response.data.message);
        });
    },
    deleteUserTask: ({ commit }, id) => {
      commit("Dashboard/SET_LOADING", true, { root: true });
      call("delete", `${taskConstants.user_tasks}/${id}`)
        .then((res) => {
          commit("Dashboard/SET_LOADING", false, { root: true });
          Event.$emit("ApiSuccess", res.data);
        })
        .catch((err) => {
          commit("Dashboard/SET_LOADING", false, { root: true });
          Event.$emit("ApiError", err.response.data.message);
        });
    },
  },
};
