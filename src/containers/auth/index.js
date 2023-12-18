import { memo, useCallback, useEffect } from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Spinner from "../../components/spinner";
import { LoginForm } from "../../components/login-form";
import { useNavigate } from "react-router";

export const Auth = memo(() => {
  const store = useStore();
  const navigate = useNavigate();
  const select = useSelector(state => ({
    waiting: state.auth.waiting,
    isAuth: state.auth.isAuth,
    error: state.auth.error,
  }));

  const callbacks = {
    onAuth: useCallback((data) => store.actions.auth.fetchAuth(data), [store]),
  }

  const { t } = useTranslate();

  useEffect(() => {
    if (select.isAuth) {
      navigate(-1);
    }
  }, [select.isAuth]);

  return (
    <Spinner active={select.waiting}>
      <LoginForm onAuth={callbacks.onAuth} error={select.error} />
    </Spinner>
  );
});