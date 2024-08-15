import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import PackList from "./PackList";
import PackingListForm from "./PackingListForm";
import ProgressTracker from "./ProgressTracker";
import PackLogo from "../components/PackLogo";
import NavBar from "../components/NavBar";
import { AuthContext } from "../contexts/AuthContext.jsx";

function SavedListDetails() {
  const { listId } = useParams(); // Use URL params to get the listId
  const [list, setList] = useState(null);
  const [items, setItems] = useState([]);
  const { clientApi } = useContext(AuthContext);

  // Get one list by id:
  useEffect(() => {
    const fetchListDetails = async () => {
      try {
        if (listId) {
          const response = await clientApi.get(`packing-list/${listId}`);
          setList(response.data);
          setItems(response.data.items || []);
        }
      } catch (error) {
        console.error("Error fetching packing list details:", error);
      }
    };

    fetchListDetails();
  }, [listId, clientApi]);

  // Remove item from a list by id:
  const handleRemoveItem = async (itemId) => {
    try {
      await clientApi.delete(`packing-list/${listId}/items/${itemId}`);
      // Update the state to remove the item
      setItems(items.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Toggle item's 'packed' state:
  const handleToggleItem = async (itemId) => {
    try {
      const response = await clientApi.patch(`packing-list/${listId}/items/${itemId}/toggle`);
      const updatedItem = response.data.item;
      setItems(
        items.map((item) =>
          item.id === itemId ? { ...item, packed: updatedItem.packed } : item
        )
      );
    } catch (error) {
      console.error("Error toggling item status", error);
    }
  };

  // Add item to a saved list:
  const handleAddItem = async (newItem) => {
    try {
      const response = await clientApi.post(`packing-list/${listId}/items`, newItem);
      const addedItem = response.data.item;
      // Update state with the newly added item:
      setItems([...items, addedItem]);
    } catch (error) {
      console.error("Error adding new item", error);
    }
  };

  // Update list name and add new items:
  const handleUpdateList = async () => {
    const newListName = prompt(
      "Enter a new name for the list (leave blank to keep the current name)"
    );

    if (newListName !== null) {
      try {
        // Send the updated list name and items to the backend
        const response = await clientApi.put(`packing-list/${listId}`, {
          listName: newListName || list.listName, // Use the current list name if none is provided
          items: items,
        });

        // Update local state with response data
        setList(response.data.packing_list);
        setItems(response.data.packing_list.items);

        console.log("List updated successfully:", response.data);
      } catch (error) {
        console.error("Error updating the list", error);
      }
    }
  };

  // Update item's description and quantity:
  const handleUpdateItem = async (itemId, updatedData) => {
    try {
      const response = await clientApi.put(`packing-list/${listId}/items/${itemId}`, updatedData);
      setItems(
        items.map((item) =>
          item.id === itemId ? { ...item, ...updatedData } : item
        )
      );
      console.log("Item updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  // Clear all items from a list:
  const handleClearAllItemsSaved = async () => {
    try {
      // Call API to remove all items from the backend
      await clientApi.delete(`packing-list/${listId}/items`);

      // Clear items from local state
      setItems([]);
    } catch (error) {
      console.error("Error clearing items from the backend:", error);
    }
  };

  if (!list) return <div>Loading...</div>;

  return (
    <div>
      <NavBar />
      <PackLogo />
      <h1>{list.listName}</h1> {/* Display the current list name */}
      <PackingListForm onAddItems={handleAddItem} />
      <PackList
        items={items}
        onDeleteItem={handleRemoveItem}
        onToggleItem={handleToggleItem}
        onUpdateItem={handleUpdateItem}
      />
      <ProgressTracker
        items={items}
        listId={listId} // ID of the list being updated
        listNameRef={list.listName}
        onClearAllItems={handleClearAllItemsSaved}
        onSaveUpdatedList={handleUpdateList} // Pass the funtion to update an existing list
      />
    </div>
  );
}

export default SavedListDetails;
