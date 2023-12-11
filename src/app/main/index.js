import { memo, useCallback, useEffect } from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { Pagination } from '../../components/ui/pagination';
import { A } from '../../components/ui/a';
import { getTitle, title } from '../../locale';

function Main() {

  const store = useStore();

  const select = useSelector(state => ({
    list: state.catalog.list,
    totalPages: state.catalog.totalPages,
    activePage: state.catalog.activePage,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.language.language,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    handlerPage: (limit, skip) => store.actions.catalog.load(limit, skip),
    handlerLang: (lang) => store.actions.language.changeLanguage(lang)
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} titleControls={getTitle("ADD")} />
    }, [callbacks.addToBasket, select.lang]),
  };
  useEffect(() => {
    store.actions.catalog.load(10, select.activePage);
  }, []);

  return (
    <PageLayout>
      <Head title={getTitle(title.STORE)} lang={select.lang} handlerLang={callbacks.handlerLang} />
      <BasketTool
        renderLeftItem={<A title={getTitle(title.MAIN)} to="/" />}
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum} />
      <List list={select.list} renderItem={renders.item} />
      <Pagination totalPages={select.totalPages} activePage={select.activePage} onChangeParams={callbacks.handlerPage} />
    </PageLayout>

  );
}

export default memo(Main);
