import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';

export const AuthCommentForm = (props) => {
  const cn = bem('AuthCommentForm');
  if (props.exists) {
    return null;
  }
  return (
    <div className={cn()}><Link className={cn('link')} to={"/login"}>Войдите</Link>, чтобы иметь возможность комментировать</div>
  )
}

AuthCommentForm.propTypes = {
  exists: PropTypes.bool,
};

AuthCommentForm.defaultProps = {
  exists: true,
}