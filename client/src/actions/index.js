 import axios from "axios";
 export const GET_DOGS = 'GET_DOGS'
 export const GET_NAME_DOGS = 'GET_NAME_DOGS'
 export const ORDER_BY_NAME = 'ORDER_BY_NAME'
 export const GET_TEMPERAMENT = 'GET_TEMPERAMENT'
 export const GET_DOG_DETAIL_ID = 'GET_DOG_DETAIL_ID'
 export const FILTER_BY_TEMP = 'FILTER_BY_TEMP'
 export const FILTER_BY_CREATED = 'FILTER_BY_CREATED'
 export const ORDER_BY_WEIGHT = 'ORDER_BY_WEIGHT'
// //! Hago la conexion con el back  con el front(para el inicio del render de la APP)



    // export function Dogs(){
       
    //     return function (dispatch) {
    
    //        
    //         dispatch({ 
    //             type: OBTENER_DOG, 
    //             payload: dogs
    //         });
    //       });
    //     };
    //   }
    
      export function getDogs() { //!! trae todos los dogs desde mi Api
        return async function (dispatch) {
            try {
                var json = await axios.get("http://localhost:3001/dogs");
    
                return dispatch({
                    type: GET_DOGS,
                    payload: json.data
                });
            } catch (error) {
                console.log("No se pudieron obtener las razas", error);
            }
        };
    }
// export function Dogs() { //TODO trae todos los dogs desde mi API
// 	return async function (dispatch) {
//         try{
//         const api = await axios.get("http://localhost:3001/Dog/get");
//         return dispatch({
//             type: OBTENER_DOG,
//             payload: api.data
//         })
//     }catch(error){
//         console.log("No se encontraron obtener las razas", error)
//     }

//TODO conectamos el back con get/temperaments

export function getTemperaments() { //!!trae los temps de mi Api
	return async function (dispatch) {
		try {
			var json = await axios.get(`http://localhost:3001/temperament/`);
			return dispatch({
				type: GET_TEMPERAMENT,
				payload: json.data,
			});
		} catch (error) {
			console.log("No se pudieron obtener los temperamentos", error);
		}
	};
}

export function searchByName(name) {
	return async function (dispatch) {
		try {
			const json = await axios.get('http://localhost:3001/dogs?name=' + name);
			//const json = await axios.get("http://localhost:3001/Dog/get?name= + name");

			return dispatch({
				type: GET_NAME_DOGS,
				payload: json.data
			});

		} catch (error) {
			console.log("No se pudo obtener la query", error);

		}
	};

}
//!! CONECTA CON EL BACK (post /dogs) // agrega una nueva raza
export function postDog(payload) { // el payload me llega del form, es el obj a crear en la tabla
    
	return async function () {
        
        var json = await axios.post(`http://localhost:3001/dogs`, payload); //le paso x BODY el obj creado en el form
		// console.log("REGISTRO CREADO: ",json)
		return json;
    
		};
	 
	};
    

//CONECTA CON EL BACK - busca un dog por id (x params)
export function getDogDetail(id) {
	return async function (dispatch) {
		try {
			var json = await axios.get(`http://localhost:3001/dogs/` + id);

			return dispatch({
				type: GET_DOG_DETAIL_ID,
				payload: json.data,
			});
		} catch (error) {
			console.log("No se pudo obtener datos de la raza", error);
		}
		
	};
}
// el payload es el value del select=> un temp de la lista
export function filterByTemperament(payload) {
	// el payload es el value del select=> un temp de la lista
	console.log(payload);
	return {
		type: FILTER_BY_TEMP,
		payload,
	};
}

// payload es el value del select
export function filterByCreated(payload) {

	return {
		type: FILTER_BY_CREATED,
		payload,
	};
}


export function orderByName(order) {
    // payload es el value de este select(asc/desc)
    return {
        type: ORDER_BY_NAME,
        payload: order
    }
    };
    export function orderByWeight(payload) {
        //payload es el value de este select
        return {
            type: ORDER_BY_WEIGHT,
            payload,
        };
    }
    