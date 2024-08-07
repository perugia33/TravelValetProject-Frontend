import styles from './Restaurant_Weather.module.css'
import Restaurants from './Restaurants'
import Weather from './Weather'

function Restaurant_Weather() {
    return (
        <div className={styles.mainContent}>
            <Restaurants />
          <Weather/ >
            
        </div>
    )
}

export default Restaurant_Weather
