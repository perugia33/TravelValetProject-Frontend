import NavBar from "../components/NavBar"   
import Restaurant_Weather from "../components/Restaurant_Weather";
import Sidebar from "../components/Sidebar"
import styles from "./DestinationGuide.module.css";
import Logo from "../components/Logo";
import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";


function DestinationGuide() {
    const { clientApi } = useContext(AuthContext);
    const [weatherData, setWeatherData] = useState([]);
    const [recommendations, setRecommendations] = useState([]); 
    const [loading, setLoading] = useState(false);  
    const [error, setError] = useState  (null);


    async function handleSubmit(formData) {
        setLoading(true);
        setError(null);
        try {
            // Request restaurant recommendations
            const restaurantResponse = await clientApi.get('recommendations', {
                params: {
                    city: formData.city,
                    state: formData.state,
                    country: formData.country
                }
            });
            setRecommendations(restaurantResponse.data.recommendations);

            // Request weather data
            const weatherResponse = await clientApi.get('weather',{
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
            console.error('Error submitting form data:', {
                message: error.message,
                response: error.response ? error.response.data : null,
                request: error.request ? error.request : null
            });
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
            <div className={styles.background}>
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
        </div>
   
    )
}

export default DestinationGuide
