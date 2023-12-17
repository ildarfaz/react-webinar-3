import { memo } from 'react';
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';

import './style.css';

export const ProfileItem = memo((props) => {
  const cn = bem('ProfileItem');
  return (
    <div className={cn()}>
      <h2>{`Профиль`}</h2>
      <div>
        <span>Имя: </span><strong>{props.profile?.name}</strong>
      </div>
      <div>
        <span>Телефон: </span><strong>{props.profile?.phone}</strong>
      </div>
      <div>
        <span>email:  </span><strong>{props?.email}</strong>
      </div>
    </div>
  )
});

ProfileItem.propTypes = {
  profile: PropTypes.object,
  email: PropTypes.string,
}

ProfileItem.defaultProps = {
}