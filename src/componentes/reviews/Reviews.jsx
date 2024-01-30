import styles from './Reviews.module.css';
import { useState } from 'react';
import { CardReview } from './componentReview';


export const Reviews = ({ reviews,changePage }) => {

  const [selectedArrow, setSelectedArrow] = useState(null); 

  const handleNavigation = (direction) => {
    setSelectedArrow(direction); // Actualiza la flecha seleccionada
  };

  return (
    <>
      <div className={styles.contentReviews} id='reviews' >
        <div className={styles.carousel}>
          <div className={ styles.contentReviewsCarrousel }>
            { reviews.map( review => {
              return(
                <CardReview
                  key={ review._id }
                  name={ review.userName } 
                  message={ review.text } 
                />
              )
            }) }
          </div>
          <div className={styles.botones}>
            <button
              name='back'
              className={`${styles.navButton} ${selectedArrow === 'prev' && styles.selected}`}
              onClick={ changePage }
            >
              {'<'}
            </button>

            <button
              name='next'
              className={`${styles.navButton} ${selectedArrow === 'next' && styles.selected}`} 
              onClick={ changePage }           
            >
              {'>'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
