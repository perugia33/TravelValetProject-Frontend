// import {useState, useEffect, useContext} from 'react';
// import axios from 'axios';
import PropTypes from 'prop-types';
// import {AuthContext} from '../contexts/AuthContext.jsx';
// import './ExpListStyle'

const ExpenseList = ({ expenses, onDeleteExpense, onEditExpense }) => {
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
              <td>${(expense.amount && !isNaN(expense.amount)) ? expense.amount.toFixed(2) : 'N/A'}</td>
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


// const ExpenseList = () => {
//   const {auth} = useContext(AuthContext);
//   const [expenses, setExpenses] =  useState([]);
//   const [editingExpense, setEditingExpense] =useState(null);
//   const [updateExpense, setUpdateExpense] = useState({});
  
//   useEffect(() => {
//     const fetchExpenses = async () => {
//       try {
//         const response = await axios.get('http://127.0.0.1:5000/expenses', {
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${auth}`,
//           },
//         });
//         setExpenses(response.data);
//       } catch (error) {
//         console.error('Error fetching expenses:', error);
//       }
//     };
//     if (auth) {
//       fetchExpenses();
//     }
//   }, [auth]);

    

//   const onDeleteExpense = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5173/expense/${id}`, {
//         headers: {
//           'Content-Type': 'application',
//           'Authorization': `Bearer ${auth}`,
//         },
//       });
//       setExpenses(expenses.filter((expense) => expense.id !== id));
//     } catch (error) {
//         console.error('Error deleting expense:', error);
//     }
//   };

//   const onEditExpense = (expense) => {
//     setEditingExpense(expense);
//     setUpdateExpense({
//       date: expense.date,
//       description: expense.description,
//       category: expense.category,
//       amount: expense.amount,
//     });
//   };

//   const handleUpdateExpense = async (id) => {
//     try {
//       await axios.put(`http://127.0.0.1:5000/expenses/${id}`, updateExpense, {
//         headers: {
//           'Content-Type': 'application',
//           'Authorization': `Bearer ${auth}`,
//         },
//       });
//       const response = await axios. get('http://127.0.0.1:5000/expenses', {
//         headers: {
//           'Content-Type': 'application',
//           'Authorization': `Bearer ${auth}`,
//         },
//       });
//       setExpenses(response.data);
//       setEditingExpense(null);
//     } catch (error) {
//       console.error('Error updating expense:', error);
//     }
//   };

//   const handleChange = (e) => {
//     setUpdateExpense({
//       ...updateExpense,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <div >
//       <h2>Expenses</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Date</th>
//             <th>Description</th>
//             <th>Category</th>
//             <th>Amount</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {expenses.map((expense) => (
//             <tr key={expense.id}>
//               <td>{expense.date}</td>
//               <td>{expense.description}</td>
//               <td>{expense.category}</td>
//               <td>${expense.amount.toFixed(2)}</td>
//               <td>
//                 <button onClick={() => onDeleteExpense(expense.id)}>Delete</button>
//                 <button onClick={() => onEditExpense(expense.id)}>Edit</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {editingExpense && (
//         <div>
//           <h3>Edit Expense</h3>
//           <form onSubmit={() => handleUpdateExpense(editingExpense.id)}>
//             <div>
//               <label htmlFor="date">Date</label>
//               <input
//                 type="date"
//                 name="date"
//                 value={updateExpense.date}
//                 onChange={handleChange}
//               />
//             </div>
//             <div>
//               <label htmlFor="description">Description</label>
//               <input
//                 type="text"
//                 name="description"
//                 value={updateExpense.description}
//                 onChange={handleChange}
//               />
//             </div>
//             <div>
//               <label htmlFor="category">Category</label>
//               <input
//                 type="text"
//                 name="category"
//                 value={updateExpense.category}
//                 onChange={handleChange}
//               />
//             </div>
//             <div>
//               <label htmlFor="amount">Amount</label>
//               <input
//                 type="number"
//                 name="amount"
//                 value={updateExpense.amount}
//                 onChange={handleChange}
//               />
//             </div>
//             <button type="submit">Update</button>
//             <button type='button' onClick={() => setEditingExpense(null)}>Cancel</button>
//           </form>
//         </div>
//       )}
//     </div>

//   );

// }
          



// const ExpenseList = ({expenses, onDeleteExpense,onEditExpense}) => {
//   return (
//     <div >
//       <h2>Expenses</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Date</th>
//             <th>Description</th>
//             <th>Category</th>
//             <th>Amount</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {expenses.map((expense) => (
//             <tr key={expense.id}>
//               <td>{expense.date}</td>
//               <td>{expense.description}</td>
//               <td>{expense.category}</td>
//               <td>${expense.amount.toFixed(2)}</td>
//               <td>
//                 <button onClick={() => onDeleteExpense(expense.id)}>Delete</button>
//                 <button onClick={() => onEditExpense(expense.id)}>Edit</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
      
//     </div>
//   );
// };

ExpenseList.propTypes = {
  expenses: PropTypes.array.isRequired,
  onDeleteExpense: PropTypes.func.isRequired,
  onEditExpense: PropTypes.func.isRequired
};

export default ExpenseList;