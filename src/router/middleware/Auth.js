import { AuthService } from "@/modules/main-module/modules/auth/index";
import router from "@/router";

export default function auth({ next /**router*/ }) {
  if (!AuthService.check()) {
    return router.push({
      name: "Login",
    });
  }
  return next();
}
