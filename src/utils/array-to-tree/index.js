/**
 * Преобразование списка в иерархию
 * @param array {Array} Список объектов с отношением на родителя
 * @param parentId id родителя
 * @returns {Array} Корневые узлы
 */
export const arrayToTree = (array, parentId = null, level = 0) => {
  return array.reduce((result, item) => {
    const itemParent = item.parent?._id || null;
    if (itemParent === parentId) {
      result.push({ ...item, level, children: [...arrayToTree(array, item._id, level + 1)] });
    }
    return result;
  }, []);
}
