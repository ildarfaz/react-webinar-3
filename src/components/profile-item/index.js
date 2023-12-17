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
        <span>Имя: </span><strong>{`User №1`}</strong>
      </div>
      <div>
        <span>Телефон: </span><strong>{`+70000000001`}</strong>
      </div>
      <div>
        <span>email:  </span><strong>{`test_50@example.com`}</strong>
      </div>
    </div>
  )
});

ProfileItem.propTypes = {

}

ProfileItem.defaultProps = {
}