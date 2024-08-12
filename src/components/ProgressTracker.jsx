import styles from "./ProgressTracker.module.css";
import { useNavigate } from "react-router-dom";

function ProgressTracker({
    items,
    onSavedList,
    onSaveUpdatedList,
    listId,
    listNameRef,
    onClearAllItems
}) {
    const navigate = useNavigate();

    const handleSave = () => {
        if (listId) {
            // Existing list, use update function:
            if (onSaveUpdatedList) {
                onSaveUpdatedList();
            }
        } else {
            // New list, use save function:
            if (onSavedList) {
                onSavedList();
            }
        }
        navigate("/savedLists");
        console.log("List ID:", listId);
        console.log("Items saved", items);
        console.log("List Name:", listNameRef)
    };
    
    
    return (
        <footer className={styles.footer}>
            <button onClick={onClearAllItems}
            >
                Clear All Items
            </button>
            
            <button onClick={handleSave}>
                Save List
            </button>
            
            <button onClick={() => navigate("/savedLists", { state: { listId } })}>
                View Saved Lists
            </button>
        </footer>
    );
}

export default ProgressTracker;
