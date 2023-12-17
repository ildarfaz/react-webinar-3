import { memo, useCallback, useEffect, useLayoutEffect } from "react";
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
    waiting: state.profile.waiting,
    isAuth: state.profile.isAuth,
  }));

  const callbacks = {
    onAuth: useCallback((data) => store.actions.profile.fetchAuth(data), [store]),
  }

  const { t } = useTranslate();

  useEffect(() => {
    if (select.isAuth) {
      navigate("/profile", true);
    }
  }, [select.isAuth])

  return (
    <Spinner active={select.waiting}>
      <LoginForm onAuth={callbacks.onAuth} />
    </Spinner>
  );
});