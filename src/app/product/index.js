import { memo, useCallback, useLayoutEffect } from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { useParams } from 'react-router-dom';
import { ProductItem } from '../../components/product-item';
import { Loading } from '../../components/ui/loading';

export const Product = memo(({ }) => {

  const store = useStore();
  const { productId } = useParams();
  const select = useSelector(state => ({
    product: state.products.product,
    loading: state.products.loading,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  useLayoutEffect(() => {
    store.actions.products.load(productId);
  }, [productId]);

  return (
    <PageLayout>
      {!select.loading ?
        <><Head title={select?.product?.title} />
          <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
            sum={select.sum} />
          <ProductItem onAdd={callbacks.addToBasket} product={select.product}/></> : <Loading />}
    </PageLayout>
  );
});