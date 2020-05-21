export default (state, action) => {
  switch(action.type) {
    case 'UPDATE_EXPENSES':
      localStorage.setItem(
        'expenses', JSON.stringify({ data: action.payload})
      )
      return {
        ...state,
        data: action.payload
      }
    case 'ADD_EXPENSES':
      localStorage.setItem(
        'expenses', JSON.stringify({ data: action.payload})
      )
      return {
        ...state,
        data: action.payload
      }
    
    case 'DELETE_EXPENSES':
      localStorage.setItem(
        'expenses', JSON.stringify({ data: action.payload})
      )
      return {
        ...state,
        data: action.payload
      }
    
      case 'GET_EXPENSES':
        const expenses = JSON.parse(localStorage.getItem('expenses'))
        const authenticated = action.payload.token === 'token'
        
        if (authenticated) {
          return {
            ...state,
            data: expenses
          }
        } else {
          return state;          
        }
 

    default:
      return state;
  }
}