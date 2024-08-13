// eslint-disable-next-line no-unused-vars
import NavBar from "../components/NavBar"
import { Link } from "react-router-dom";    
import styles from "./Homepage.module.css";

function Homepage() {
    return (
         <main className={styles.homepage}>   
            <NavBar />
            <section>
                <h1>Travel Valet</h1>
                <br />
               
                <h1>
                Embark on your next adventure with confidence    
                 </h1>

                 <br />
                <h2>
                Let Travel Valet take care of the planning. 
                Get organized with a packing list, track travel expenses, 
                and discover great restaurants in your destination city.
                </h2>
                <br />
                <Link to ="/login" className="linkStyle">Start Planning</Link>
      </section>          
     </main>
    )
}

export default Homepage
