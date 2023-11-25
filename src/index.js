import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app.js';
import Store from './store.js';
import { getRandomNumber } from './utils.js';

const store = new Store({
  list: [
    { code: getRandomNumber(), title: 'Название элемента', selectCount: 0 },
    { code: getRandomNumber(), title: 'Некий объект', selectCount: 0 },
    { code: getRandomNumber(), title: 'Заголовок', selectCount: 0 },
    { code: getRandomNumber(), title: 'Очень длинное название элемента из семи слов', selectCount: 0 },
    { code: getRandomNumber(), title: 'Запись', selectCount: 0 },
    { code: getRandomNumber(), title: 'Шестая запись', selectCount: 0 },
    { code: getRandomNumber(), title: 'Седьмая запись', selectCount: 0 },
  ]
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store} />);
});

// Первый рендер приложения
root.render(<App store={store} />);
