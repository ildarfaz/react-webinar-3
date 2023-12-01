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
  const basket = store.getState().basket;
  const onOpen = () => {
    if (count) {
      toggleOpen(true);
    }
  };
  const onClose = () => {
    toggleOpen(false);
  }
  const callbacks = {
    onDeleteItem: useCallback((item) => {
      store.deleteItem(item);
    }, [store]),
    onAddItem: useCallback((item) => {
      if (!open) {
        store.addItem(item);
      }
    }, [store, open]),
  }

  return (
    <PageLayout>
      <Modal isOpen={open} onHandler={onClose} onDeleteItem={callbacks.onDeleteItem} basket={basket} price={price} />
      <Head title='Магазин' />
      <CartHeader onToggle={onOpen} count={count} price={price} />
      <List list={list}
        onAddItem={callbacks.onAddItem}
        onSelectItem={callbacks.onSelectItem} />
    </PageLayout>
  );
}

export default App;
