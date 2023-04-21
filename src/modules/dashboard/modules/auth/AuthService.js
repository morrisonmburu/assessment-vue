import { helper } from "../../utils";
class AuthService {
  constructor() {
    this.token = helper.getLocalStorage("token");
    this.user = helper.getLocalStorage("user");
  }

  check() {
    return !!this.token;
  }

  setUser(user, silent = false) {
    helper.removeLocalStorage("user");
    helper.storeInLocalStorage("user", user);
    this.user = user;
    if (!silent) location.reload();
  }

  login(token, user) {
    this.token = token;
    this.user = user;
    helper.storeInLocalStorage("token", token);
    helper.storeInLocalStorage("user", user);
    location.reload();
  }

  logout() {
    helper.removeLocalStorage("user");
    helper.removeLocalStorage("token");
    location.reload();
  }
}

export default new AuthService();