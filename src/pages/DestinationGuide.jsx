import NavBar from "../components/NavBar"   
import Restaurant_Weather from "../components/Restaurant_Weather";
import Sidebar from "../components/Sidebar"
import styles from "./DestinationGuide.module.css";
import Logo from "../components/Logo";
import axios from "axios";  
import { useState } from "react";


function DestinationGuide() {
    const [weatherData, setWeatherData] = useState([]);
    const [recommendations, setRecommendations] = useState([]); 
    const [loading, setLoading] = useState(false);  
    const [error, setError] = useState  (null);


    async function handleSubmit(formData) {
        setLoading(true);
        setError(null);
        try {
            // Request restaurant recommendations
            const restaurantResponse = await axios.get('/recommendations', {
                params: {
                    city: formData.city,
                    state: formData.state,
                    country: formData.country
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setRecommendations(restaurantResponse.data.recommendations);

            // Request weather data
            const weatherResponse = await axios.get('/weather', {
                params: {
                    city: formData.city,
                    state: formData.state,
                    country: formData.country
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setWeatherData(weatherResponse.data.weather);

        } catch (error) {
            setError('Failed to fetch data');
            console.error('Error submitting form data:', error);
        } finally {
            setLoading(false);
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
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                <Restaurant_Weather
                    recommendations={recommendations}
                    weatherData={weatherData}
                />
            </div>
        </div>
   
    )
}

export default DestinationGuide
