
import PropTypes from 'prop-types';
import styles from '../pages/expenseTracker.module.css';


const ExpenseList = ({ expenses, onDeleteExpense, onEditExpense }) => {
  console.log('id', expenses.map(expense =>(expense.id)))
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
          {expenses.map(expense => (
            <tr key={expense.id}>
              <td>{expense.date}</td>
              <td>{expense.description}</td>
              <td>{expense.category}</td>
              <td className={styles["amount-cell"]}>${expense.amount.toFixed(2)} </td>
              <td>
                <button onClick={() => onDeleteExpense(expense.id)}>Delete</button>
                <button className={styles["left"]} onClick={() => onEditExpense(expense)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

ExpenseList.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired, 
      date: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    })
  ).isRequired,
  onDeleteExpense: PropTypes.func.isRequired,
  onEditExpense: PropTypes.func.isRequired,
};
export default ExpenseList;