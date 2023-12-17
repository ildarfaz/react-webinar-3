import { memo } from "react";
import PropTypes from 'prop-types';
import './style.css';

function Controls(props) {
  return (
    <div className='Controls'>
      <button onClick={() => props.onHandler()}>{props.title}</button>
    </div>
  )
}

Controls.propTypes = {
  onHandler: PropTypes.func
};

Controls.defaultProps = {
  onHandler: () => {
  },
  title: 'Добавить'
}

export default memo(Controls);
