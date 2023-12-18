import { getLocalStorage } from "../../utils";
import StoreModule from "../module";

/**
 * Покупательская корзина
 */
class ProfileState extends StoreModule {

  initState() {
    return {
      profile: null,
      email: null,
      waiting: false,
    }
  }

  async load() {
    const token = getLocalStorage("token") || "";
    if (token) {
      try {
        this.setState({
          ...this.getState(),
          waiting: true,
          profile: null,
          email: null,
        });
        const response = await fetch(`/api/v1/users/self?fields=email,profile(name,phone)`, {
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
          profile: result.profile,
          email: result.email,
          waiting: false,
        }, 'Профиль обновлен');
      } catch (e) {
      }
    }
  };
};




export default ProfileState;