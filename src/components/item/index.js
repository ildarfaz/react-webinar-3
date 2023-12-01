import React, { useState } from "react";
import PropTypes from "prop-types";
import './style.css';
import Controls from "../controls";

function Item(props) {

  const callbacks = {

    onClick: (e) => {
      if ("Удалить" === props.title) {
        props.onDeleteItem(props.item);
      } else {
        props.onAddItem(props.item);
      }
    },

  }

  return (
    <div className='Item'>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        <div>{props.item.title}</div>
        <div className="Item-price">
          <div>{`${props.item.price} ₽`}</div>
          {props.item.count && <div>{`${props.item.count} шт`}</div>}
        </div>

      </div>
      <div className='Item-actions'>
        <Controls onHandler={callbacks.onClick} title={props.title} />
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number
  }).isRequired,
  onDeleteItem: PropTypes.func,
  onAddItem: PropTypes.func
};

Item.defaultProps = {
  onDeleteItem: () => {
  },
  onAddItem: () => {
  },
}

export default React.memo(Item);
