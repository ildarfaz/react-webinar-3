import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

export const AuthCommentForm = (props) => {
  const cn = bem('AuthCommentForm');
  const formRef = useRef(null);

  useEffect(() => {
    if (props.isFocus) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, []);
  if (props.exists) {
    return (<div ref={formRef}>
      {props.children}</div>);
  }
  return (
    <div className={cn()} ref={formRef}>
      <Link
        className={cn('link')}
        to={"/login"}
        state={{ back: location.pathname }}>
        Войдите</Link>, чтобы иметь возможность комментировать</div>
  )
}

AuthCommentForm.propTypes = {
  children: PropTypes.node,
  exists: PropTypes.bool,
  isFocus: PropTypes.bool,
};

AuthCommentForm.defaultProps = {
  exists: true,
  isFocus: true,
}