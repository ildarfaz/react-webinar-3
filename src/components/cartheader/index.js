import React from "react";
import PropTypes from "prop-types";
import './style.css';
import Controls from "../controls";
import { plural } from "../../utils";
const getText = (count, price) => {
  if (count) {
    return `${count} ${plural(count, { one: 'товар', few: 'товара', many: 'товаров' })} / ${price} ₽`;
  }
  return "пусто";
}
export const CartHeader = React.memo((props) => {
  return (
    <div className="CartHeader">
      <div>{`В корзине: `}<strong>{getText(props.count, props.price)}</strong></div>
      <Controls onHandler={props.onToggle} title='Перейти' />
    </div>
  )
})

CartHeader.propTypes = {
  onToggle: PropTypes.func,
  count: PropTypes.number,
};
CartHeader.defaultProps = {
  onToggle: () => { },
  count: 0,
  price: 0,
}


