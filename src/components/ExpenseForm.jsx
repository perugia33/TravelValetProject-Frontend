import {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import styles from '../pages/expenseTracker.module.css';
import {AuthContext} from '../contexts/AuthContext.jsx';


const ExpenseForm = ({onAddExpense}) => {
  const {clientApi} = useContext(AuthContext);
  const [description, setDescription]=useState('');
  const [amount, setAmount]=useState('');
  const [date, setDate]=useState('');
  const [category, setCategory]=useState('');
  

  const handleSubmit = async (e) => {
    console.log('Auth state:', clientApi)
    e.preventDefault();
    if (amount && description && date && category) {
      try {
        const response = await clientApi.post('expenses', {
          amount,
          description,
          date,
          category,
        });
        if (response.status === 201) {
          onAddExpense(response.data);
          setAmount('');
          setDescription('');
          setDate('');
          setCategory('');
        } 
      } catch (error) {
        console.error('Error adding expense:', error.response ? error.response.data : error.message);
        if (error.response && error.response.status === 401) {
          console.error('Token may be expired or invalid.');
        }
      }
    }  
  };
 
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
        <label htmlFor="description">Category</label>
          <select id='category' value={category} onChange={(e)=>setCategory(e.target.value)}required>
            <option value=''disabled>Select Category</option>
            <option value='Food'>Food</option>
            <option value='Transportation'>Transportation</option>
            <option value='Lodging'>Lodging</option>
            <option value='Souvenirs'>Souvenirs</option>
            <option value='Entertainment'>Entertainment</option>
            <option value='Other'>Other</option>
          </select>
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="amount">Amount</label>
          <input type="number" id='amount' value={amount} onChange={(e)=> setAmount(e.target.value)} required/>
        </div>
        <div>
          <br/>
          <button className={styles["button-expense"]} type="submit">Add Expense</button>
        </div>
      </form>

    </div>
    
    
  );
};

ExpenseForm.propTypes = {
  onAddExpense: PropTypes.func.isRequired
};

export default ExpenseForm;