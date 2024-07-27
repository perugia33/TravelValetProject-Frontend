import NavBar from "../components/NavBar";
import {useState, useEffect, useContext} from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpensesSummary from "../components/ExpensesSummary";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import styles from './expenseTracker.module.css';



function ExpenseTracker() {
  const {auth, logout} = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [updateExpenseData, setUpdateExpenseData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate();
  
  
  useEffect(() => {
    // if (!auth) {
    //   console.log('No auth token found');
    //   return;
    // } 
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/expenses', {
          headers: {
            'Authorization': `Bearer ${auth}`,
            'Content-Type': 'application/json',
          },
        });
        setExpenses(response.data);
      } catch (err) {
        console.error('Error fetching expenses:', err);
      } finally {
        setLoading(false);
      }
    };
    if (auth){
      fetchExpenses();
    }
  },[auth]);
  
  const addExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
  };

  const onDeleteExpense = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/expenses/${id}`, {
        headers: {
          'Authorization': `Bearer ${auth}`,
          'Content-Type': 'application',
        }
      });
      setExpenses(expenses.filter(expense => expense.id !== id));
    } catch (err) {
      console.error('Error deleting expense:', err);
    }
  };
  const onEditExpense = (expense) => {
    setEditingExpense(expense);
    setUpdateExpenseData({
      date: expense.date,
      description: expense.description,
      category: expense.category,
      amount: expense.amount,
    });
  };
  const handleUpdateExpense = async (id) => {
    try {
      await axios.put(`http://127.0.0.1:5000/expenses/${id}`, updateExpenseData, {
        headers: {
          'Authorization': `Bearer ${auth}`,
          'Content-Type': 'application',
        }
      });
      const response = await axios. get('http://127.0.0.1:5000/expenses', {
        headers: {
          'Content-Type': 'application',
          'Authorization': `Bearer ${auth}`,
        },
      });
      setExpenses(response.data);
      setEditingExpense(null);
      // setExpenses(expenses.map(expense => (expense.id === id ? { ...expense, ...updateExpenseData } : expense)));
      // setEditingExpense(null);
    } catch (err) {
      console.error('Error updating expense:', err);
    }
  };
  const handleChange = (e) => {
    setUpdateExpenseData({
      ...updateExpenseData,
      [e.target.name]: e.target.value,
    });
  };
  const handleLogout = () => {
    logout();
    navigate('/login');
    
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!auth) {
    return <div>Please log in to view and manage expenses.</div>;
  }
  return (
    <div className={styles.ExpenseTracker}>
      <NavBar />
      <h1>Expense Tracker</h1>
      <button onClick={handleLogout}>Logout</button>
      <ExpenseForm onAddExpense={addExpense}/>
      <div className={styles['content-container']}>
          <ExpenseList expenses={expenses} onDeleteExpense={onDeleteExpense} onEditExpense={onEditExpense}  />
          <ExpensesSummary expenses={expenses} />
      </div> 
      {editingExpense && (
        <div className={styles.ExpenseForm} >
          <h3>Edit Expense</h3>
          <form onSubmit={() => handleUpdateExpense(editingExpense.id)} className={styles["form-inline"]}>
            <div className={styles["form-group"]}>
              <label htmlFor="date">Date</label>
              <input
                type="date"
                name="date"
                value={updateExpenseData.date}
                onChange={handleChange}
              />
            </div>
            <div className={styles["form-group"]}>
              <label htmlFor="description">Description</label>
              <input
                type="text"
                name="description"
                value={updateExpenseData.description}
                onChange={handleChange}
              />
            </div>
            <div className={styles["form-group"]}>
              <label htmlFor="category">Category</label>
              <input
                type="text"
                name="category"
                value={updateExpenseData.category}
                onChange={handleChange}
              />
            </div>
            <div className={styles["form-group"]}>
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                name="amount"
                value={updateExpenseData.amount}
                onChange={handleChange}
              />
            </div>
            <button type="submit">Update</button>
            <button type='button' onClick={() => setEditingExpense(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}
    


export default ExpenseTracker;
