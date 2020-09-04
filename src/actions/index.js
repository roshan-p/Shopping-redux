let idCounter = 0
export const addItem = (text) => ({
  type: 'ADD_ITEM',
  id: idCounter++,
  text
});
export const unDoItem = () => ({
  type: 'UNDO_ITEM',
});
export const reDoItem = () => ({
  type: 'REDO_ITEM',
});
export const toggleItem = (id) => ({
  type: 'TOGGLE_ITEM',
  id,
});
export const filterItem = (filter, itemList) => ({
  type: 'ITEM_FILTER',
  filter,
  itemList
});

