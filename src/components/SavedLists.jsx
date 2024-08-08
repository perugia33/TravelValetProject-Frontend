import SavedListsLogo from "../components/SavedListsLogo"
import NavBar from "../components/NavBar"
// import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./SavedLists.module.css"
// import axios from "axios"

function SavedLists() {
  /*
    const [savedLists, setSavedLists] = useState([])    

    useEffect(() => {
        const fetchSavedLists = async () => {
            try {
              const token = localStorage.getItem('token'); 
              const response = await axios.get('http://localhost:5000/packing-list', {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              setSavedLists(response.data);
            } catch (error) {
              console.error('Error fetching saved packing lists:', error);
            }
    };
    
        fetchSavedLists();
      }, []);

      */

    const navigate = useNavigate();
   

      const lists = [
        {
          id: 1,
          dateSaved: '2021-10-10',
          name: 'Beach Trip',
          items: [
            { description: 'Shoes', quantity: 4, packed: false, id: 1 },
            { description: 'Shirts', quantity: 3, packed: false, id: 2 },
            { description: 'Camera', quantity: 1, packed: false, id: 3 },
          ],
        },
        // Add more list objects if needed
      ];

    const handleEdit = (list) => {
        navigate(`/savedListDetails/${list.id}`, { listId: list.id, list } );
      };  

       // Add delete handler
    // const handleDelete = async (listId) => {
    //   try {
    //     await axios.delete(`http://localhost:5000/packing-list/${listId}`);
    //     setSavedLists(savedLists.filter(list => list.id !== listId));
    //   } catch (error) {
    //     console.error('Error deleting packing list:', error);
    //   }
    // };


    return (
        <div>
             <NavBar />
          <SavedListsLogo/>

            <table  className={styles.customTable}>
                <thead className={styles.thead}>
                    <tr>
                        <th>ID</th>   
                        <th>Date Saved</th>
                        <th>Name of List</th>
                        <th>Items</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                  {lists.map((list) => (
                    <tr key={list.id} onClick={() => handleEdit(list)}>
                      <td>{list.id}</td>
                      <td>{list.dateSaved}</td> 
                      <td>{list.name}</td>
                      <td>
                        {list.items.map((item) => (
                          <div key={item.id}>
                            {item.quantity}  {item.description}
                          </div>
                            ))}
                        </td>
                              
                      <td>
                          <button className={styles.button}  onClick={() => handleEdit(list)}>📝 edit </button >
                          <button className={styles.button}>🗑  delete </button>
                         
                      </td>     
                  </tr>
                   ))}
                 </tbody>
            </table>
        </div>
    )
}

export default SavedLists


/*
return (
    <div>
      <NavBar />
      <SavedListsLogo />

      <table className={styles.customTable}>
        <thead className={styles.thead}>
          <tr>
            <th>ID</th>
            <th>Date Saved</th>
            <th>Name of List</th>
            <th>Items</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {savedLists.map((list) => (
            <tr key={list.id} onClick={() => handleEdit(list)}>
              <td>{list.id}</td>
              <td>{new Date(list.date_saved).toLocaleDateString()}</td>
              <td>{list.list_name}</td>
              <td>
                {list.items.map((item) => (
                  <div key={item.id}>
                    {item.quantity} {item.item_name}
                  </div>
                ))}
              </td>
              <td>
                <button
                  className={styles.button}
                  onClick={() => handleEdit(list)}
                >
                  📝 edit
                </button>
                <button 
                className={styles.button}
                onClick={() => handleDelete(list.id)}
                >🗑 delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
*/
