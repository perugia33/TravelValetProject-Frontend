import {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import styles from '../pages/expenseTracker.module.css';
import axios from 'axios';
import {AuthContext} from '../contexts/AuthContext.jsx';

const ExpenseForm = ({onAddExpense}) => {
  const {auth} = useContext(AuthContext);
  const [description, setDescription]=useState('');
  const [amount, setAmount]=useState('');
  const [date, setDate]=useState('');
  const [category, setCategory]=useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (amount && description && date && category) {
      try {
        const response = await axios.post(
          'http://127.0.0.1:5000/expenses', 
          {
            amount,
            description,
            date,
            category,
          },
          {
            headers: {
              'Authorization': `Bearer ${auth}`, // Use token for authentication
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.status === 201) {
          onAddExpense(response.data);
          setAmount('');
          setDescription('');
          setDate('');
          setCategory('');
        } else {
          console.error('Failed to add expense');
        }
      } catch (error) {
        console.error('Error adding expense:', error);
      }
    }
  };
  // const handleSubmit = (e)=> {
  //   e.preventDefault();
  //   onAddExpense({
  //     description,
  //     amount: parseFloat(amount),
  //     date,
  //     category
  //   })
    
  //   setDescription('');
  //   setAmount('');
  //   setDate('');
  //   setCategory('');
  // };
  return (
    <div className={styles.ExpenseForm}>
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit} className={styles["form-inline"]}>
        <div className={styles["form-group"]}>
          <label htmlFor="date">Date</label>
          <input id="date" type="date" value={date} onChange={(e)=> setDate(e.target.value)} required/>
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="description">Description</label>
          <input type="text" id='description' value={description} onChange={(e)=> setDescription(e.target.value)} required/>
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="category">Category</label>
          <input type="text" id='category' value={category} onChange={(e)=> setCategory(e.target.value)} required/>
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="amount">Amount</label>
          <input type="number" id='amount' value={amount} onChange={(e)=> setAmount(e.target.value)} required/>
        </div>
        <button type="submit">Add Expense</button>
      </form>

    </div>
    
    
  );
};

ExpenseForm.propTypes = {
  onAddExpense: PropTypes.func.isRequired
};

export default ExpenseForm;