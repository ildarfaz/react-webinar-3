import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const optionsDate = {
  month: 'long',
  day: 'numeric',
};

const optionsTime = {
  hour: '2-digit',
  minute: '2-digit',
}

export const Comment = memo((props) => {

  const cn = bem('Comment');

  const callbacks = {
    onAdd: (e) => {
      props.onAdd(props.item._id);
      e.stopPropagation();
    }
    ,
  }

  const dateCreate = useMemo(() => new Date(props.item?.dateCreate), [props.item?.dateCreate]);

  return (
    <div className={cn()}>
      <div className={cn('user')}>
        <strong className={props.userID === props.item.author._id ? cn('title') : null}>{`${props.item.author.profile.name} `}</strong>
        <span>{`${dateCreate.toLocaleDateString('ru-Ru', optionsDate)}
         ${dateCreate.getFullYear()} в 
         ${dateCreate.toLocaleTimeString('ru-Ru', optionsTime)}`}</span>
      </div>
      <div className={cn('text')}>
        {props.item.text}
      </div>
      <div className={cn('actions')}>
        <Link className={cn('link')} onClick={callbacks.onAdd}>{props.labelAdd}</Link>
      </div>
    </div>
  );
})

Comment.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    text: PropTypes.string,
    dateCreate: PropTypes.string,
    isDeleted: PropTypes.bool,
    parent: PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      _type: PropTypes.string
    }),
    author: PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      profile: PropTypes.shape({
        name: PropTypes.string
      })
    })
  }).isRequired,
  onAdd: PropTypes.func,
  labelAdd: PropTypes.string,
  userID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Comment.defaultProps = {
  onAdd: () => {
  },
}
