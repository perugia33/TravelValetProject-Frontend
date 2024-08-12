import styles from "./Item.module.css";
import { useState } from "react";

function Item({ item, onDeleteItem, onToggleItem, onUpdateItem, isNewItem }) {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(item.description);
  const [quantity, setQuantity] = useState(item.quantity);

  const handleSave = () => {
    if (description.trim() && quantity >= 0) {
      console.log("Saving item with ID:", item.id);
      console.log("Updated data:", { description, quantity });
      onUpdateItem(item.id, { description, quantity });
      setIsEditing(false);
    } else {
      alert(
        "Description cannot be empty and quantity must be a non-negative number."
      );
    }
  };

  return (
    <li className={styles.item}>
      <label className={styles.checkboxLabel}>
        Packed
        <input
          type="checkbox"
          checked={item.packed} //'checked' controls checkbox state
          onChange={() => onToggleItem(item.id)}
        />
      </label>

      {isEditing ? (
        <div>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
          />
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            placeholder="Enter quantity"
            min="0"
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div onClick={() => !item.packed && setIsEditing(true)}>
          <span
            style={
              item.packed
                ? {
                    textDecoration: "line-through",
                    textDecorationColor: "indigo",
                  }
                : {}
            }
          >
            {quantity} {description}
          </span>
          {!isNewItem && !item.packed &&(
            <button onClick={() => setIsEditing(true)}>Edit</button>
          )}
        </div>
      )}

      <button className={styles.dBtn} onClick={() => onDeleteItem(item.id)}>
        {" "}
        ❌{" "}
      </button>
    </li>
  );
}

export default Item;
