import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import { Controls } from '../controls';
import { useState } from 'react';

export const CommentForm = ({ send, onCancel }) => {
  const cn = bem('CommentForm');
  const [message, setMessage] = useState('');
  const handlerMessage = (e) => {
    setMessage(e.target.value);
  }
  const handlerCancel = () => {
    setMessage("");
    onCancel();
  }
  const handlerSend = () => {
    send(message);
    handlerCancel();
  }
  return (
    <div className={cn()}>
      <strong>Новый комментарий</strong>
      <textarea className={cn('text')} placeholder='Текст' value={message} onChange={handlerMessage} />
      <div className={cn('control')}>
        <Controls title={`Отправить`} onHandler={handlerSend} />
        <Controls title={`Отмена`} onHandler={handlerCancel} />
      </div>

    </div>
  )
}

CommentForm.propTypes = {
  send: PropTypes.func,
  onCancel: PropTypes.func,

};

CommentForm.defaultProps = {
  send: () => { },
  onCancel: () => { },
};