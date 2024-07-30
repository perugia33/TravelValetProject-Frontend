import styles from './Item.module.css'
function Item({ item, onDeleteItem, onToggleItem }) {   
    return (
        <li className={styles.item}>
         <label className={styles.checkboxLabel} >
            packed
    
           <input
            type="checkbox"
             value={item.packed}
             onChange={() => onToggleItem(item.id)}
             />
        </label>    
       
         
        <span style={item.packed ? { textDecoration: "line-through", textDecorationColor: "indigo"} : {}}>
          {item.quantity} {item.description}
          
        </span>
        
        <button className={styles.dBtn}   onClick={() => onDeleteItem(item.id)}>❌</button>
      </li>
      
    )
}

export default Item

