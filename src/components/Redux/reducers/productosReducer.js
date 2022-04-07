// ACTION TYPES

import {
    CREAR_PRODUCTO, 
    SELECTED_PRODUCT, 
    EDITAR_PRODUCTO,
    OBTENER_REPORTE_PRODUCTOS,
    OBTENER_LISTADO_STOCK,
    OBTENER_PRODUCTOS_VENTA,
    OBTENER_REPORTE_STOCK,
    CLEAR_PRODUCTOS,
    OBTENER_TOTAL_INVERTIDO,
    ELIMINAR_STOCK,
    GET_CATEGORY_REPORT,
    GET_ALL_PRODUCTS,
    GET_AVAILABLE_PRODUCTS,
    GET_NOT_AVAILABLE_PRODUCTS,
    CLEAR_STOCK_LIST,
    ADD_PRODUCT_STOCK
} from "../actionTypes";


// INITIAL STATE
const initialState = {
    availableProducts: null,
    notAvailableProducts: null,
    allProducts: null,
    productosVenta: null,
    listadoStock: null,
    loading: true,
    errorResponse: false,
    selectedProduct: {},
    totalInvertido: null,
    reporteProductos: null,
    reporteStock: null,
    categoryReport: null
};

// REDUCER FUNCTION
const productosReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                allProducts: action.products
            }
        case GET_AVAILABLE_PRODUCTS:
            return {
                ...state,
                availableProducts: action.products
            }
        case GET_NOT_AVAILABLE_PRODUCTS:
            return {
                ...state,
                notAvailableProducts: action.products
            }
        case OBTENER_PRODUCTOS_VENTA:
            return {
                ...state,
                productosVenta: action.productosVenta
            }
        case OBTENER_LISTADO_STOCK:
            return {
                ...state,
                listadoStock: action.listado
            }
        case ADD_PRODUCT_STOCK:
            return {
                ...state,
                availableProducts: action.availableProducts,
                notAvailableProducts: action.notAvailableProducts
            }
        case ELIMINAR_STOCK:
            return {
                ...state,
                availableProducts: action.availableProducts,
                notAvailableProducts: action.notAvailableProducts
            }
        case CLEAR_STOCK_LIST:
            return {
                ...state,
                listadoStock: null
            }
        case CREAR_PRODUCTO:
            return {
                ...state,
                notAvailableProducts: action.products
            }
        case SELECTED_PRODUCT:
            return {
                ...state,
                selectedProduct: action.producto
            }
        case EDITAR_PRODUCTO:
            return {
                ...state,
                availableProducts: action.availableProducts,
                notAvailableProducts: action.notAvailableProducts
            }
        case OBTENER_REPORTE_PRODUCTOS:
            return {
                ...state,
                reporteProductos: action.productos
            }
        case OBTENER_TOTAL_INVERTIDO:
            return {
                totalInvertido: action.totalInvertido
            }
        case OBTENER_REPORTE_STOCK:
            return {
                ...state,
                reporteStock: action.productos
            }
        case GET_CATEGORY_REPORT:
            return {
                ...state,
                categoryReport: action.products
            }
        case CLEAR_PRODUCTOS:
            return initialState;
        default:
            return state;
    }
}

export default productosReducer;