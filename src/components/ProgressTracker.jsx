import styles from './ProgressTracker.module.css';


function ProgressTracker() {
    return (
        <footer className={styles.footer}>
           <h2> You have x items on your list and x items packed (x%)</h2>

             <button>Clear All Items</button>
           <button>Save List</button>
           <button>View Saved Lists</button>


        </footer>
    )
}

export default ProgressTracker
