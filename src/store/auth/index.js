import { getLocalStorage, removeLocalStorage, setLocalStorage } from "../../utils";
import StoreModule from "../module";

/**
 * Покупательская корзина
 */
class AuthState extends StoreModule {

  initState() {
    return {
      token: null,
      username: null,
      error: null,
      waiting: false,
      isAuth: false,
    }
  }

  async fetchAuth(data) {
    this.setState({
      ...this.getState(),
      waiting: true,
    });
    const profile = await fetch("/api/v1/users/sign", {
      method: "post",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...data, "remember": true })
    });
    const json = await profile.json();
    if ((profile.status == 200)) {
      this.setState({
        ...this.getState(),
        username: json.result.user.profile.name,
        token: json.result.token,
        waiting: false,
        isAuth: true,
      }, 'Пользователь авторизован');
      setLocalStorage("token", json.result.token);
      setLocalStorage("userName", json.result.user.profile.name);
    } else {
      this.setState({
        ...this.getState(),
        error: {
          message: json.error.data.issues[0].message,
          code: json.error.code,
        },
        waiting: false,
        isAuth: false,
      }, 'Ошибка авторизации');
    }

  }
  async logout() {
    const token = this.getState().token;
    await fetch("/api/v1/users/sign", {
      method: "delete",
      headers: {
        'Content-Type': 'application/json',
        'X-Token': token
      },
    });

    this.setState({
      ...this.getState(),
      token: null,
      username: null,
      error: null,
      waiting: false,
      isAuth: false,
    }, "Вышел из учётки");
    removeLocalStorage("token");
    removeLocalStorage("userName");
  };

  async checkToken() {
    const token = getLocalStorage('token');
    try {
      if (token) {
        const response = await fetch(`/api/v1/users/self?fields=username,profile(name)`, {
          method: "get",
          headers: {
            'Content-Type': 'application/json',
            'X-Token': token
          },
        });
        const json = await response.json();
        const { result } = json;
        this.setState({
          ...this.getState(),
          token: token,
          username: result.profile.name,
          isAuth: true,
        }, 'Токен проверен');
      }
    } catch (e) {
      removeLocalStorage("token");
      removeLocalStorage("userName");
    }
  };
};




export default AuthState;