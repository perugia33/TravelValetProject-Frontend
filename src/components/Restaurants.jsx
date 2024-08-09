import  styles from './Restaurants.module.css'

function Restaurants({ recommendations }) {
    return (
        <div className={styles.container}>
            <h1>Checkout these great restaurants</h1>
            {recommendations.length === 0 ? (
                <p>No recommendations available.</p>
            ) : (
                recommendations.map((rec) => (  
                <div  key={rec.id} className="restaurant">
                {/*Commented code is to help with styling <div key={rec.id} className={styles.restaurant}>  */}
                    <img src={rec.image_url} alt={rec.name}/>
                    {/* <img src={rec.image_url} alt={rec.name} className={styles.image} /> */}
                    <div className= "restaurant-details">
                    {/* <div className={styles.restaurantDetails}> */}
                        <h3>{rec.name}</h3>
                        <p>{rec.address}</p>
                        <p>Rating: {rec.rating} ({rec.review_count} reviews)</p>
                        <p><a href={rec.website} target="_blank" rel="noopener noreferrer">Visit Website</a></p>
                    </div>
                </div>
                ))
            )}
        </div>
    );
}

export default Restaurants
