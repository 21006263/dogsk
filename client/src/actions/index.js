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
    
      export function getDogs() { 
        return async function (dispatch) {
            try {
                var json = await axios.get("/dogs");
    
                return dispatch({
                    type: GET_DOGS,
                    payload: json.data
                });
            } catch (error) {
                console.log("No se pudieron obtener las razas", error);
            }
        };
    }


export function getTemperaments() { 
	return async function (dispatch) {
		try {
			var json = await axios.get(`/temperament`);
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
			const json = await axios.get('/dogs?name=' + name);
		

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
export function postDog(payload) { 
    
	return async function () {
        
        var json = await axios.post(`/dogs`, payload); 
		
		return json;
    
		};
	 
	};
    

//CONECTA CON EL BACK - busca un dog por id (x params)
export function getDogDetail(id) {
	return async function (dispatch) {
		try {
			var json = await axios.get(`/dogs/` + id);

			return dispatch({
				type: GET_DOG_DETAIL_ID,
				payload: json.data,
			});
		} catch (error) {
			console.log("No se pudo obtener datos de la raza", error);
		}
		
	};
}

export function filterByTemperament(payload) {
	
	console.log(payload);
	return {
		type: FILTER_BY_TEMP,
		payload,
	};
}


export function filterByCreated(payload) {

	return {
		type: FILTER_BY_CREATED,
		payload,
	};
}


export function orderByName(order) {
    
    return {
        type: ORDER_BY_NAME,
        payload: order
    }
    };
    export function orderByWeight(payload) {
       
        return {
            type: ORDER_BY_WEIGHT,
            payload,
        };
    }
    