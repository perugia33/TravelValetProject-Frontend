import NavBar from "../components/NavBar";
import ExpenseLogo from "../components/ExpenseLogo"
import {useState, useEffect, useContext, useCallback} from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpensesSummary from "../components/ExpensesSummary";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import styles from './expenseTracker.module.css';



function ExpenseTracker() {
  const {auth, user, logout, clientApi} = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [updateExpenseData, setUpdateExpenseData] = useState({});
  const navigate=useNavigate();
  // console.log("Token", auth?.token);

  const fetchExpenses = useCallback(async()=>{
    try{
      // console.log('Authorization Header:', clientApi.defaults.headers['Authorization']);
      const response = await clientApi.get('expenses');
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses', error);
    }
  },[clientApi]);

  useEffect(() => {
    if(auth){
      fetchExpenses();
    }
  },[auth,fetchExpenses]);

  //**Asi es como funcionaba */

  // const fetchExpenses = async() => {
  //   try{
  //     const response = await client.get();
  //     setExpenses(response.data);
  //   }
  //   catch(error){
  //     console.error('Error fetching expenses', error);
  //   }
  // };
  
  // useEffect(() => {
  //   if (auth) {
  //     fetchExpenses()
  //   }
  // }, []);

  const onAddExpense = (newExpense) => {
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  };

  const onDeleteExpense = async(id) => {
    try {
      await clientApi.delete(`expenses/${id}`);
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

  // const onUpdateExpense = async (id) => {
  //   if (editingExpense) {
  //     try {
  //       const response = await clientApi.put(`expenses/${editingExpense.id}`, updateExpenseData);
  //       console.log('Updated Expense Response:', response.data);
  //       setExpenses((prevExpenses)=>
  //         prevExpenses.map(expense => expense.id === editingExpense.id ? { ...expense, ...updateExpenseData } : expense)
  //       );
  //       setEditingExpense(null);
  //     } catch (error) {
  //       console.error('Error updating expense:', error);
  //     }
  //   }
  // };
  const onUpdateExpense = async () => {
    if (editingExpense) {
      try {
        const response = await clientApi.put(`expenses/${editingExpense.id}`, updateExpenseData);
        console.log('Updated Expense Response:', response.data);
        // Update the state with the updated expense
        setExpenses((prevExpenses) =>
          prevExpenses.map(expense =>
            expense.id === editingExpense.id ? { ...expense, ...updateExpenseData } : expense
          )
        );
        setEditingExpense(null);
      } catch (error) {
        console.error('Error updating expense:', error);
      }
    }
  };
  
  
  // const handleChange = (e) => {
  //   setUpdateExpenseData({
  //     ...updateExpenseData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setUpdateExpenseData(prevState => ({
      ...prevState,
      [name]: type === 'number' ? parseFloat(value) : value,
    }));
  };  
  

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!auth) {
    return <div><h2>Please login to view and manage expenses.</h2>
      <br />
      <button onClick={() => navigate('/login')}>Login</button>
      
    </div>;
  }

  return (
    <div className={styles.ExpenseTracker}>
      <NavBar />
      <ExpenseLogo/>
      <div>
        {auth ? (
          <div className={styles["top-right"]}>
            <p>Hello {user}! </p>
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
          {/* <form onSubmit={() => onUpdateExpense(editingExpense.id)} className={styles["form-inline"]}> */}
          <form onSubmit={(e) => {
            e.preventDefault();
            onUpdateExpense();
          }} className={styles["form-inline"]}>

         
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
                <option value="" disabled>Select a category</option> 
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
            <div>
              <br />
              <button className={styles["edit-button"]} type="submit">Update</button>
              <button className={styles["left"]} type='button' onClick={() => setEditingExpense(null)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
    


export default ExpenseTracker;
