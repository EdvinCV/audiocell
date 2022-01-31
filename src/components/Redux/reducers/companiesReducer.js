// ACTION TYPES
import {GET_COMPANIES} from "../actionTypes";


// INITIAL STATE
const initialState = {
    companies: []
};

// REDUCER FUNCTION
const companiesReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_COMPANIES:
            return {
                ...state,
                companies: action.companies
            }
        default:
            return state;
    }
}

export default companiesReducer;