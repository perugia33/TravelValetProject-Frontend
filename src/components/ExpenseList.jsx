// import React from 'react';

import PropTypes from 'prop-types';
// import './ExpListStyle'

const ExpenseList = ({expenses, onDeleteExpense,onEditExpense}) => {
  return (
    <div >
      <h2>Expenses</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.date}</td>
              <td>{expense.description}</td>
              <td>{expense.category}</td>
              <td>${expense.amount.toFixed(2)}</td>
              <td>
                <button onClick={() => onDeleteExpense(expense.id)}>Delete</button>
                <button onClick={() => onEditExpense(expense.id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
};

ExpenseList.propTypes = {
  expenses: PropTypes.array.isRequired,
  onDeleteExpense: PropTypes.func.isRequired,
  onEditExpense: PropTypes.func.isRequired
};

export default ExpenseList;