import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const Balance = () => {
  const { data } = useContext(GlobalContext);
  
  const sub_total_with_tax = (data.reduce((a, b)  => a + b.Amount, 0)*(1.15)).toFixed(2)
  const sub_total = (data.reduce((a, b)  => a + b.Amount,0)).toFixed(2)

  return (
    <div>
      <h5>The sub-total of expenses is {sub_total} $</h5>
      <h5>The total with taxes is {sub_total_with_tax} $</h5>
    </div>
  )
}
