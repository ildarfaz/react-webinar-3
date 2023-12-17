import { memo, useCallback } from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Spinner from "../../components/spinner";
import { LoginForm } from "../../components/login-form";

export const Auth = memo(() => {
  const store = useStore();

  const select = useSelector(state => ({
    waiting: state.profile.waiting,
  }));

  const callbacks = {
    onAuth: useCallback((data) => store.actions.profile.fetchAuth(data), [store]),
  }

  const { t } = useTranslate();

  return (
    <Spinner active={select.waiting}>
      <LoginForm onAuth={callbacks.onAuth} />
    </Spinner>
  );
});