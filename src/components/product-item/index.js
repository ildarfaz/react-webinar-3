import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { numberFormat } from '../../utils';
import Controls from '../controls';
import PropTypes from "prop-types";

export const ProductItem = memo((props) => {
  const cn = bem('ProductItem');
  const callbacks = {
    onAdd: (e) => props.onAdd(props.product._id)
  }
  return (
    <div className={cn()}>
      <div>{props.product?.description}</div>
      <div><span>{`${props.madeInTitle}: `}</span><strong>{`${props.product?.madeIn.title} (${props.product?.madeIn.code})`}</strong></div>
      <div><span>{`${props.categoryTitle}: `}</span><strong>{props.product?.category.title}</strong></div>
      <div><span>{`${props.editionTitle}: `}</span><strong>{props.product?.edition}</strong></div>
      <div><h2>{`${props.priceTitle}: ${numberFormat(props.product?.price)} ₽`}</h2></div>
      <Controls onAdd={callbacks.onAdd} title={props.controlsTitle} />
    </div>
  );
});

ProductItem.propTypes = {
  onAdd: PropTypes.func,
  product: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    madeIn: PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.string,
    })
  }),
  controlsTitle: PropTypes.string,
  priceTitle: PropTypes.string,
  editionTitle: PropTypes.string,
  categoryTitle: PropTypes.string,
  madeInTitle: PropTypes.string,
}
ProductItem.defaultProps = {
  onAdd: () => { },
}
