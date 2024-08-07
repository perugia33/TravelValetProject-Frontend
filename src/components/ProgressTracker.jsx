import styles from './ProgressTracker.module.css';
import { useNavigate } from 'react-router-dom';



function ProgressTracker( { items, onSavedList, listId , listNameRef,  onClearAllItems}) {
    const navigate = useNavigate();


    return (
        <footer className={styles.footer}>
    
             <button onClick={()=> {
                onClearAllItems();
                 }}>
                Clear All Items
                </button>

            <button onClick={() => {
                onSavedList();
                navigate('/savedLists');
                console.log("List ID:", listId); 
                console.log("Items saved", items);
                console.log("List Name:", listNameRef);
                 }}>
                    Save List
                 </button>

           <button onClick={() => navigate('/savedLists', { state: { listId } })}>
            View Saved Lists
            </button>


        </footer>
    )
}

export default ProgressTracker
