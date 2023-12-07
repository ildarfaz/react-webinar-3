import React from "react";
import "./style.css";
import { cn as bem } from '@bem-react/classname';

export const Loading = ({ }) => {
  const cn = bem('Loader');
  return (
    <div className={cn()}>
      <div className={cn('content')}></div>
    </div>
  );
};

Loading.propTypes = {

}
