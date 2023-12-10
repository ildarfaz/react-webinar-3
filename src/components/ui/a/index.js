import { memo } from "react";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

export const A = (props) => {
  const cn = bem('A');
  return (
    <div className={cn()}>
      <Link to={props.to}>{props.title}</Link>
    </div>
  );
}

A.propTypes = {
  title: PropTypes.string,
  to: PropTypes.string,
};

A.defaultProps = {
}

