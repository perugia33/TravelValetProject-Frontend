   import styles from './Weather.module.css'    

    function WeatherData({weather}) {
        const weatherData = weather || [];
        return (
            <div className={styles.weatherContainer}>
                {weatherData.map((day, index) => (
                <div key={index} className={styles.weatherData}>
                    <div className={styles.day}>{day.day}</div>
                    <div className={styles.temp}>
                            {/* <div className={styles.condition}>{day.condition}</div> */}
                            <img src={`http://openweathermap.org/img/wn/${day.condition}.png`} alt="Weather icon" />
                        <span className={styles.minTemp}>{day.minTemp.toFixed(1)}°F</span>
                        <span className={styles.maxTemp}>{day.maxTemp.toFixed(1)}°F</span>
                    </div>
                    

                    </div>
            ))}
        
            </div>
        )
    }
    
    export default WeatherData
    