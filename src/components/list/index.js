import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function List(props) {
  return (
    <div className='List'>{
      props.list.map(item =>
        <div key={item._id} className={props.isBorder ? 'List-item' : null}>
          {props.renderItem(item)}
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })).isRequired,
  renderItem: PropTypes.func,
  isBorder: PropTypes.bool
};

List.defaultProps = {
  renderItem: (item) => {
  },
  isBorder: true
}

export default memo(List);
