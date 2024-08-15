import SavedListsLogo from "../components/SavedListsLogo";
import NavBar from "../components/NavBar";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SavedLists.module.css";
import { AuthContext } from "../contexts/AuthContext.jsx";


function SavedLists() {
  const [savedLists, setSavedLists] = useState([]);
  const navigate = useNavigate();
  const { clientApi } = useContext(AuthContext);

  // Get list of saved lists:
  useEffect(() => {
    const fetchSavedLists = async () => {
      try {
        const response = await clientApi.get("packing-list");
        setSavedLists(response.data);
      } catch (error) {
        console.error("Error fetching saved packing lists:", error);
      }
    };

    fetchSavedLists();
  }, [clientApi]);

  // Navigate to the details page using the listId:
  const handleEdit = (listId) => {
    navigate(`/savedListDetails/${listId}`);
  };

  // Delete a list
  const handleDelete = async (listId) => {
    try {
      await clientApi.delete(`packing-list/${listId}`);
      //Update state to remove deleted list
      setSavedLists(savedLists.filter((list) => list.id !== listId));
    } catch (error) {
      console.error("Error deleting packing list:", error);
    }
  };

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
            <tr key={list.id}>
              <td>{list.id}</td>
              <td>{list.dateSaved}</td>
              <td>{list.listName}</td>
              <td>
                {list.items.map((item) => (
                  <div key={item.id}>
                    {item.quantity} {item.description}
                  </div>
                ))}
              </td>

              <td>
                <button
                  className={styles.button}
                  onClick={(e) => {
                    e.stopPropagation(); //Prevent click from also triggering the handleDelete
                    handleEdit(list.id);
                  }}
                >
                  📝 edit
                </button>
                <button
                  className={styles.button}
                  onClick={(e) => {
                    e.stopPropagation(); //
                    handleDelete(list.id);
                  }}
                >
                  🗑 delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SavedLists;
