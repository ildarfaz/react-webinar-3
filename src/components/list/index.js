import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List(props) {
  return (
    <div className='List'>{
      props.list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} onDeleteItem={props.onDeleteItem} onAddItem={props.onAddItem} title={props.title} />
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onDeleteItem: PropTypes.func,
  onAddItem: PropTypes.func,
  title: PropTypes.string
};

List.defaultProps = {
  list: [],
  onDeleteItem: () => {
  },
  onAddItem: () => {
  },
  title: "Добавить"
}

export default React.memo(List);
