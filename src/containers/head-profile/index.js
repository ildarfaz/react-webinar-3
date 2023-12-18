
import { memo, useCallback, useMemo } from "react";
import './style.css';
import useStore from "../../hooks/use-store";
import Controls from "../../components/controls";
import { Link } from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";

export const HeadProfile = memo(() => {
  const store = useStore();
  const select = useSelector(state => ({
    isAuth: state.auth.isAuth,
    username: state.auth.username,
  }));
  const callbacks = {
    onLogout: useCallback(() => store.actions.auth.logout(), [store]),
    checkToken: useCallback(() => store.actions.auth.checkToken(), [store]),
    loadProfile: useCallback(() => store.actions.profile.load(), [store]),
  }
  useInit(() => {
    callbacks.checkToken();
    callbacks.loadProfile();
  }, [], true);

  const Content = useMemo(() => {
    if (select.isAuth) {
      return (<>
        <Link to="/profile" >{select.username}</Link>
        <Controls title="Выход" onHandler={callbacks.onLogout} />
      </>)
    }
    return (
      <Link to="/login" >
        <Controls title="Вход" />
      </Link>
    );
  }, [select.isAuth]);
  return (
    <div className='HeadProfile'>
      {Content}
    </div>
  )
});

