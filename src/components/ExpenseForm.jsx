import {useState} from 'react';
import PropTypes from 'prop-types';
// import axios from 'axios';

const ExpenseForm = ({onAddExpense}) => {
  const [description, setDescription]=useState('');
  const [amount, setAmount]=useState('');
  const [date, setDate]=useState('');
  const [category, setCategory]=useState('');

  const handleSubmit = (e)=> {
    e.preventDefault();
    onAddExpense({
      description,
      amount: parseFloat(amount),
      date,
      category
    })
    
    setDescription('');
    setAmount('');
    setDate('');
    setCategory('');
  };
  return (
    <div className='ExpenseForm'>
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit} className='form-inline'>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input id="date" type="date" value={date} onChange={(e)=> setDate(e.target.value)} required/>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input type="text" id='description' value={description} onChange={(e)=> setDescription(e.target.value)} required/>
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input type="text" id='category' value={category} onChange={(e)=> setCategory(e.target.value)} required/>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input type="number" id='amount' value={amount} onChange={(e)=> setAmount(e.target.value)} required/>
        </div>
        <button type="submit">Add Expense</button>
      </form>

    </div>
    
      
    //   <input type="text" placeholder="Description" value={description} onChange={(e)=> setDescription(e.target.value)} required/>
    //   <input type="text" placeholder="Category" value={category} onChange={(e)=> setCategory(e.target.value)} required/>
    //   <input type="number" placeholder="Amount" value={amount} onChange={(e)=> setAmount(e.target.value)} required/>
    //   <button type="submit">Add Expense</button>
    // </form>
  );
};

ExpenseForm.propTypes = {
  onAddExpense: PropTypes.func.isRequired
};

export default ExpenseForm;