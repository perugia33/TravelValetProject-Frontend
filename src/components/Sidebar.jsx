import styles from './Sidebar.module.css';
import SidebarForm from './SidebarForm';    


function Sidebar( {onSubmit }) {
    return (
        <div className={styles.sidebar}>
            <h1>Where are you going?</h1>
            <SidebarForm onSubmit={onSubmit} /> 
            
        </div>
    )
}

export default Sidebar
