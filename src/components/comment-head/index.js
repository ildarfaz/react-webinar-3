import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';

export const CommentHead = (props) => {
  const cn = bem('CommentHead');
  return (
    <div className={cn()}>{`Комментарии (${props.total})`}</div>
  )
}

CommentHead.propTypes = {
  total: PropTypes.number,
};

CommentHead.defaultProps = {
  total: 0,
}