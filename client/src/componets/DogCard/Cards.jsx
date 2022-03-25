import React from "react";
import { Link } from "react-router-dom";
import Styles from "./index.module.css";




export default function DogCard({ id, name, temperament, image, weight }) {

    // if(!id){
    //     return(
    
    //    <div >
    
    //         <h3 >NO HAY COINCIDENCIA</h3>
    
    //     </div>
    //     )
    //   }else{
    
    //RENDERIZA CADA CARD// tiene link p/rendeizar <DogDetail/> desde la ruta /dogDetail, aca le paso el param(id) a la ruta,
    //<DogDetail/> es quien despacha la accion de buscar esa id en la api x params



    return (
      
      <div>
 
        <div className={Styles.card}>
        <Link className={Styles.name} to={`/dogDetail/${id}`}>
          <h3>{name}</h3>
        </Link>

        
        <h5 className={Styles.text}>{temperament}</h5>
        <Link to={`/dogDetail/${id}`}>
          <img
            className={Styles.img}
            src={image}
            alt="imagen no encontrada"
          ></img>
        </Link> 
        <h4 className={Styles.text}> Peso: {weight} Kgs</h4> 
         </div>
         </div>

)
  }

  
         
      
            
