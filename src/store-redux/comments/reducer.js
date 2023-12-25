// Начальное состояние
export const initialState = {
  list: [],
  total: 0,
  waiting: false, // признак ожидания загрузки
}

// Обработчик действий
function reducer(state = initialState, action) {

  switch (action.type) {
    case "comments/load-start":
      return {
        ...state,
        list: [],
        total: 0,
        waiting: true
      };

    case "comments/load-success":
      return {
        ...state,
        list: action.payload.data.items,
        total: action.payload.data.count,
        waiting: false
      };

    case "comments/load-error":
      return {
        ...state,
        list: [],
        total: 0,
        waiting: false
      };
    case "sendComment/load-success":
      return {
        ...state,
        waiting: false,
        count: state.count + 1,
        list: [...state.list, action.payload.data]
      };

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
