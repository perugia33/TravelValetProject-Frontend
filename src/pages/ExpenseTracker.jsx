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
  // const [loading, setLoading] = useState(true);
  const navigate=useNavigate();
  
  const client = axios.create({
    baseURL: 'http://127.0.0.1:5000/expenses', 
    headers: {
      'Authorization': `Bearer ${auth}`,
    },
  });

  const fetchExpenses = async() => {
    try{
      const response = await client.get();
      setExpenses(response.data);
    }
    catch(error){
      console.error('Error fetching expenses', error);
    }
  };
  
  useEffect(() => {
    if (auth) {
      fetchExpenses()
    }
  }, []);

  const onAddExpense = (newExpense) => {
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  };

  const onDeleteExpense = async(id) => {
    try {
      await client.delete(`/${id}`);
      setExpenses(expenses.filter(expense => expense.id !== id));
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };
  const onEditExpense = (expense) => {
    const formattedDate = new Date(expense.date).toISOString().split('T')[0]; 
    setEditingExpense(expense);
    setUpdateExpenseData({
      date: formattedDate,
      description: expense.description,
      category: expense.category,
      amount: expense.amount,
    });
  };
  const onUpdateExpense = async (id) => {
    try {
      await client.put(`/${id}`, updateExpenseData);
      setExpenses((prevExpenses)=>
        prevExpenses.map(expense => expense.id === id ? {...expense, ...updateExpenseData} : expense)
      );
      setEditingExpense(null);
    } catch (error) {
      console.error('Error updating expense:', error);
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
  if (!auth) {
    return <div>Please log in to view and manage expenses.</div>;
  }
  return (
    <div className={styles.ExpenseTracker}>
      <NavBar />
      <h1>Expense Tracker</h1>
      <div>
        {auth ? (
          <div>
            <p>Welcome!</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <p>Please log in.</p>
        )}
      </div>
      
      <ExpenseForm onAddExpense={onAddExpense}/>
      <div className={styles['content-container']}>
          <ExpenseList expenses={expenses} onDeleteExpense={onDeleteExpense} onEditExpense={onEditExpense}  />
          <ExpensesSummary expenses={expenses} />
      </div> 
      {editingExpense && (
        <div className={styles.ExpenseForm} >
          <h3>Edit Expense</h3>
          <form onSubmit={() => onUpdateExpense(editingExpense.id)} className={styles["form-inline"]}>
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
              <select
                name="category"
                value={updateExpenseData.category}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select a category</option> {/* Placeholder option */}
                <option value="Food">Food</option>
                <option value="Transportation">Transportation</option>
                <option value="Lodging">Lodging</option>
                <option value="Souvenirs">Souvenirs</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Other">Other</option>
              </select>
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
