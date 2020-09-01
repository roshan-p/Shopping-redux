const initialState = [];
let undoState = [];
let filterState = [];
const redoState = [];
let currentType = 'ADD_ITEM'
const cartAction = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      currentType = 'ADD_ITEM'
      return initialState.push({ text: action.text, id: action.id, completed: false });

    case 'UNDO_ITEM':
      currentType = 'UNDO_ITEM'
      let popedItem = initialState[initialState.length - 1]
      initialState.pop();
      state = undoState;
      return undoState.push(popedItem)

    case 'REDO_ITEM':
      if (undoState.length === 0) {

        redoState = [];
        return;
      }
      currentType = 'REDO_ITEM'
      let latestItem = undoState[undoState.length - 1]
      undoState.pop()
      let redoList = initialState.push(latestItem);
      redoState = redoList;

      return redoState;

    case 'TOGGLE_ITEM':
      initialState[action.id].completed = !initialState[action.id].completed
      return initialState

    case 'ITEM_FILTER':
      currentType = 'ITEM_FILTER'
      if (action.filter === 'SHOWALL') {
        filterState = initialState

      }
      if (action.filter === 'ACTIVE') {
        filterState = initialState.filter(function (item) {
          return item.completed == false;
        });

      }
      if (action.filter === 'COMPLETED') {
        filterState = initialState.filter(function (item) {
          return item.completed == true;
        });
      }
      return filterState;
    default:
      if (currentType === 'UNDO_ITEM') {
        return undoState;
      } else if (currentType === 'REDO_ITEM') {
        return redoState;
      } else if (currentType === 'ITEM_FILTER') {
        return filterState;
      } else {
        return state;
      }
  }
}

export default cartAction