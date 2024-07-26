import NavBar from "../components/NavBar";
import {useState, useEffect} from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpensesSummary from "../components/ExpensesSummary";
import axios from "axios";
import styles from './expenseTracker.module.css';



function ExpenseTracker() {
    const [expenses, setExpenses] = useState([]);
    
    useEffect(() => {
        
        const fetchExpenses = async () => {
          try {
            const response = await axios.get('http://localhost:5173/expenses', {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
              }
            });
            setExpenses(response.data);
          } catch (err) {
            console.error('Error fetching expenses:', err);
          }
        };
    
        fetchExpenses();
      }, []);
    
      const addExpense = (newExpense) => {
        setExpenses([...expenses, newExpense]);
      };
    
      const handleDeleteExpense = async (id) => {
        try {
          await axios.delete(`http://localhost:5173/expense/${id}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
          });
          setExpenses(expenses.filter(expense => expense.id !== id));
        } catch (err) {
          console.error('Error deleting expense:', err);
        }
      };
    
    return (
        <div className={styles.ExpenseTracker}>
            <NavBar />
            <h1>Expense Tracker</h1>
            <ExpenseForm onAddExpense={addExpense}/>
            <div className={styles['content-container']}>
                <ExpenseList expenses={expenses} onDeleteExpense={handleDeleteExpense}  />
                <ExpensesSummary expenses={expenses} />
            </div>   
        </div>
    )
}
    


export default ExpenseTracker;
