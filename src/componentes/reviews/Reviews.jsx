import styles from './Reviews.module.css';
import { useState } from 'react';
import { CardReview } from './componentReview';


export const Reviews = () => {

  const [selectedArrow, setSelectedArrow] = useState(null); 

  const handleNavigation = (direction) => {
    setSelectedArrow(direction); // Actualiza la flecha seleccionada
  };

  return (
    <>
      <div className={styles.contentReviews}>
        <div className={styles.carousel}>

          <CardReview />
          <div className={styles.botones}>
          <button
            className={`${styles.navButton} ${selectedArrow === 'prev' && styles.selected}`}
            onClick={() => handleNavigation('next')}
          >
            {'<'}
          </button>

          <button
            className={`${styles.navButton} ${selectedArrow === 'next' && styles.selected}`} 
            onClick={() => handleNavigation('prev')}           
          >
            {'>'}
          </button>
          </div>
        </div>
      </div>
    </>
  );
};
