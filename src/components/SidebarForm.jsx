import styles from './SidebarForm.module.css';
import { useState } from 'react';   

function SidebarForm({onSubmit}) {
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ city, state, country });
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit} >
            <div className={styles.row}>
                <label htmlFor="city">City</label>
                    <input
                    id="city"
                    type="text"
                    value={city}    
                    onChange={(e) => setCity(e.target.value)}
                    />
            </div>
            <div className={styles.row}>
                <label htmlFor="state">State </label>
                <input
                    id="state"
                    type="text"
                    value={state}   
                    onChange={(e) => setState(e.target.value)}  
                />
            </div>  
            <div className={styles.row}>
                <label htmlFor="country">Country </label>
                <input
                    id="country"
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />  
            </div>

            <button type="submit" className={styles.button}>Submit</button>   

            
        </form>
    )
}

export default SidebarForm
