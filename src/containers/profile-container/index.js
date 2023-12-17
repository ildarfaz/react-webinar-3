import { memo, useCallback } from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Spinner from "../../components/spinner";
import { ProfileItem } from "../../components/profile-item";

export const ProfileContainer = memo(() => {
  const store = useStore();

  const select = useSelector(state => ({

  }));

  const callbacks = {

  }

  const { t } = useTranslate();

  return (
    <Spinner active={select.waiting}>
      <ProfileItem />
    </Spinner>
  );
});