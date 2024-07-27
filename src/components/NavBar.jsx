import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';
// import {AuthContext} from '../contexts/AuthContext';
// import { useContext } from 'react';
// import Logo from './Logo';


function NavBar() {
    // const {auth, logout} = useContext(AuthContext);
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
