import { memo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from "../../utils";
import './style.css';
import { getTitle, title } from "../../locale";

function BasketTool({ renderLeftItem, sum, amount, onOpen }) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      {renderLeftItem}
      <div>
        <span className={cn('label')}>{getTitle(title.IN_BASKET)}:</span>
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, getTitle(title.PRODUCT))} / ${numberFormat(sum)} ₽`
            : getTitle(title.EMPTY)
          }
        </span>
        <button onClick={onOpen}>{getTitle(title.GO)}</button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  renderLeftItem: PropTypes.node,
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number
};

BasketTool.defaultProps = {
  renderLeftItem: <div></div>,
  onOpen: () => { },
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
