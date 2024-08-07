import styles from  "../components/Logo.module.css"   ;

function Logo() {
    return (
        <div className={styles.logo}>
            <h1  >
                Travel Valet
            </h1>
            <h2 className={styles.cursive}>
                Destination Guide       
            </h2>   

        </div>

    )
}

export default Logo