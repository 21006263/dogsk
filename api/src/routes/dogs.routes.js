var express = require('express');
var router = express.Router();

const { Dog } = require('../db');  



const {
    getAllData,
    getOneByIdAPI,
    getOneByIdBD,
    addTemperaments,
    capitalizar} = require ('../functions/functionsDogs.js')


///// RUTA (POST)  /DOGS  
router.post('/', async (req,res) =>{
    var {name, height, weight, life_span, temperaments, image}= req.body; //!! temperaments es un array
    
    if (!name || !height || !weight){ 
        return res.send('faltan datos ')
    }
    name=capitalizar(name); 
    try{
        const[dog, created]= await Dog.findOrCreate({
            where:{
              name: name,
            },
            defaults:{
                height: height,
                weight: weight,
                life_span: life_span, 
                image: image     
            }   
        });
        if ( created===true && temperaments!==undefined){ 
            temperaments.forEach( te => {
                addTemperaments(te, dog);  
            })   
        }
        res.status(200).send("Raza creada con éxito");  
    }
    catch(e){ 
        res.status(404).send('Error, Raza no creada', e)
    };
});

///  RUTA (GET)  /DOGS   y query ?=name:
router.get('/', async (req,res) =>{  
    const {name}= req.query;   
       
    const allData= await getAllData();   

    const dataPpal = await allData.map(el => {  

        if(el.hasOwnProperty('createInDb')){  
            let tp= el.Temperaments.map( t => t.nameTemp); 
            return {
                id:el.id,
                name: el.name,
                temperament: tp.join(', '), 
                createInDb: el.createInDb,
                weight: el.weight,
                image: el.image
            }
        }else{//es de la Api
            
            return {    
                id: el.id,
                name: el.name,
                temperament: el.temperament, 
                image: el.image,
                weight: el.weight                
            }
        }
    });
    if(name){  // si hay query
        let dogNames = await dataPpal.filter (el => el.name.toLowerCase().includes(name.toLowerCase()));
        
        if(dogNames.length >0){
            res.status(200).json(dogNames);  
        }
        else {
            res.status(200).send(["error"])
        }    
    } else{  //si no hay query
        res.status(200).json(dataPpal);
    }  
})


//RUTA (GET) /DOGS params idRaza
router.get('/:idRaza', async (req,res)=> {  
                                            
    var {idRaza}=req.params;
     
    try {
        if(idRaza.length===36){  

            var oneDogBD= await getOneByIdBD(idRaza);  
            if(oneDogBD){
                res.status(200).json(oneDogBD);
            }else{
                res.send('Raza no encontrada')
            }
        }else{   // busca en la Api
            var oneDog= await getOneByIdAPI(idRaza);
            if (oneDog){
                res.status(200).json(oneDog);
            }else{
                res.send('Raza no encontrada')
            }
        }    
    } catch (e) {
        res.status(404).send('No se pudo acceder a los datos')
    }
})




module.exports = router;