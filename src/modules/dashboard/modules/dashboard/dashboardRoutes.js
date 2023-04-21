import DashboardLayout from "./views/dashboardLayout";
import Auth from "@/router/middleware/Auth";
import MainDashboard from "./components/MainDashboard";

export default [
  {
    path: "/dashboard",
    component: DashboardLayout,
    children: [
      {
        path: "",
        redirect: "/dashboard/main",
      },
      {
        path: "main",
        name: "Main",
        components: {
          view: MainDashboard
        },
        meta: {
          middleware: Auth,
        },
      }
    ],
  },
];
