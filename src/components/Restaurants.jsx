import  styles from './Restaurants.module.css'
function Restaurants({ recommendations }) {
    return (
        <div className={styles.container}>
            <h1>Checkout these great restaurants</h1>
            {recommendations.length === 0 ? (
                <p>No recommendations available.</p>
            ) : (
                recommendations.map((rec) =>    
                <div  key={rec.id} className="restaurant">
                    <img src="{rec.image}" alt="{rec.name}"/>
                    <div className= "restaurant-details">
                        <h3>{rec.name}</h3>
                        <p>{rec.address}</p>
                        <p>Rating: {rec.rating} ({rec.review_count} reviews)</p>
                        <p><a href="{rec.website}">Visit Website</a></p>
                    </div>
            </div>

                )
            )}
        </div>
    )
}

export default Restaurants
