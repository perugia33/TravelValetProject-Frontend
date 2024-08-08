  import { useLocation } from 'react-router-dom';
  import { useState } from 'react';   
  import PackList from './PackList';
  import PackingListForm from './PackingListForm';
  import ProgressTracker from './ProgressTracker';
  import PackLogo from "../components/PackLogo"
  import NavBar from "../components/NavBar";  


  function SavedListDetails() {
      const location = useLocation();
      const { listId, list } = location.state || {}; // Access the list from state
      const [items, setItems] = useState(list?.items || []);

      if (!list) return <div>No list found</div>;

    // Remove item handler
    const handleRemoveItem = (itemId) => {
    setItems(items.filter(item => item.id !== itemId));
     };

     // Toggle item packed state handler
  const handleToggleItem = (itemId) => {
    setItems(
      items.map(item =>
        item.id === itemId ? { ...item, packed: !item.packed } : item
      )
    );
  };

  // Add item handler
  const handleAddItem = (newItem) => {
    setItems([...items, newItem]);
  };



    return (
        <div>
            <NavBar />
            <PackLogo/>
            <PackingListForm  onAddItems={handleAddItem}/>
            <PackList
                    
                items={items}
                onDeleteItem={handleRemoveItem}
                onToggleItem={handleToggleItem}
            />
            <ProgressTracker
                items={items}
                listId={listId}
                listNameRef={list.name}
                onClearAllItems={() => setItems([])}
                onSavedList={() => console.log('Save list')}
            
            
            />
        </div>
  );




}

export default SavedListDetails
