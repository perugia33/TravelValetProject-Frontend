import NavBar from "../components/NavBar"   
import Restaurant_Weather from "../components/Restaurant_Weather";
import Sidebar from "../components/Sidebar"
import styles from "./DestinationGuide.module.css";
import Logo from "../components/Logo";
import axios from "axios";  


function DestinationGuide() {
    async function  handleSubmit  (formData)  {
        try {
            const response = await axios.post('/api/destination', formData);
            console.log('Server response:', response.data);
         
        } catch (error) {
            console.error('Error submitting form data:', error);
        
        }
    }


    return (
        <div>
        <NavBar />
        {/* <h1>Travel Valet</h1>
        <h2>Destination Guide</h2> */}
         <Logo/>
            <div className={styles.container}>
                  <Sidebar onSubmit={handleSubmit} />
           
                <Restaurant_Weather />
            </div>
        </div>
   
    )
}

export default DestinationGuide
