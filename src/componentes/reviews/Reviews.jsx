import styles from './Reviews.module.css'
import { CardReview } from './componentReview/CardReview'

export const Reviews = () => {
  return (
    <>
        <div className={ styles.contentReviews } >
            <CardReview />
        </div>
    </>
  )
}
