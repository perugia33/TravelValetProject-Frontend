import styles from './PackLogo.module.css';
function PackLogo() {
    return (
        <div  className={styles.logo}>
            <h1>Travel Valet</h1>   
               <h2 className={styles.cursive}>Packing List 👜</h2>
        </div>
    )
}

export default PackLogo
