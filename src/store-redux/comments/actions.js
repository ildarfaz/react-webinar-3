export default {
  /**
   * Загрузка комментариев
   * @param parentId
   * @return {Function}
   */
  load: (parentId) => {
    return async (dispatch, getState, services) => {
      // Сброс текущего списка комментариев и установка признака ожидания загрузки
      dispatch({ type: "comments/load-start" });

      try {
        const res = await services.api.request({
          url: `api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${parentId}`
        });
        // Список комментариев загружен успешно
        dispatch({ type: "comments/load-success", payload: { data: res.data.result } });

      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: "comments/load-error" });
      }
    }
  },
}
