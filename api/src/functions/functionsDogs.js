const axios = require ('axios'); 
const {
    API_KEY
  } = process.env;
  
const { Dog, Temperament } = require('../db');  //!!me traigo los modelos

//Todo FUNCIONES QUE UTILIZA LA RUTA /Dogs

const getInfoAPI = async () => {  // Fc para obtener todas las razas de la API
    try {
        const urlApi= await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        
        const infoApi = urlApi.data.map(el => {
            return {
                id: el.id,
                name: el.name,
                height: el.height.metric,
                image: el.image.url,
                life_span: el.life_span,
                temperament: el.temperament,
                weight: el.weight.metric
                //origen: el.origin
            }
        })
        return infoApi;

    } catch (e) {
        return('No se pudo conectar a la API',e)
    }    
}

const getDBInfo = async () => {     // fc para obtener todos las razas de la B Datos, junto con los temperamentos
    try {      
        const dogsDB =  await Dog.findAll({
            include: Temperament
        });   
        const dbDatos=dogsDB.map(d => d.dataValues);//(obtener solo el DataValue de cada obj de dogsDB)
        return dbDatos;    
    } catch (e) {
        return('No se pudo acceder a la BD',e)        
    }
}

const getAllData = async () => { //concatena lo de la api + lo de la BD
    try {
        const apiInfo= await getInfoAPI();
        const dbInfo= await getDBInfo();
        const allInfo= dbInfo.concat(apiInfo);
        return allInfo;
    } catch (e) {
        return ('error en la obtencion de datos',e)
    }
}

const getOneByIdAPI = async function(idRaza){  

    var allDogs= await getInfoAPI();
    for(var i=0; i< allDogs.length; i++){
        if (allDogs[i].id === Number(idRaza)){      
            return allDogs[i]
        }
    }        
}


const getOneByIdBD = async function(idRaza){
    try {
        var oneDogBD= await Dog.findByPk(idRaza, {
            include: Temperament
        }); 
        if(oneDogBD){  
            var tp= oneDogBD.Temperaments.map( t => t.dataValues.nameTemp);
            
            var dogDetail= {  
                name: oneDogBD.name,
                height: oneDogBD.height,
                weight: oneDogBD.weight,
                life_span: oneDogBD.life_span,
                temperament: tp.join(', '),
                image: oneDogBD.image
            } 
            
            return dogDetail;  
        }
    } catch (error) {
        return null;
    }
    
}


const addTemperaments = async function(t,d){

    t=capitalizar(t);
    var [temp, creado]= await Temperament.findOrCreate({
        where: {nameTemp: t}
    })
    await d.addTemperaments(temp); 
    
}

const capitalizar = function(str){    
        return str.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
}


module.exports = {
    getInfoAPI,
    getDBInfo,
    getAllData,
    getOneByIdAPI,
    getOneByIdBD,
    addTemperaments,
    capitalizar
}