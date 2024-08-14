import NavBar from "../components/NavBar";
import PackList from "../components/PackList";
import ProgressTracker from "../components/ProgressTracker";
import PackingListForm from "../components/PackingListForm";
import PackLogo from "../components/PackLogo";
import styles from "./PackingList.module.css";
import { useState, useRef, useContext } from "react";
// import useApi from "../services/api";
import {AuthContext} from "../contexts/AuthContext.jsx"

function PackingList() {
  const [items, setItems] = useState([]);
  const [listId] = useState(Date.now()); // Generate listId only once
  const listNameRef = useRef("");
  // const api = useApi(); //Use centralized Axios hook
  const { clientApi } = useContext(AuthContext);

  function handleAddItems(Item) {
    setItems((Items) => [...Items, Item]);
  }

  const handleClearAllItems = () => {
    setItems([]); // Clears all items from the local state
  };

  function handleDeleteItem(id) {
    setItems((Items) => Items.filter((Item) => Item.id !== id));
  }

  function handleToggleItem(id) {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  async function handleSave() {
    const listName = prompt(
      "Enter a name for your packing list (e.g., 'June 2024 London UK')"
    );

    if (listName) {
      listNameRef.current = listName;
      const dateSaved = new Date().toISOString(); // Generate timestamp for the current date and time
      try {
        //Use the configured Axios instance in api.jsx
        const response = await clientApi.post("packing-list", {
          listId,
          listName,
          dateSaved,
          items,
        });
        console.log("Response from save list", response.data);
      } catch (error) {
        console.log("Error saving list", error);
      }
    }
  }

  return (
    <div className={styles.packingpage}>
      <NavBar />

      <PackLogo />

      <PackingListForm onAddItems={handleAddItems} listId={listId} />

      <PackList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        isNewList={true} // Pass true as we are adding items to a new list
      />

      <ProgressTracker
        items={items}
        onSavedList={handleSave} // Pass the function to save a new list
        listId={null} // New list doesn't have an ID yet
        onClearAllItems={handleClearAllItems}
        listNameRef={listNameRef}
      />
    </div>
  );
}

export default PackingList;
