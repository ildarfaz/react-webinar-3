import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import './style.css';
import Head from "../head";
import Controls from "../controls";

function Modal(props) {
  return (
    <dialog className="Modal" open={props.isOpen}>
      <div className="Modal-dialog">
        <div className="Modal-head">
          <Head title="Корзина" />
          <Controls title="Закрыть" onHandler={props.onHandler} />
        </div>
        </div>


    </dialog>
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onHandler: PropTypes.func,
};

Modal.defaultProps = {
  isOpen: false,
  onHandler: () => { },
}

export default React.memo(Modal);
