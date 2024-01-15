import { useSelector } from "react-redux"
 import Card from "../card/Card"




const Cards = ({deptos}) => {




    return (
        <div>
          {deptos.map((casa) => (
            <div key={casa.id}>
              <Card
                key={casa.id}
                id={casa.id}
                ambientes={casa.ambientes}
                baños={casa.baños}
                cochera={casa.cochera}
                descripcion={casa.descripcion}
                img={casa.img}
                precio={casa.mcTerreno}
                mcTerreno={casa.mcTerreno}
              />
            </div>
          ))}
        </div>
      );


}
export default Cards