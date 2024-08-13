import PropTypes from 'prop-types'; 
import { useMemo } from 'react';

import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const ExpenseSummary = ({ expenses }) => {
  // Calculate total amount and category breakdown
  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const chartData = useMemo(() => {
    const categoryTotals = expenses.reduce((totals, expense) => {
      totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
      return totals;
    }, {});

    return {
      labels: Object.keys(categoryTotals),
      datasets: [
        {
          data: Object.values(categoryTotals),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
          hoverOffset: 4,
        },
      ],
    };
  }, [expenses]);


  return (
    <div >
      <h2>Expense Summary</h2>
      <p>Total Amount: ${totalAmount.toFixed(2)}</p>
      <div style={{ width: '100%', maxWidth: '300px', margin: '0 auto' }}>
        <Pie data={chartData} />
      </div>
      
    </div>
  );
};

ExpenseSummary.propTypes = {
  expenses: PropTypes.array.isRequired, 
};

export default ExpenseSummary;