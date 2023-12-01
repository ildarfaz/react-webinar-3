import { generateCode } from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление товара в корзину
   */
  addItem(item) {
    if (this.state.basket?.find(value => value.code === item.code)?.code) {
      return this.setState({
        ...this.state,
        price: this.state.price + item.price,
        basket: this.state.basket.map(value => (value.code === item.code ? { ...value, price: value.price + item.price, count: value.count + 1, } : value))
      })
    }
    return this.setState({
      ...this.state,
      price: this.state.price + item.price,
      count: this.state.count + 1,
      basket: [...this.state.basket, { ...item, count: 1 }]
    })
  };

  /**
   * Удаление товара по коду
   */
  deleteItem(item) {
    this.setState({
      ...this.state,
      // Новый список товара, в котором не будет удаляемой записи
      basket: this.state.basket.filter(value => value.code !== item.code),
      count: this.state.count - 1,
      price: this.state.price - item.price
    })
  };

  toggleOpen() {
    return this.setState({
      ...this.state,
      open: !this.state.open
    })
  };

  add
}

export default Store;
