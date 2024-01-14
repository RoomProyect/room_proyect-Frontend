import { useState } from 'react';
import styles from './filters.module.css';

const Filters = () => {
    const [bathrooms, setBathrooms] = useState(0);
    const [bedrooms, setBedrooms] = useState(0);
    const [squareMeters, setSquareMeters] = useState('');

    const handleInputChange = (e, setter, minValue = 0) => {
        const value = parseInt(e.target.value, 10) || 0;
        if (value >= minValue) {
        setter(value);
        }
    };

    const handleSearch = () => {
        console.log('Bathrooms:', bathrooms);
        console.log('Bedrooms:', bedrooms);
        console.log('Square Meters:', squareMeters);
    };

    return (
        <div className={styles.container}>
        <div className={styles.formContainer}>
            <label className={styles.label}>
            Baños: 
            <input
                type="number"
                value={bathrooms}
                onChange={(e) => handleInputChange(e, setBathrooms)}
                className={styles.input}
                min="0"
            />
            </label>

            <label className={styles.label}>
            Habitaciones:
            <input
                type="number"
                value={bedrooms}
                onChange={(e) => handleInputChange(e, setBedrooms)}
                className={styles.input}
                min="0"
            />
            </label>

            <label className={styles.label}>
            Metros Cuadrados:
            <input
                type="number" 
                value={squareMeters}
                onChange={(e) => handleInputChange(e, setSquareMeters)}
                className={styles.input}
            />
            </label>

            <button className={styles.button} onClick={handleSearch}>
            Buscar
            </button>
        </div>
        </div>
    );
};

export default Filters;
