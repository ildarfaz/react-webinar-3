const propNames = new Set(['id', 'className', 'textContent', 'onclick']);

/**
 * Создание элемента со свойствами и вложенными элементами
 * @param name {String} Название HTML тега
 * @param props {Object} Свойства и атрибуты элемента
 * @param children {...Node} Вложенные элементы
 * @returns {HTMLElement}
 */
export function createElement(name, props = {}, ...children) {
  const element = document.createElement(name);

  // Назначение свойств и атрибутов
  for (const name of Object.keys(props)) {
    if (propNames.has(name)) {
      element[name] = props[name];
    } else {
      element.setAttribute(name, props[name]);
    }
  }

  // Вставка вложенных элементов
  for (const child of children) {
    element.append(child);
  }

  return element;
}

const setSessionStorage = (name, data) => {
  sessionStorage.setItem([name], JSON.stringify(data));
}
const getSessionStorage = (name) => {
  return JSON.parse(sessionStorage.getItem([name]));
}

export const getRandomNumber = () => {
  const randomNumber = getSessionStorage("randomNumber") + 1;
  setSessionStorage("randomNumber", randomNumber);
  return randomNumber;
};

export const getTitle = (count) => {

  if (!count) {
    return "";
  }

  const title = ` | Выделяли ${count} раз`;
  const lastNumber = count % 100;

  if (![12, 13, 14].includes(lastNumber) && [2, 3, 4].includes(lastNumber % 10)) {
    return `${title}а`;
  }

  return title;
}