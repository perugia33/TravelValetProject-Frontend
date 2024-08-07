   import styles from './Weather.module.css'    

   function WeatherData({weather}) {
        return (
            <div className={styles.weatherContainer}>
               {weather.map((day, index) => (
                <div key={index} className={styles.weatherData}>
                    <div className={styles.day}>{day.day}</div>
                    <div className={styles.temp}>
                         <div className={styles.condition}>{day.condition}</div>
                        <span className={styles.minTemp}>{day.minTemp}°F</span>
                        <span className={styles.maxTemp}>{day.maxTemp}°F</span>
                    </div>
                   

                    </div>
            ))}
        
            </div>
        )
    }
    
    export default WeatherData
    