import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      totalPages: 0,
      activePage: 0,
      limit: 10,
    }
  }

  async load(limit, activePage) {
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${activePage * limit}&fields=items(_id,title,price),count`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      totalPages: Math.round(json.result.count / limit),
      activePage: activePage,
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
