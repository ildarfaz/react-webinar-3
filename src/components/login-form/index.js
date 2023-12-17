import { memo, useCallback, useLayoutEffect, useState } from 'react';
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';

import './style.css';
import Input from '../input';
import Controls from '../controls';

export const LoginForm = memo((props) => {
  const [data, setData] = useState({ login: "", password: "" });

  const handlerLogin = () => {
    if (data.login && data.password) {
      props.onAuth(data);
    }
  }
  const handlerInput = (key) => {
    return (data) => {
      setData((prev) => ({ ...prev, [key]: data }))
    }
  }

  const cn = bem('LoginForm');
  return (
    <div className={cn()}>
      <h2>{`Вход`}</h2>
      <div>
        <div>Логин</div>
        <Input value={data.login} onChange={handlerInput("login")} />
      </div>
      <div>
        <div>Пароль</div>
        <Input value={data.password} onChange={handlerInput("password")} />
      </div>
      <Controls title={"Войти"} onHandler={handlerLogin} />
    </div>
  )
});

LoginForm.propTypes = {
  onAuth: PropTypes.func,
}

LoginForm.defaultProps = {
  onAuth: () => { },
}