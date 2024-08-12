import styles from  "../components/Logo.module.css"   ;



function ExpenseLogo() {
    return (
        <div>
               <div className={styles.expenseLogo}>
            <h1  >
                Travel Valet
            </h1>
            <h2 className={styles.cursive}>
                Expense Tracker     
            </h2>   

        </div>
            
        </div>
    )
}

export default ExpenseLogo
