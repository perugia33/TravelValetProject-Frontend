import styles from  "../components/Logo.module.css"   ;

function SavedListsLogo() {
    return (
        <div>
            <div className={styles.savedListLogo}>
            <h1  >
                Travel Valet
            </h1>
            <h2 className={styles.cursive}>
                My Packing Lists      
            </h2>   

        </div>
            
        </div>
    )
}

export default SavedListsLogo
