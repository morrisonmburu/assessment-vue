import { call } from "@/service";
import taskConstants from "./taskConstants";

export default {
  namespaced: true,
  state: {
    tasks: [],
    task: {},
    statuses: [],
    users: [],
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
          commit("MUTATE", { state: "tasks", data: res.data });
          commit("Dashboard/SET_LOADING", false, { root: true });
        })
        .catch((err) => {
          commit("Dashboard/SET_LOADING", false, { root: true });
          Event.$emit("ApiError", err.response.data.message);
        });
    },
    getTask: ({ commit }, id) => {
      commit("Dashboard/SET_LOADING", true, { root: true });
      call("get", taskConstants.showTask(id))
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
          commit("MUTATE", { state: "task", data: res.data });
          commit("Dashboard/SET_LOADING", false, { root: true });
        })
        .catch((err) => {
          commit("Dashboard/SET_LOADING", false, { root: true });
          Event.$emit("ApiError", err.response.data.message);
        });
    },
    createTask: ({ commit }, data) => {
      commit("Dashboard/SET_DIALOG_LOADING", true, { root: true });
      call("post", taskConstants.tasks, data)
        .then(() => {
          commit("Dashboard/SET_DIALOG_LOADING", false, { root: true });
          Event.$emit("ApiSuccess", "Task created successfully");
          Event.$emit("back");
        })
        .catch((err) => {
          commit("Dashboard/SET_DIALOG_LOADING", false, { root: true });
          Event.$emit("ApiError", err.response.data.message);
        });
    },
    createUserTask: ({ commit }, data) => {
      commit("Dashboard/SET_DIALOG_LOADING", true, { root: true });
      call("post", taskConstants.user_tasks, data)
        .then(() => {
          commit("Dashboard/SET_DIALOG_LOADING", false, { root: true });
          Event.$emit("ApiSuccess", "User Task created successfully");
          Event.$emit("back");
        })
        .catch((err) => {
          commit("Dashboard/SET_DIALOG_LOADING", false, { root: true });
          Event.$emit("ApiError", err.response.data.message);
        });
    },
    updateTask: ({ commit }, data) => {
      commit("Dashboard/SET_DIALOG_LOADING", true, { root: true });
      call("post", taskConstants.updateTask(data.id), data.formData)
        .then(() => {
          commit("Dashboard/SET_DIALOG_LOADING", false, { root: true });
          Event.$emit("ApiSuccess", "User Task updated successfully");
          Event.$emit("back");
        })
        .catch((err) => {
          commit("Dashboard/SET_DIALOG_LOADING", false, { root: true });
          Event.$emit("ApiError", err.response.data.message);
        });
    },
    updateUserTask: ({ commit }, data) => {
      commit("Dashboard/SET_DIALOG_LOADING", true, { root: true });
      call("post", taskConstants.updateUserTask(data.id), data.formData)
        .then(() => {
          commit("Dashboard/SET_DIALOG_LOADING", false, { root: true });
          Event.$emit("ApiSuccess", "User Task updated successfully");
          Event.$emit("back");
        })
        .catch((err) => {
          commit("Dashboard/SET_DIALOG_LOADING", false, { root: true });
          Event.$emit("ApiError", err.response.data.message);
        });
    },
    deleteTask: ({ commit, dispatch }, id) => {
      commit("Dashboard/SET_LOADING", true, { root: true });
      call("post", taskConstants.deleteTask(id))
        .then(() => {
          commit("Dashboard/SET_LOADING", false, { root: true });
          Event.$emit("ApiSuccess", "Task deleted successfully");
          dispatch("getTasks");
        })
        .catch((err) => {
          commit("Dashboard/SET_LOADING", false, { root: true });
          Event.$emit("ApiError", err.response.data.message);
        });
    },
    deleteUserTask: ({ commit, dispatch }, id) => {
      commit("Dashboard/SET_LOADING", true, { root: true });
      call("post", taskConstants.deleteUserTask(id))
        .then(() => {
          commit("Dashboard/SET_LOADING", false, { root: true });
          Event.$emit("ApiSuccess", "User Task deleted successfully");
          dispatch("getUserTasks");
        })
        .catch((err) => {
          commit("Dashboard/SET_LOADING", false, { root: true });
          Event.$emit("ApiError", err.response.data.message);
        });
    },
    getStatuses: ({ commit }) => {
      call("get", taskConstants.statuses)
        .then((res) => {
          commit("MUTATE", { state: "statuses", data: res.data });
        })
        .catch((err) => {
          Event.$emit("ApiError", err.response.data.message);
        });
    },
    getUsers: ({ commit }) => {
      call("get", taskConstants.users)
        .then((res) => {
          commit("MUTATE", { state: "users", data: res.data });
        })
        .catch((err) => {
          Event.$emit("ApiError", err.response.data.message);
        });
    },
  },
};
