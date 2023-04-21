export default {
  tasks: "tasks",
  updateTask: (id) => `tasks/update/${id}`,
  deleteTask: (id) => `tasks/delete/${id}`,
  user_tasks: "tasks/user-tasks",
  showTask: (id) => `tasks/show/${id}`,
  updateUserTask: (id) => `tasks/user-tasks/update/${id}`,
  deleteUserTask: (id) => `tasks/user-tasks/delete/${id}`,
  statuses: "statuses",
  users: "users",
};
