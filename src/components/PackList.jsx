/* eslint-disable react/prop-types */

import styles from './PackList.module.css'  
import Item from './Item'

function PackList({items, onDeleteItem, onToggleItem, onUpdateItem, isNewList }) {
  
  return (
    <div className={styles.list}>
      <ul>
        {items.map(item => (
          <Item 
            item={item}  
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            onUpdateItem={onUpdateItem}
            isNewItem={isNewList} // Pass the isNewList prop
            key={item.id}
          />
        ))}
      </ul>
    </div>
  );
}

export default PackList
