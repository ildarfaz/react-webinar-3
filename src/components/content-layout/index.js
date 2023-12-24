import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

export const ContentLayout = memo(({ children }) => {
  const cn = bem('ContentLayout');
  return (
    <div className={cn()}>
      {children}
    </div>
  );
})

ContentLayout.propTypes = {
  children: PropTypes.node,
}

ContentLayout.defaultProps = {};

