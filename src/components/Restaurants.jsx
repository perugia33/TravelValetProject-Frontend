import  styles from './Restaurants.module.css'

function Restaurants({ recommendations }) {
    return (
        <div className={styles.container}>
            <h1>Checkout These Great Restaurants</h1>
            {recommendations.length === 0 ? (
                <p>No recommendations available.</p>
            ) : (
                <div className={styles.scrollableContainer}>
                    {recommendations.map((rec) => (
                        <div key={rec.id} className={styles.restaurant}>
                            <img src={rec.image_url} alt={rec.name} className={styles.restaurantImage} />
                            <div className={styles.restaurantDetails}>
                                <h3>{rec.name}</h3>
                                <p>{rec.address}</p>
                                <p>Rating: {rec.rating} ({rec.review_count} reviews)</p>
                                <p><a href={rec.website} target="_blank" rel="noopener noreferrer">Visit Website</a></p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}



export default Restaurants
