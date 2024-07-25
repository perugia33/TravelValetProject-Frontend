import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';
// import Logo from './Logo';


function NavBar() {
    return (
        <nav className={styles.nav}>
            
            {/* <Logo />     */}
            <ul >
                <li>
                    <NavLink to="/">Home</NavLink>    
                </li>
                <li>
                    <NavLink to="/packinglist">Packing List</NavLink> 
                </li>
                <li>
                    <NavLink to="/dining">Dining</NavLink>
                </li>
                <li>
                    <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                    <NavLink to="/expenses">Expense Tracker</NavLink>
                </li>
            </ul>
            
        </nav>
    )
}

export default NavBar
