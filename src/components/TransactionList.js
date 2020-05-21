import React, { useContext } from 'react';
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import { forwardRef } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { columns } from '../helpers/constants'; // import table column settings

export function TransactionList() {

  const { data, updateExpenses, deleteExpenses, addExpenses } = useContext(GlobalContext);

  const expenseFeed = data.map(
    expense => {
      return {
        Description: expense.Description,
        Amount: expense.Amount, 
        Taxes: (expense.Amount * 0.15).toFixed(2),
        Date: expense.Date,
       }
    }
  )

  console.log( 'total with tax',
    (expenseFeed.reduce((a, b)  => a + b.Amount, 0)*(1.15)).toFixed(2)
  )

  console.log('context', useContext(GlobalContext));

  const DeleteButton = () => {
    return (
      <Button variant="contained" color="secondary">
        Delete
      </Button>
    )
  }

  const EditButton = () => {
    return (
      <Button variant="contained" color="default">
        Edit
      </Button>
    )
  }

  const AddButton = () => {
    return (
      <Button variant="contained" color="primary">
        Add new expense
      </Button>
    )
  }

  const tableIcons = {
    Delete: forwardRef((props, ref) => <DeleteButton {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <EditButton {...props} ref={ref} />),
    Add: forwardRef((props, ref) => <AddButton {...props} ref={ref} />)
  };

  const getDate = () => {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time
    return dateTime;
  }

  console.log(getDate())

  return (
    <MaterialTable
      title="Expenses"
      options={{
        search: false,
        actionsColumnIndex: -1
      }}
      columns={columns}
      data={expenseFeed}
      icons={tableIcons}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              const updatedData = {
                Description: newData.Description,
                Amount: Number(newData.Amount), 
                Taxes: (newData.Amount * 0.15).toFixed(2),
                Date: getDate(),
              }
              const data = expenseFeed.push(updatedData);
              addExpenses(expenseFeed);
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              const filteredData = expenseFeed.filter(
                expense => expense.Description !== newData.Description
              )
              const updatedData = filteredData.concat(
                {
                  Description: newData.Description,
                  Amount: Number(newData.Amount), 
                  Taxes: (newData.Amount * 0.15).toFixed(2),
                  Date: newData.Date,
                }
              )
              updateExpenses(updatedData);
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              const updatedData = expenseFeed.filter(
                expense => expense.Description !== oldData.Description
              )
              deleteExpenses(updatedData);
            }, 600);
          }),
      }}
    />
  );
}
