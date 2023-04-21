import DashboardLayout from "@/modules/main-module/modules/dashboard/views/dashboardLayout";
import Auth from "@/router/middleware/Auth";
import TaskList from "./components/TaskList";
import TaskCard from "./components/TaskCard";
import AssignUserTask from "./components/AssignUserTask";

export default [
  {
    path: "/tasks",
    component: DashboardLayout,
    children: [
      {
        path: "",
        redirect: "/tasks/main-list",
      },
      {
        path: "main-list",
        name: "Main",
        components: {
          view: TaskList,
        },
        meta: {
          middleware: Auth,
        },
      },
      {
        path: "my-tasks",
        name: "MyTasks",
        components: {
          view: TaskList,
        },
        meta: {
          middleware: Auth,
        },
      },
      {
        path: "add-task/:id?",
        name: "TaskCard",
        components: {
          view: TaskList,
          action: TaskCard,
        },
      },
      {
        path: "assign-task/:id?",
        name: "AssignUserTask",
        components: {
          view: TaskList,
          action: AssignUserTask,
        },
      }
    ],
  },
];
