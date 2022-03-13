

import React from "react";
import { useState, useEffect } from "react";
import { Link,  } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postDog, getTemperaments } from "../actions/index";
import Styles from "./index.module.css";




export default function DogForm() {

  const urls=[


    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREVe6AQVzdro2sqEHi0eslgKOQ5PGa4g7I3SF4hmJfMKLXea5bwTuz9HZkp3eWXwTzjIs&usqp=CAU",
    "https://ideasnuevas.net/wp-content/uploads/2016/08/perros-lindos-perritos-lindos-22048.jpg",
    "https://heraldodemexico.com.mx/u/fotografias/m/2020/12/9/f608x342-292237_321960_0.jpg",
    "https://www.rd.com/wp-content/uploads/2019/01/shutterstock_1092301928.jpg?fit=700,473,"


  ]

  const dispatch = useDispatch();
 
  const allTemps = useSelector((state) => state.temps); 
  var inputTemp1;

  const [errors, setErrors] = useState({}); 

  const [objForm, setObjForm] = useState({ 
    name: "",
    height: "",
    weight: "",
    life_span: "",
    temperaments: [],
    image: ""
  });

  useEffect(() => {
    
    dispatch(getTemperaments());
  }, [dispatch ]);


  function handleInputChange(e) {
    e.preventDefault();

    setObjForm({
       ...objForm,
       [e.target.name]: e.target.value,
    });

    setErrors(  
      validate({
        ...objForm,
        [e.target.name]: e.target.value,
      })
    );
  }


  function handleSelect(e) { 
    e.preventDefault();

    setObjForm({
      ...objForm,
      temperaments: objForm.temperaments.includes(e.target.value)
      ? objForm.temperaments
     : [...objForm.temperaments, e.target.value],
    
      
    });
  }

  function handleDelete(el) { 
    setObjForm({
      ...objForm,
      temperaments: objForm.temperaments.filter((t) => t !== el),
    });
  }

  function clearForm() { 
    setObjForm({
      name: "",
      height: "",
      weight: "",
      life_span: "",
      temperaments: [],
      image: ""
    });
    
    setErrors({});
  }

  function handleSubmit(e) { 
    e.preventDefault();
    dispatch(postDog(objForm));
    alert("Raza creada con éxito!!");

    
  }
  

  return (
    <div className={Styles.divgral}>


      <fieldset className={Styles.fieldset}>
          <legend className={Styles.legendField}>Elija una imágen</legend>
          <ul>
            {urls.map(u =>{
              return (

              <li>
                <label  for="img1">
                <img className={Styles.radio} src={u} alt="??" />
                </label>
                <input className={Styles.radioButon} type="radio"  name="image"
                  value={u}
                  onChange={(e) => handleInputChange(e)} />
              </li>
              );

            })}
        </ul>
      </fieldset>

      <form className={Styles.form} onSubmit={(e) => handleSubmit(e)}>

        <h1 className={Styles.titulo}>Nueva Raza</h1>
          
         <div>
           <label className={Styles.label}>Nombre Raza:</label>
          <input
            className={Styles.input}
            type="text"
            value={objForm.name}
            name="name"
            placeholder="Nombre de la raza..."
            pattern="[a-zA-Z áéíóú]{2,20}"
            title="Solo letras, hasta 20 caracteres ej: Abc..."
            required
            onChange={(e) => handleInputChange(e)} 
          />
        </div> 

        <div>
          <label className={Styles.label}>Peso:</label>
          <input
            className={Styles.input}
            type="text"
            value={objForm.weight}
            name="weight"
            placeholder="00-90...(Kgs :Minimo-Máximo)"
            pattern="[0-9]{1,2}[-][0-9]{1,2}"
            title="solo numeros, formato permitido: ej: 0-90 "
            required
            onChange={(e) => handleInputChange(e)}
          />
          {errors.weight && (
            <span className={Styles.error}> {errors.weight} </span>
          )}
        </div>

        <div>
          <label className={Styles.label}>Altura:</label>
          <input
            className={Styles.input}
            type="text"
            value={objForm.height}
            name="height"
            placeholder="00-90 (Cms: Altura min-Altura max)"
            pattern="[0-9]{1,2}[-][0-9]{1,2}"
            title="solo numeros, formato permitido: ej: 0-90 "
            required
            onChange={(e) => handleInputChange(e)}
          />
          {errors.height && (
            <span className={Styles.error}> {errors.height} </span>
          )}
        </div>

        <div>
          <label className={Styles.label}>Años de Vida promedio:</label>{" "}
          <input
            className={Styles.input}
            type="text"
            value={objForm.life_span}
            name="life_span"
            placeholder="10 Años...(promedio de vida)"
            pattern="[0-9]{1,2}"
            title="Solo números, de 1 a 2 digitos ej: 15 (Años promedio de vida)"
            onChange={(e) => handleInputChange(e)}
          />
          {errors.life_span && (
            <span className={Styles.error}> {errors.life_span} </span>
          )}
        </div>

        <div>
          <label className={Styles.label}>Crear Tempeperamentos:</label>
          <span className={Styles.coment}></span>

          <input
            className={Styles.input}
            type="text"
            value={inputTemp1}
            name="temp1"
            //required
            placeholder="Temperamento..."
            pattern="[a-zA-Z]{2,15}"
            title="Valores permitidos ej: Abc...(hasta 10 caracteres)"
            onDoubleClick={(e) => handleSelect(e)}
          />

          <select
            className={Styles.select}
            name="temps"
            onChange={(e) => handleSelect(e)}
          >
            <option key={100} value="">Agregar Tempetamentos</option>
            {allTemps.map((t) => (
              <option className={Styles.option} key={t.id} value={t.nameTemp}>
                {t.nameTemp}
              </option>
            ))}
          </select>

          <div className={Styles.temps}>
            {objForm.temperaments.map((el) => (
              <div className={Styles.te}>
                <span className={Styles.letraTemp}>{el}</span>
                <button
                  type="button"
                  className={Styles.tDelete}
                  key={el.id}
                  onClick={() => handleDelete(el)}
                 > 
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className={Styles}>
          <input
            className={Styles.submit}
            type="submit"
            name="crear"
            value="Crear"
          ></input>
          
          <input
            className={Styles.submit}
            type="reset"
            value="Crear otra raza"
            onClick={clearForm}
          />
        </div>
         
          <Link to="/home">
            <button className={Styles.volver}>Volver</button>{" "}
          </Link>
 
      </form>
    </div>
  );
}

//validaciones para input wieight, height y life_span
function validate(objForm) {
  var errores = {};
  var arrW = objForm.weight.split("-");
  var arrH = objForm.height.split("-");
  var mjeWeigth = "El peso minimo debe ser menor que el máximo!!";
  var mjeHeight = "La altura mínima debe ser menor que la máxima!!";

  if (arrW[0] && arrW[1]) {
    if (arrW[0].length > arrW[1].length) {
      errores.weight = mjeWeigth;
    } else if (arrW[0].length === arrW[1].length) {
      if (arrW[0] > arrW[1]) {
        errores.weight = mjeWeigth;
      }
    }
  }
  if (arrH[0] && arrH[1]) {
    if (arrH[0].length > arrH[1].length) {
      errores.height = mjeHeight;
    } else if (arrH[0].length === arrH[1].length) {
      if (arrH[0] > arrH[1]) {
        errores.height = mjeHeight;
      }
    }
  }

  if (objForm.life_span > 25) {
    errores.life_span = "Un perro no vive tanto!!(hasta 25 años)";
  }
  


  return errores;
}
// si tengo obj.name "" envio un carter de erorr que diga : No puede estar vacio
// si vuelves a llenar el input con numeros,envio otro msj: No se aceptan numeros