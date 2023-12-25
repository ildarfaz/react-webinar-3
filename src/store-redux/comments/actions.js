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
        dispatch({ type: "comments/load-success", payload: { data: res.data.result, parentId } });

      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: "comments/load-error" });
      }
    }
  },
  sendComment(newComment, name) {
    return async (dispatch, getState, services) => {
      try {
        const res = await services.api.request({
          url: `/api/v1/comments`,
          method: "post",
          body: JSON.stringify(newComment),
          fields: "*"
        });
        if ([200, 201].includes(res.status)) {
          dispatch({
            type: 'sendComment/load-success',
            payload: {
              data: {
                ...res.data.result,
                author: {
                  ...res.data.result.author,
                  profile: { name }
                }
              }
            }
          });
        }

      } catch (e) {
      }
    }
  },
}