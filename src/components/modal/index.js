import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import './style.css';
import Head from "../head";
import Controls from "../controls";
import List from "../list";

function Modal(props) {
  return (
    <dialog className="Modal" open={props.isOpen}>
      <div className="Modal-dialog">
        <div className="Modal-head">
          <Head title="Корзина" />
          <Controls title="Закрыть" onHandler={props.onHandler} />
        </div>
        <List list={props.basket} price={props.price} onDeleteItem={props.onDeleteItem} title={"Удалить"} />
        <footer className="Modal-footer">
          <strong>Итого: </strong>
          <strong>{`${props.price} ₽`}</strong>
        </footer>
      </div>
    </dialog>
  )
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onHandler: PropTypes.func,
  onDeleteItem: PropTypes.func,
  basket: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  price: PropTypes.number,
};

Modal.defaultProps = {
  isOpen: false,
  onHandler: () => { },
  onDeleteItem: () => { },
  basket: [],
  price: 0
}

export default React.memo(Modal);
