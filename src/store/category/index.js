import { getSortOptions } from "../../utils";
import StoreModule from "../module";

class CategoryState extends StoreModule {

  initState() {
    return {
      options: [{ value: "", title: "Все" }],
      waiting: false
    };
  }
  async load() {
    this.setState({ ...this.initState(), waiting: true });

    try {
      const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
      const { result } = await response.json();
      const { items } = result;
      const options = getSortOptions(items);
      // Список категории загружен успешно
      this.setState({
        options: [{ value: "", title: "Все" }, ...options],
        waiting: false
      }, 'Загружен список категории из АПИ');

    } catch (e) {
      // Ошибка при загрузке
      // @todo В стейт можно положить информацию об ошибке
      this.setState({ ...this.initState() });
    }
  }
}

export default CategoryState;



