import Card from '../card/Card';
import styles from './cards.module.css'; // Asegúrate de importar tus estilos
import PropTypes from 'prop-types';

const Cards = ({ deptos }) => {
  console.log(deptos)
  return (
    <div className={styles.cardsRow}> 
      {deptos.map((casa) => (casa.active?
        <div key={casa._id}>
          <Card
            key={casa._id}
            id={casa._id}
            provincias={casa.provincias}
            titulo={casa.titulo}
            ambientes={casa.ambientes}
            baños={casa.baños}
            cochera={casa.cochera}
            descripcion={casa.descripcion}
            img={casa.img}
            precio={casa.precio}
            mcTerreno={casa.mcTerreno}
            habitaciones={casa.habitaciones}
          />
        </div>:""
      ))}
    </div>
  );
};
Cards.propTypes = {
  deptos: PropTypes.array.isRequired,
};

export default Cards;
