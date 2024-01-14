
 import Card from "../card/Card"




const Cards = ({deptos}) => {




    return (
        <div>
          {deptos.map((casa) => (
         
              <Card
                key={casa.id}
                id={casa.id}
                ambientes={casa.ambientes}
                baños={casa.baños}
                cochera={casa.cochera}
                descripcion={casa.descripcion}
                img={casa.img}
                precio={casa.precio}
                mcTerreno={casa.mcTerreno}
              />
      
          ))}
        </div>
      );


}
export default Cards