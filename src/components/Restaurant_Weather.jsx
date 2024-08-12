import styles from './Restaurant_Weather.module.css'
import Restaurants from './Restaurants'
import Weather from './Weather'

function Restaurant_Weather({ recommendations, weatherData }) {
    return (
        <div className={styles.mainContent}>
             <Weather weatherData={weatherData} />
            <Restaurants recommendations={recommendations} />
           
            
        </div>
    )
}

export default Restaurant_Weather
