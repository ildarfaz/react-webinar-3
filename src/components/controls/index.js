import { memo } from "react";
import PropTypes from 'prop-types';
import './style.css';

function Controls(props) {
  return (
    <div className='Controls'>
      <button onClick={() => props.onHandler()} disabled={props.isDisabled}>{props.title}</button>
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
  title: 'Добавить',
  isDisabled: false
}

export default memo(Controls);
