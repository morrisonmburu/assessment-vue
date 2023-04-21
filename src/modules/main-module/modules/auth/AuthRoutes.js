import AuthLayout from "./views/AuthLayout";
import ForgotPassword from "./components/ForgotPassword";
import Landing from "../landing/components/Landing";
import SetPassword from "./components/SetPassword";
import Login from "./components/Login";

export default [
  {
    path: "/auth",
    name: "Auth",
    component: AuthLayout,
    children: [
      {
        path: "sign-in",
        name: "SignIn",
        component: Landing,
        children: [
          {
            path: "",
            name: "Login",
            component: Login,
          },
          {
            path: "forgot-password",
            name: "forgotPassword",
            component: ForgotPassword,
          },
          {
            path: "set-password/:token",
            name: "setPassword",
            component: SetPassword,
          },
        ],
      },
    ],
  },
];
