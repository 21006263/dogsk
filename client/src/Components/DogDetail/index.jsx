import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect,useState } from "react";
import { getDogDetail } from "../../actions";
import Styles from "./index.module.css";
import Loader from "../Loader";

export default function DogDetail() { //renderiza la card detallada de una raza
  const { id } = useParams();//-->la obtengo con este hook, porque en el rout de mi App le especifico "/dogDetail/:id"
  const myDog = useSelector((state) => state.detail); //traigo el estado detail

  // console.log("ID DEL DOG: ", id);
  const dispatch = useDispatch();

  // useEffect(() => { //llena el estado Detail despachando esa fc=> el estado es 1 solo obj
  //   dispatch(getDogDetail(id));
  // } , [dispatch, id]);

  
  const [Loadin, setLoadin] = useState (false)

  useEffect(() => {
    setLoadin(true)
    setTimeout(() =>{
      setLoadin(false)
    }, 1000)
    dispatch(getDogDetail(id))
},[dispatch, id])


  return (
    
    
    <div>
    {
    Loadin ?
     <Loader
     size={150}
     Loadin={Loadin}
     />
    :

    <div className={Styles.General}>
    <div className="contenedor"></div>
    <div id="contenedor">
                 

 </div>
      
        <div id="conteinerGrid" className={Styles.conteinerGrid}>
        <div id="1° columna">
            <h1 className={Styles.nombre}>{myDog.name}</h1>
           

            
              <img
                className={Styles.imagen}
                src={myDog.image}
                alt="imagen API no encontrada"
                ></img>
               
               


              
              </div>
             
              <div id="2°columna"> 
              
              
            <div className={Styles.peso}>Peso: {myDog.weight} Kgs </div>
            
            <div className={Styles.peso} >Altura: {myDog.height} cm </div>

            <div className={Styles.peso} >Prom. de vida: {myDog.life_span}</div>
            
            { <div className={Styles.peso} >Temperamento: {myDog.temperament}</div> }
            
            {/* <div className={Styles.peso} >Price: {myDog.price}</div> */}
            
            
            <Link  to="/home">
            <button className={Styles.volver}>Volver</button>
            </Link>
            </div>
            
            </div>
            
           </div>     
}   
    </div>
  )
}


