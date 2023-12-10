import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Product extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      loading: false,
    }
  };
  async load(productId) {
    this.setState({
      ...this.getState(),
      loading: true,
    }, 'Загружено описание товара из АПИ');
    const response = await fetch(`/api/v1/articles/${productId}?fields= _id,title,price,edition,description,madeIn(title,code),category(title)`);
    const { result } = await response.json();
    this.setState({
      ...this.getState(),
      product: result,
      loading: false
    }, 'Загружено описание товара из АПИ');
    return result;
  }
}

export default Product;