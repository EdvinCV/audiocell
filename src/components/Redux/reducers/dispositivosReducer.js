// ACTION TYPES

import {GET_DISPOSITIVOS, SELECT_DEVICE} from "../actionTypes";


// INITIAL STATE
const initialState = {
    dispositivos: [],
    selectedDevice: null
};

// REDUCER FUNCTION
const dispositivosReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_DISPOSITIVOS:
            return {
                ...state,
                dispositivos: action.dispositivos
            }
        case SELECT_DEVICE:
            return {
                ...state,
                selectedDevice: action.device
            }
        default:
            return state;
    }
}

export default dispositivosReducer;