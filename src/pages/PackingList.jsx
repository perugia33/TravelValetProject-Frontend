import NavBar from "../components/NavBar"
import PackList from "../components/PackList";
import ProgressTracker from "../components/ProgressTracker";
import PackingListForm from "../components/PackingListForm";
import PackLogo from "../components/PackLogo";
import styles from "./PackingList.module.css";
import { useState, useRef }  from "react";
import axios from "axios";


function PackingList() {
  
    const [items, setItems] = useState([]); 
    const [listId] = useState(Date.now()); // Generate listId only once
    const listNameRef = useRef('');
  

    function handleAddItems(Item) {  
        setItems((Items) => [ ...Items, Item]);
    }

    const handleClearAllItems = () => {
      setItems([]);
    };

    function handleDeleteItem(id) {
        setItems((Items) => Items.filter((Item) => Item.id !== id));
    }


    //     // for the id that is passed in, we want to toggle the packed value
    //     // Loop through the items array and for the item with the id that 
    //     // matches the id passed in, toggle the packed value

     function handleToggleItem(id) {
        setItems(items.map(item =>
            item.id === id ? { ...item, packed: !item.packed } : item
        ))
    }


    async function handleSave() {
        const listName = prompt("Enter a name for your packing list (e.g., 'June 2024 London UK')");
      
        if (listName) {
          listNameRef.current = listName; 
          const dateSaved = new Date().toISOString(); // Generate timestamp for the current date and time
          try {
            const token = localStorage.getItem('token'); 
            const response = await axios.post("http://localhost:5000/packing-list", 
              { list_name: listName, 
                items ,
                listId,
                dateSaved
              }, 
              { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log("Response from save list", response.data);
          } catch (error) {
            console.log("Error saving list", error);
          }
        }
      }
        
    //    // save the items to backend  
     

    return (
        <div  className={styles.packingpage}>
              <NavBar />    

           
            <PackLogo/>

              <PackingListForm  onAddItems={handleAddItems} listId={listId} />   
           
            <PackList items={items}
                 onDeleteItem={handleDeleteItem}
                 onToggleItem={handleToggleItem}    
            />

            <ProgressTracker 
                items={items}
                onSavedList={handleSave}  listId={listId}  onClearAllItems={handleClearAllItems} listNameRef={listNameRef}/>
        </div>
        )
    }
    


export default PackingList
