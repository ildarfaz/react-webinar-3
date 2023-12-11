import { memo } from "react";
import PropTypes from 'prop-types';
import './style.css';
import { getTitle } from "../../locale";
function Controls({ onAdd }) {
  return (
    <div className='Controls'>
      <button onClick={() => onAdd()}>{getTitle("ADD")}</button>
    </div>
  )
}

Controls.propTypes = {
  onAdd: PropTypes.func
};

Controls.defaultProps = {
  onAdd: () => { }
}

export default memo(Controls);
