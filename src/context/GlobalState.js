import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

// Initial state
const initialState = {
  data: [
    { Description: 'Beef', Amount: 3 , Date: '2020-01-23' },
    { Description: 'Apple', Amount: 2 , Date: '2020-01-23' },
    { Description: 'Egg', Amount: 1 , Date: '2020-01-23' },
  ]
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  function updateExpenses(expenses) {  
    dispatch({
      type: 'UPDATE_EXPENSES',
      payload: expenses
    });
  }
  
  function deleteExpenses(expenses) {  
    dispatch({
      type: 'DELETE_EXPENSES',
      payload: expenses
    });
  }

  function addExpenses(expenses) {  
    dispatch({
      type: 'ADD_EXPENSES',
      payload: expenses
    });
  }

  return (
  <GlobalContext.Provider value={{
    data: state.data,
    deleteExpenses,
    addExpenses,
    updateExpenses
  }}>
    {children}
  </GlobalContext.Provider>);
}