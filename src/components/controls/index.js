import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

export const Controls = ({ onHandler, title, isDisabled = false }) => {
  return (
    <div className='Controls'>
      <button onClick={onHandler} disabled={isDisabled}>{title}</button>
    </div>
  )
}

Controls.propTypes = {
  onHandler: PropTypes.func,
  title: PropTypes.string,
  isDisabled: PropTypes.bool,
};

Controls.defaultProps = {
  onHandler: () => {
  },
  title: "Добавить",
}
