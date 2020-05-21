import React, { useContext, useEffect } from 'react';
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import { forwardRef } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { columns } from '../helpers/constants'; // import table column settings
import { Message } from '../helpers/Message'; // import table column settings
import PropTypes from 'prop-types';

export function TransactionList() {

  const { 
    data, 
    updateExpenses, 
    deleteExpenses, 
    addExpenses
  } = useContext(GlobalContext);
  
  const [message, setMessage]  = React.useState(null)
  const [isOpen, setIsOpen] = React.useState(false)
  const [expenseFeed, setExpenseFeed] = React.useState(null)

  /**
  * mock fetch data
  */
  useEffect(() => {
    const feed = data.map(
      expense => {
        return {
          Description: expense.Description,
          Amount: expense.Amount, 
          Taxes: (expense.Amount * 0.15).toFixed(2),
          Date: expense.Date,
         }
      }
    )
    setExpenseFeed(feed)
  },[data])

  /**
  * customize table icons
  */
  const tableIcons = {
    Delete: forwardRef((props, ref) => 
      <Button variant="contained" color="secondary" {...props} ref={ref}>
        Delete
      </Button>
  ),
    Edit: forwardRef((props, ref) => 
      <Button variant="contained" color="default" {...props} ref={ref}>
        Edit
      </Button>
    ),
    Add: forwardRef((props, ref) => 
      <Button variant="contained" color="primary" {...props} ref={ref}>
        Add new expense
      </Button>
    )
  };

  /**
  * get current data in proper format
  */
  const getDate = () => {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time
    return dateTime;
  }

  /**
  * event handlers for message propt
  */
  const handleMessgaeClose = () => {
    setIsOpen(!isOpen)
  }

  /**
  * valid date form input
  */
  const isValid = targetExpense =>  {
    const isContained = data.filter(
      expense => expense.Description === targetExpense.Description
    ).length === 0

    return isContained;
  }

  return (
    <>
      {isOpen && <Message 
        isOpen={isOpen}
        message={message}
        handleClose={handleMessgaeClose}
      />}
      {expenseFeed === null? <h3>loading...</h3> : <div />}
      {expenseFeed &&
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
                  if(isValid(newData)) {
                    const updatedNewData = {
                      Description: newData.Description,
                      Amount: Number(newData.Amount), 
                      Taxes: (newData.Amount * 0.15).toFixed(2),
                      Date: getDate(),
                    }
                    const updatedData = expenseFeed.concat(updatedNewData);
                    addExpenses(updatedData);
                    setMessage(
                      {
                        body: 'Expense added',
                        type: 'success'
                      }
                    );
                    setIsOpen(true)
                  } else {
                    setMessage(
                      {
                        body: 'Expense exits !!!',
                        type: 'error'
                      }
                    );
                    setIsOpen(true)
                  }
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  const filteredData = expenseFeed.filter(
                    expense => expense.Description !== oldData.Description
                  )
                  const updatedData = filteredData.concat(
                    {
                      Description: newData.Description,
                      Amount: Number(newData.Amount), 
                      Taxes: (newData.Amount * 0.15).toFixed(2),
                      Date: newData.Date,
                    }
                  )
                  if(isValid(newData)) {
                    updateExpenses(updatedData);
                    setMessage(
                      {
                        body: 'Expense updated',
                        type: 'success'
                      }
                    );
                    setIsOpen(true)
                  } else {
                    setMessage(
                      {
                        body: 'Expense exits !!!',
                        type: 'error'
                      }
                    );
                    setIsOpen(true)
  
                  }
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
                  setMessage(
                    {
                      body: 'Expense deleted',
                      type: 'error'
                    }
                  );
                  setIsOpen(true)
                }, 600);
              }),
          }} 
        />
      }
    </>
  );
}

TransactionList.propTypes = {
  data: PropTypes.array.isRequired,
};