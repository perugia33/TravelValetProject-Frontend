import NavBar from "../components/NavBar"
import PackList from "../components/PackList";
import ProgressTracker from "../components/ProgressTracker";
import PackingListForm from "../components/PackingListForm";
import PackLogo from "../components/PackLogo";
import styles from "./PackingList.module.css";
import { useState } from "react";



function PackingList() {
    const [items, setItems] = useState([]); 

    function handleAddItems(Item) {  
        setItems((Items) => [ ...Items, Item]);
    }

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


    return (
        <div  className={styles.packingpage}>
              <NavBar />    

           
            <PackLogo/>

              <PackingListForm  onAddItems={handleAddItems}/>   
           
            <PackList items={items}
                 onDeleteItem={handleDeleteItem}
                 onToggleItem={handleToggleItem}    
            />

            <ProgressTracker/>
        </div>
    )
}

export default PackingList
