import { React } from 'react';
import cargando from '../../Image/cargando.gif'
import style from'./index.module.css';



const Loader = () => {
    return(
       
        <div className={style.loader}>
           {/* <h1>LOADING</h1> */}
           <img src={cargando} alt='hola'/>
            {/* <img src="https://s2.svgbox.net/loaders.svg?ic=spinning-circles&color=000000" width="100" height="100" alt='GG'/>   */}
             {/* <img src="https://s2.svgbox.net/loaders.svg?ic=audio&color=000000" width="32" height="32" alt='f'/>  
           */}

 </div>



    )        
}




export default Loader;