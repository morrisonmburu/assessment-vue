const prefix = process.env.VUE_APP_NAME.toLowerCase() + "_";

class Helper {
  encode(value) {
    return btoa(value).toString();
  }
  decode(value) {
    return atob(value).toString();
  }

  stringToColour(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = "#";
    for (let i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 0xff;
      colour += ("00" + value.toString(16)).substr(-2);
    }
    return colour;
  }

  storeInLocalStorage(key, value) {
    localStorage.setItem(prefix + key, JSON.stringify(value));
  }

  getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(prefix + key));
  }

  removeLocalStorage(key) {
    localStorage.removeItem(prefix + key);
  }
}
export default new Helper();
