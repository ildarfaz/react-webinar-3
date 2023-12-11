import { memo, useCallback, useLayoutEffect } from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { useParams } from 'react-router-dom';
import { ProductItem } from '../../components/product-item';
import { Loading } from '../../components/ui/loading';
import { A } from '../../components/ui/a';
import { getTitle, title } from '../../locale';

export const Product = memo(({ }) => {

  const store = useStore();
  const { productId } = useParams();
  const select = useSelector(state => ({
    product: state.product.product,
    loading: state.product.loading,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.language.language,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    handlerLang: (lang) => store.actions.language.changeLanguage(lang),
  };

  useLayoutEffect(() => {
    store.actions.product.load(productId);
  }, [productId]);

  return (
    <PageLayout>
      {!select.loading ?
        <><Head title={select?.product?.title} lang={select.lang} handlerLang={callbacks.handlerLang} />
          <BasketTool renderLeftItem={<A title={getTitle(title.MAIN)} to="/" />} onOpen={callbacks.openModalBasket} amount={select.amount}
            sum={select.sum} />
          <ProductItem
            onAdd={callbacks.addToBasket}
            product={select.product}
            controlsTitle={getTitle(title.ADD)}
            priceTitle= {getTitle(title.PRICE)}
            editionTitle = {getTitle(title.EDITION)}
            categoryTitle = {getTitle(title.CATEGORY)}
            madeInTitle = {getTitle(title.MADE_IN_COUNTRY)}
            />
        </> : <Loading />}
    </PageLayout>
  );
});