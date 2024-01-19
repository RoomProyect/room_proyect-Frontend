import Card from '../card/Card';
import styles from './Cards.module.css'; // Asegúrate de importar tus estilos

const Cards = ({ deptos }) => {
  return (
    <div className={styles.cardsRow}> 
      {deptos.map((casa) => (
        <div key={casa._id}>
          <Card
            key={casa._id}
            id={casa._id}
            titulo={casa.titulo}
            ambientes={casa.ambientes}
            baños={casa.baños}
            cochera={casa.cochera}
            descripcion={casa.descripcion}
            img={casa.img}
            precio={casa.mcTerreno}
            mcTerreno={casa.mcTerreno}
            ciudad={casa.ciudad}
          />
        </div>
      ))}
    </div>
  );
};

export default Cards;
