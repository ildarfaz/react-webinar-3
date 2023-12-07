import React from "react";
import "./style.css";

export const Button = ({
  children,
  onClick,
  active,
  isDisabled = false,
}) => {
  return (
    <div className={`Button ${active ? 'Button-active' : ''}`}>
      <button
        onClick={onClick}
        disabled={isDisabled}
      >
        {children}
      </button>
    </div>
  );
};

Button.propTypes = {

}
