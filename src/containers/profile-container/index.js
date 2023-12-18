import { memo, useCallback, useEffect, useLayoutEffect } from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Spinner from "../../components/spinner";
import { ProfileItem } from "../../components/profile-item";
import { useNavigate } from "react-router";
import useInit from "../../hooks/use-init";

export const ProfileContainer = memo(() => {
  const navigate = useNavigate();
  const select = useSelector(state => ({
    profile: state.profile.profile,
    waiting: state.profile.waiting || state.auth.waiting,
    isAuth: state.auth.isAuth,
    email: state.profile.email
  }));

  useEffect(() => {
    if (!select.isAuth && select.waiting) {
      console.log(select.waiting);
      navigate("/login", true);
    }
  }, [select.isAuth]);

  const { t } = useTranslate();

  return (
    <Spinner active={select.waiting}>
      <ProfileItem profile={select.profile} email={select.email} />
    </Spinner>
  );
});