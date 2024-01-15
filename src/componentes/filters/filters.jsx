import { useState } from 'react';
import styles from './filters.module.css';

const Filters = () => {
    const [cities, setCities] = useState('');
    const [bedrooms, setBedrooms] = useState(0);
    const [squareMeters, setSquareMeters] = useState('');
    const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });

    const handleInputChange = (e, setter) => {
        const value = e.target.value;
        setter(value);
    };

    const handlePriceRangeChange = (e) => {
        const value = e.target.value;
        const [min, max] = value.split('-').map(val => (val.trim() === '' ? 0 : parseInt(val, 10)));

        setPriceRange({
            min: isNaN(min) ? 0 : min,
            max: isNaN(max) ? 0 : max
        });
    };

    const handleSearch = () => {
        console.log('Ciudades:', cities);
        console.log('Bedrooms:', bedrooms);
        console.log('Square Meters:', squareMeters);
        console.log('Price Range:', priceRange);
    };

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <label className={styles.label}>
                    Ciudades:
                    <input
                        type="text"
                        value={cities}
                        onChange={(e) => handleInputChange(e, setCities)}
                        className={styles.input}
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

                <label className={styles.label}>
                    Rango de Precio:
                    <input
                        type="text"
                        value={`${priceRange.min} - ${priceRange.max}`}
                        onChange={handlePriceRangeChange}
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
