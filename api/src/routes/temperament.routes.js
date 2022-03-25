const  express = require('express');
const router = express.Router();

const axios = require('axios'); 

const {
    API_KEY
  } = process.env;
  
const { Temperament } = require('../db');  


const getTempAPI = async () => {  
    try {  
        const urlApi= await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        
        const tempApi = urlApi.data.map(el => el.temperament) 

        var arrayTemp=[];
        var arrayTemp2=[]
        var long= tempApi.length;

        for(var i=0; i<long ;i++){
            if(!tempApi[i]) continue;
            let spl= tempApi[i].split(',');  
            for(var j=0; j<spl.length; j++){
                let tNorm=spl[j].trim();
                if(arrayTemp2.includes(tNorm)) continue; 
                arrayTemp2.push(tNorm);
                arrayTemp.push({nameTemp: tNorm});
            }
        }
        return arrayTemp;
    } catch (e) {
        return('No se pudo conectar a la API',e)
    }    
}
////////////////////////////////////RUTA /temperament

router.get('/', async (req,res)=> {
    
    try {
        const count= await Temperament.count();     
        console.log('HAY REGISTROS: ',count)
        
        if (count < 100){
            const temperamentsApi = await getTempAPI();
            await Temperament.bulkCreate(temperamentsApi); 
        }
    } catch (error) { res.status(404).send('error al crear datos')}

    try {  
        const temperaments =  await Temperament.findAll({
            order: [['nameTemp', 'ASC'],]  
        })
        res.json(temperaments);    
    } catch (e) {
        return('No se pudo acceder a la BD',e)        
    }   
})



module.exports = router;