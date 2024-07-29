/* eslint-disable react/prop-types */

import styles from './PackList.module.css'  
import Item from './Item'

function PackList({items, onDeleteItem, onToggleItem}) {
    
    return (
        <div className={styles.list}>
          <ul>      
          {items.map(item => (
               
                <Item item={item}  
                onDeleteItem={onDeleteItem}
                onToggleItem={onToggleItem}
                key={item.id}
                />
                
                ))}
          </ul>
          
            
        </div>
    )
}

export default PackList
