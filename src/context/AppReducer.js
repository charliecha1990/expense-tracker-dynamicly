export default (state, action) => {
  switch(action.type) {
    case 'UPDATE_EXPENSES':
      return {
        ...state,
        data: action.payload
      }
    case 'ADD_EXPENSES':
      return {
        ...state,
        data: action.payload.map(expense => expense)
      }
    
    case 'DELETE_EXPENSES':
      return {
        ...state,
        data: action.payload.map(expense => expense)
      }

    default:
      return state;
  }
}