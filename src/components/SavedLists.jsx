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
            const response = await axios.get('/api/packinglists');
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
        navigate(`/savedListDetails/${list.id}`, { state: { list } });
      };  

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
 {savedLists.map(list => (
                        <tr key={list.id}>
                        <td>{list.dateSaved}</td>
                        <td>{list.name}</td>
                        <td>
                            <button >🗑 </button>
                            <button >📝</button>
                        </td>
                        </tr>

                        
                    ))}



*/