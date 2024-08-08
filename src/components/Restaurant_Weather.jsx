import styles from './Restaurant_Weather.module.css'
import Restaurants from './Restaurants'
import Weather from './Weather'

function Restaurant_Weather({ recommendations, weatherData }) {
    return (
        <div className={styles.mainContent}>
            <Restaurants recommendations={recommendations} />
            <Weather weatherData={weatherData} />
            
        </div>
    )
}

export default Restaurant_Weather
