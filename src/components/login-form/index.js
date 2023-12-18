import { memo, useEffect, useMemo, useState } from 'react';
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';

import './style.css';
import Input from '../input';
import Controls from '../controls';

export const LoginForm = memo((props) => {
  const [data, setData] = useState({ login: "", password: "" });
  const [isDisabled, setIsDisabled] = useState(true);
  const cn = bem('LoginForm');
  const handlerLogin = () => {
    props.onAuth(data);
  }
  const handlerInput = (key) => {
    return (data) => {
      setData((prev) => ({ ...prev, [key]: data }));
    }
  }
  const Error = useMemo(() => {
    if (props.error?.message) {
      return (
        <div className={cn('error')}>{props.error?.message}
        </div>
      )
    }
    return null;
  }, [props.error?.message])
  useEffect(() => {
    setIsDisabled(!(data.login && data.password));
  }, [data.login, data.password])

  return (
    <>
      <form className={cn()}>
        <h2>{`Вход`}</h2>
        <div>
          <div>Логин</div>
          <Input value={data.login} onChange={handlerInput("login")} time={0} />
        </div>
        <div>
          <div>Пароль</div>
          <Input value={data.password} type={"password"} onChange={handlerInput("password")} time={0} />
        </div>
        {Error}
        <Controls title={"Войти"} onHandler={handlerLogin} isDisabled={isDisabled} />
      </form>
    </>
  )
});

LoginForm.propTypes = {
  onAuth: PropTypes.func,
  error: PropTypes.object
}

LoginForm.defaultProps = {
  onAuth: () => { },
}