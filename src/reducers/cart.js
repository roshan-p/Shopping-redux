const initialState = {
  currentState: [],
  undoState: [],
  redoState: [],
};

const CartAction = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      initialState.currentState.push({ text: action.text, id: action.id, completed: false });
      return initialState;

    case 'UNDO_ITEM':
      if (initialState.currentState.length === 0) {
        initialState.undoState = [];
        return initialState;
      }
      let popedItem = initialState.currentState[initialState.currentState.length - 1]
      initialState.currentState.pop();
      initialState.undoState.push(popedItem)
      return initialState;

    case 'REDO_ITEM':
      if (initialState.undoState.length === 0) {
        initialState.redoState = [];
        return initialState;
      }
      let latestItem = initialState.undoState[initialState.undoState.length - 1]
      initialState.undoState.pop()
      let redoList = initialState.currentState.push(latestItem);
      initialState.redoState = redoList;
      return initialState;

    case 'TOGGLE_ITEM':
      initialState.currentState[action.id].completed = !initialState.currentState[action.id].completed
      return initialState;

    default:

      return state;

  }
}

export default CartAction