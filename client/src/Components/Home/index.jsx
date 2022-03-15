import {  /*Link,*/ NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getDogs, getTemperaments, filterByTemperament, filterByCreated, orderByName, orderByWeight, } from "../../actions/index";
import DogCard from "../DogCard/Cards";
import Paging from "../../Paging/index";
import SearchBar from "../SearchBar/index.jsx";
import Styles from "./index.module.css";
import style from'./index.module.css';
import cargando from '../Image/cargando.gif'




export default function Home() {

  const dispatch = useDispatch();

  var razas = useSelector((state) => state.Alldogs);//me traigo los Dogs del estado

  const allTemps = useSelector((state) => state.temps); //me traigo los temperamentos del Estado

  //paginado
  const [pagActual, setPagActual] = useState(1);
  const dogsPorPag = 8;
  const indUltimoDog = pagActual * dogsPorPag;
  const indPrimerDog = indUltimoDog - dogsPorPag;
  const currentDogs = razas.slice(indPrimerDog, indUltimoDog);

  const paginado = (nroPag) => {
    setPagActual(nroPag);
  };


  
  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);


  
  function handleFilterTemp(event) {
    dispatch(filterByTemperament(event.target.value));
    setPagActual(1);
  }

  
  function handleFilterCreated(e) {
    dispatch(filterByCreated(e.target.value));
    setPagActual(1);
  }

  
  function handleABC(ev) {
    ev.preventDefault();
    dispatch(orderByName(ev.target.value));
    setPagActual(1);
  }

  
  function handleWeight(e) {
    e.preventDefault();
    dispatch(orderByWeight(e.target.value));
    setPagActual(1);
  }



  
  return (

    <nav className={Styles.body}>
    <div className={Styles.divgral}>


      <nav className={Styles.nav}>
        <div className={Styles.navIzq}>

          <select className={Styles.select} name="created"  onChange={(e) => handleFilterCreated(e)}>
            <option className={Styles.options} value="All" key="3">Todas las razas</option>
            <option className={Styles.options} value="razaApi" key="4">Razas Existentes</option>
            <option className={Styles.options} value="razaBD" key="5">Razas Creadas</option>
          </select>

          <select className={Styles.select} name="abcOrden" onChange={(ev) => handleABC(ev)}>
            <option className={Styles.options} value="all" key="0">Orden Alfabético</option>
            <option className={Styles.options} value="asc" key="1">Ascendente A-Z</option>
            <option className={Styles.options} value="desc" key="2">Descendente Z-A</option>
          </select>

          <select className={Styles.select} name="orderWeight" onChange={(e) => handleWeight(e)}>
            <option className={Styles.options} value="All">Orden Peso Promedio</option>
            <option className={Styles.options} value="min">Menor Peso</option>
            <option className={Styles.options} value="max">Mayor Peso</option>
          </select>

          <select className={Styles.select} name="temps" onChange={(event) => handleFilterTemp(event)}>
            <option className={Styles.options} value="All" key={100}>Filtro por Temperamento</option>
            {allTemps.map((t) => (
              <option className={Styles.options} key={t.id} value={t.nameTemp}>
                {t.nameTemp}
              </option>
            ))}
          </select>
        <div >
          <NavLink className={Styles.link} to="/">Volver a Inicio</NavLink>
        </div>
         
        </div>
          
           <div  >
            <NavLink className={Styles.link} to="/newDog">Crear Nueva Raza</NavLink>
          </div> 
        <div className={Styles.navDer}>
          <div>
            <SearchBar />
          </div>

        
          



          {/* <button onClick={(e) => handleOnClick(e)}>Cargar toda las Razas</button> */}
        </div>
      </nav>


      

    {/*  LISTADO DE RAZAS - Cards(paginadas) - x cada card renderiza <DogCard/> */}
    <div className={Styles.cards}>
      {
      currentDogs.length > 0 ? (
        
        currentDogs?.map((el) => {
          return (
              <DogCard
                id={el.id}
                name={el.name}
                temperament={el.temperament}
                image={el.image ? el.image : "imagen no encontrada"}
                weight={el.weight}
                />
                );
            })
          ) : (
            <h1 className={style.loader}>
                 <img src={cargando} alt='hola'/>
                </h1>
          )}
      </div>

      <span className={Styles.nroPag}> Pag. {pagActual}</span>



    </div>
    {/* paginado, le paso props*/}
    <div >
        <Paging
          dogsPorPag={dogsPorPag}
          allDogs={razas.length}
          paginado={paginado}
        />

      </div>
    </nav>
  );
  
}
