import React, { useState } from "react";
import PropTypes from "prop-types";
import './style.css';
import Controls from "../controls";

function Item(props) {

  const callbacks = {
    onClick: () => {

    },
    onAddItem: (e) => {
      props.onAddItem(props.item);
    }
  }

  return (
    <div className='Item' onClick={callbacks.onClick}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        <div>{props.item.title}</div>
        <div>{`${props.item.price} ₽`}</div>
      </div>
      <div className='Item-actions'>
        <Controls onHandler={callbacks.onAddItem} title='Добавить' />
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
  onDelete: PropTypes.func,
  onAddItem: PropTypes.func
};

Item.defaultProps = {
  onDelete: () => {
  },
  onAddItem: () => {
  },
}

export default React.memo(Item);
