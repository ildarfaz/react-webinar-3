import React, { useCallback, useEffect, useState } from 'react';
import List from "./components/list";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from './components/modal';
import { CartHeader } from './components/cartheader';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {

  const [open, toggleOpen] = useState(false);
  const list = store.getState().list;
  const count = store.getState().count;
  const price = store.getState().price;
  const onToggle = () => {
    toggleOpen((prev) => !prev);
  };
  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),
    onAddItem: useCallback((item) => {
      store.addItem(item);
    }, [store]),
  }

  return (
    <PageLayout>
      <Modal isOpen={open} onHandler={onToggle} />
      <Head title='Магазин' />
      <CartHeader onToggle={onToggle} count={count} price={price}/>
      <List list={list}
        onAddItem={callbacks.onAddItem}
        onSelectItem={callbacks.onSelectItem} />
    </PageLayout>
  );
}

export default App;
