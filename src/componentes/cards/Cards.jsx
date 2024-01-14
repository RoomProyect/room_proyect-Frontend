import Card from "../card/Card";
import styles from "./cards.module.css";
import PropTypes from 'prop-types';

const Cards = ({ deptos }) => {
  return (
    <div className={styles.cardsRow}>
      {deptos.map((casa) => (
        <Card
          key={casa?.id}
          id={casa?.id}
          titulo={casa?.titulo}
          ciudad={casa?.ciudad}
          habitaciones={casa?.habitaciones}
          ambientes={casa?.ambientes}
          baños={casa?.baños}
          cochera={casa?.cochera}
          descripcion={casa?.descripcion}
          img={casa?.img}
          precio={casa?.precio}
          mcTerreno={casa?.mcTerreno}
          className={styles.cardContainer}
        />
      ))}
    </div>
  );
};

Cards.propTypes = {
  deptos: PropTypes.array.isRequired, // Se asume que `deptos` es un array
};

export default Cards;
