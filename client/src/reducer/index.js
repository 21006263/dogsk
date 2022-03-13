import {GET_DOGS,
GET_NAME_DOGS,
ORDER_BY_NAME,
GET_TEMPERAMENT,
GET_DOG_DETAIL_ID,
FILTER_BY_TEMP,
FILTER_BY_CREATED,
ORDER_BY_WEIGHT, 
postDog} from '../actions/index'




const initialState = {
	Alldogs: [], //! copia del estado que siempre va a tener todos los dogs en las cards
	dogs: [],
	 temps: [],
	 detail: []
};

function Reducer(state = initialState, action) {
	switch (action.type) {
		case  GET_DOGS:
			return {
				...state,
				dogs: action.payload,
				Alldogs: action.payload, 
			};

		case GET_TEMPERAMENT:
			return {
				...state,
				temps: action.payload,
			};


		case GET_NAME_DOGS:
			return {
				...state,
				dogs: action.payload
			}


		case postDog:
			return {
				...state
			}

		case GET_DOG_DETAIL_ID:
			return {
				...state,
				detail: action.payload
			}

		case FILTER_BY_TEMP:
			let dogsF = state.Alldogs; 
			let tempFilter = [];

			if (action.payload === "All") {
				tempFilter = dogsF;
			} else {
				for (let i = 0; i < dogsF.length; i++) {
					if (dogsF[i].temperament) {
						let temp = dogsF[i].temperament;
						if (temp.includes(action.payload)) {
							tempFilter.push(dogsF[i]);
						}
					}
				}
			}
			return {
				...state,
				dogs: tempFilter, 
			};


		case FILTER_BY_CREATED:
			const dogsC = state.Alldogs;
			var createdFilter = [];

			if (action.payload === "All") { //todos
				createdFilter = dogsC;

			} else if (action.payload === "razaBD") { //bd
				dogsC.forEach((el) => {
					if (el.hasOwnProperty("createInDb")) {
						createdFilter.push(el);
					}
				});

			} else {                                //Api
				dogsC.forEach((el) => {
					if (!el.hasOwnProperty("createInDb")) {
						createdFilter.push(el);
					}
				});
			}
			return {
				...state,
				dogs: createdFilter,
			};


		case ORDER_BY_NAME:
			const dogsOr = [...state.dogs];

			
			action.payload === "asc"
				? dogsOr.sort(function (a, b) {
					//asc
					if (a.name > b.name) {
						return 1;
					}
					if (b.name > a.name) {
						return -1;
					}
					return 0;
				})
				: dogsOr.sort(function (a, b) {
					//desc
					if (a.name > b.name) {
						return -1;
					}
					if (b.name > a.name) {
						return 1;
					}
					return 0;
				});
			return {
				...state,
				dogs: dogsOr,
			};


		case ORDER_BY_WEIGHT:
			var dogsW = [...state.dogs];

			for (let i = 0; i < dogsW.length; i++) {
				var peso = dogsW[i].weight.split("-"); 
				if (peso[0] && peso[1] && peso[0].trim() === "NaN") peso[0] = peso[1];
				if (peso[1] && peso[0] && peso[1].trim() === "NaN") peso[1] = peso[0];

				if (dogsW[i].weight === "NaN") {
					
					dogsW[i].pmin = 100;
				} else {
					dogsW[i].pmin = parseInt(peso[0].trim());
				}

				if (peso.length > 1) {
					
					dogsW[i].pmax = parseInt(peso[1].trim());
				} else {
					dogsW[i].pmax = dogsW[i].pmin;
				}
			}

			if (action.payload === "min") {
				dogsW.sort(function (a, b) {
					
					return (a.pmin + a.pmax) / 2 - (b.pmin + b.pmax) / 2; 
				});
			} else if (action.payload === "max") {
				dogsW.sort(function (a, b) {
					
					return (b.pmin + b.pmax) / 2 - (a.pmin + a.pmax) / 2; 
				});
			}
			return {
				...state,
				dogs: dogsW,
			};


		default:
			return state;
	}
}

export default Reducer;
