import { memo, useCallback, useEffect, useLayoutEffect } from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Spinner from "../../components/spinner";
import { ProfileItem } from "../../components/profile-item";
import { useNavigate } from "react-router";

export const ProfileContainer = memo(() => {
  const store = useStore();
  const navigate = useNavigate();
  const select = useSelector(state => ({
    profile: state.profile.profile,
    waiting: state.profile.waiting || state.auth.waiting,
    isAuth: state.auth.isAuth,
    email: state.profile.email
  }));

  const callbacks = {
    loadProfile: useCallback(() => store.actions.profile.load(), [store]),
  }

  useLayoutEffect(() => {
    callbacks.loadProfile();
  }, [])
  useEffect(() => {
    if (!select.isAuth && !select.waiting) {
      console.log(select.waiting);
      navigate("/login", true);
    }
  }, [select.isAuth, select.waiting]);


  const { t } = useTranslate();

  return (
    <Spinner active={select.waiting}>
      <ProfileItem profile={select.profile} email={select.email} />
    </Spinner>
  );
});