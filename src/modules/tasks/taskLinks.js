export default {
  order: 1,
  icon: "task",
  title: "Tasks",
  disabled: false,
  sublinks: [
    {
      to: "/tasks/main-list",
      order: 1,
      icon: "task",
      title: "All Tasks",
      disabled: false,
    },
    {
      to: `/tasks/my-tasks?type=${btoa("my--tasks")}`,
      order: 1,
      icon: "task",
      title: "My Tasks",
      disabled: false,
    },
  ],
};
