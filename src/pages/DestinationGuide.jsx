import NavBar from "../components/NavBar"   
import Restaurant_Weather from "../components/Restaurant_Weather";
import Sidebar from "../components/Sidebar"
import styles from "./DestinationGuide.module.css";
import Logo from "../components/Logo";
import axios from "axios";  
import { useState, useContext} from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";


function DestinationGuide() {
    const {auth} = useContext(AuthContext);
    const [weatherData, setWeatherData] = useState([]);
    const [recommendations, setRecommendations] = useState([]); 
    const [loading, setLoading] = useState(false);  
    const [error, setError] = useState  (null);

    const client = axios.create({
        baseURL: 'http://127.0.0.1:5000', 
        headers: {
          'Authorization': `Bearer ${auth}`,
        },
      });


    async function handleSubmit(formData) {
        setLoading(true);
        setError(null);
        try {

            // Request restaurant recommendations
            const restaurantResponse = await client.get('/recommendations', {
                params: {
                    city: formData.city,
                    state: formData.state,
                    country: formData.country
                },
                headers: {
                    // Authorization: `Bearer ${localStorage.getItem('token')}`
                    Authorization: `Bearer ${auth}`
                }
            });
            setRecommendations(restaurantResponse.data.recommendations);

            // Request weather data
            const weatherResponse = await client.get('/weather',{
                params: {
                    city: formData.city,
                    state: formData.state,
                    country: formData.country
                },
                
            });
            // setWeatherData(weatherResponse.data.weather);
            const groupedData = weatherResponse.data.list.reduce((acc, item) => {
                const date = item.dt_txt.split(' ')[0]; // Extract date from datetime string
                if (!acc[date]) {
                    acc[date] = { minTemp: item.main.temp_min, maxTemp: item.main.temp_max, icon: item.weather[0].icon };
                } else {
                    acc[date].minTemp = Math.min(acc[date].minTemp, item.main.temp_min);
                    acc[date].maxTemp = Math.max(acc[date].maxTemp, item.main.temp_max);
                    acc[date].icon = item.weather[0].icon;
                }
                return acc;
                
            }, {});
            const fahrenheitConversion = tempCelsius => (tempCelsius * 9/5) + 32;
            const formatDate = (dateString) => {
                const date = new Date(dateString);
                return new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'short', day: '2-digit' }).format(date);
            };
    
            // Convert grouped data into an array
            const formattedData = Object.keys(groupedData).map(date => ({
                day: formatDate(date),
                minTemp: fahrenheitConversion(groupedData[date].minTemp),
                maxTemp: fahrenheitConversion(groupedData[date].maxTemp),
                condition: groupedData[date].icon
            }));
    
            setWeatherData(formattedData);
            console.log(weatherResponse.data)
            

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
