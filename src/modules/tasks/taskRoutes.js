import DashboardLayout from "./views/dashboardLayout";
import Auth from "@/router/middleware/Auth";
import TaskList from "./components/TaskList";

export default [
    {
        path: "/tasks",
        component: DashboardLayout,
        children: [
            {
                path: "",
                redirect: "/tasks/main",
            },
            {
                path: "main",
                name: "Main",
                components: {
                    view: TaskList
                },
                meta: {
                    middleware: Auth,
                },
            },
        ],
    },
];