import styles from './PackingListForm.module.css'
import { useState } from 'react';

// eslint-disable-next-line react/prop-types
function PackingListForm({onAddItems}) {

    const[description, setDescription] = useState("");
    const[quantity, setQuantity] = useState(2); 


    function handleSubmit(event) {
        event.preventDefault();
        if (!description) return;
        // create a new item
        const newItem = { description, quantity, packed: false, id: Date.now() };
        console.log(newItem);
    
        // onAddItems(newItem);
        // reset the form
        onAddItems(newItem);
        setDescription("");
        setQuantity(1);


        console.log("Form submitted");
    }

    return (
        <form className={styles.addForm}  onSubmit={handleSubmit}>
            <h1>What are you taking on your trip?</h1>
            <select className={styles.select} value={quantity}  
            onChange={(e) => setQuantity(Number(e.target.value))}
            >
            {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}

             </select>
             <input
                 className={styles.select}
                type="text"
                value={description} 
                onChange={(e) => 
                    setDescription(e.target.value)
                   
                }

              
                placeholder="Item..."
                 />
             <button className={styles.select}>Add</button>
            
        </form>
    )
}

export default PackingListForm
