// Actions types
import {
    OBTENER_PRODUCTOS, OBTENER_PRODUCTOS_ERROR, CREAR_PRODUCTO, SELECTED_PRODUCT, EDITAR_PRODUCTO, OBTENER_TOTAL_PRODUCTOS, OBTENER_REPORTE_PRODUCTOS, OBTENER_LISTADO_STOCK, OBTENER_PRODUCTOS_VENTA, OBTENER_REPORTE_STOCK, ELIMINAR_STOCK, OBTENER_TOTAL_INVERTIDO, GET_CATEGORY_REPORT, GET_ALL_PRODUCTS, GET_ALL_PRODUCTS_ERROR, GET_AVAILABLE_PRODUCTS, GET_AVAILABLE_PRODUCTS_ERROR, GET_NOT_AVAILABLE_PRODUCTS, GET_NOT_AVAILABLE_PRODUCTS_ERROR, CLEAR_STOCK_LIST, ADD_PRODUCT_STOCK, ADD_PRODUCT_STOCK_ERROR
} from '../actionTypes';
// ACTIONS DE AUTENTICACION
import {clientToken} from '../../../config/axios';
import Swal from 'sweetalert2';

// Get all productos
export const getAllProducts = () => {
    return async (dispatch) => {
        try {
            const {data} = await clientToken.get('api/producto/all');
            dispatch({
                type: GET_ALL_PRODUCTS,
                products: data.products
            });
        } catch(error) {
            dispatch({
                type: GET_ALL_PRODUCTS_ERROR
            });
        }
    }
}

// Get available products
export const getAvailableProducts = (search="") => {
    return async (dispatch) => {
        try {
            const {data} = await clientToken.get('api/producto/available', {params: {search}});
            console.log("DEITA", data);
            dispatch({
                type: GET_AVAILABLE_PRODUCTS,
                products: data.products
            });
        } catch(error) {
            dispatch({
                type: GET_AVAILABLE_PRODUCTS_ERROR
            });
        }
    }
}

// Get not available products
export const getNotAvailableProducts = (search="") => {
    return async (dispatch) => {
        try {
            const {data} = await clientToken.get('api/producto/notAvailable', {params: {search}});
            dispatch({
                type: GET_NOT_AVAILABLE_PRODUCTS,
                products: data.products
            });
        } catch(error) {
            dispatch({
                type: GET_NOT_AVAILABLE_PRODUCTS_ERROR
            });
        }
    }
}

// Get products to sell
export const obtenerProductosVenta = (page=1,buscador='') => {
    return async (dispatch) => {
        try {
            const {data} = await clientToken.get('api/venta/productos');
            dispatch({
                type: OBTENER_PRODUCTOS_VENTA,
                productosVenta: data.results
            });
        } catch(error) {
            dispatch({
                type: OBTENER_PRODUCTOS_ERROR
            });
        }
    }
}

// Get list of available stock of product
export const obtenerListadoStock = (producto) => {
    return async (dispatch) => {
        try {
            const {data} = await clientToken.get('api/producto/stock', {params: {id: producto}});
            dispatch({
                type: OBTENER_LISTADO_STOCK,
                listado: data.listado
            });
        } catch(error) {
            dispatch({
                type: OBTENER_PRODUCTOS_ERROR
            });
        }
    }
}

// Clear stock list
export const clearStockList = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: CLEAR_STOCK_LIST
            });
        } catch(error) {
            console.log("CLEAR STOCK LIST ERROR");
        }
    }
}

// Create product
export const crearProducto = (producto, search="") => {
    return async (dispatch) => {
        try {
            producto = {
                ...producto,
                precioCompra: parseInt(producto.precioCompra),
                precioVenta: parseInt(producto.precioVenta),
                stock: parseInt(producto.stock)
            }

            await clientToken.post('api/producto', producto);
            const {data} = await clientToken.get('api/producto/notAvailable', {params: {search}});
            Swal.fire(
                'Producto creado correctamente.',
                'AudioCell-El sonido es tu voz',
                'success'
            );
            dispatch({
                type: CREAR_PRODUCTO,
                products: data.products,
            });
        } catch(error){
            console.log(error);
        }
    }
}

// Add product stock
export const crearProductoStock = (producto, search="") => {
    return async (dispatch) => {
        try {
            console.log("DIS",producto);

            await clientToken.post('api/producto/stock', producto);
            const available = await clientToken.get('api/producto/available', {params: {search}});
            const notAvailable = await clientToken.get('api/producto/notAvailable', {params: {search}});
            Swal.fire(
                'Stock agregado correctamente.',
                'AudioCell-El sonido es tu voz',
                'success'
            );
            dispatch({
                type: ADD_PRODUCT_STOCK,
                availableProducts: available.data.products,
                notAvailableProducts: notAvailable.data.products
            });
        } catch(error){
            console.log(error);
            dispatch({
                type: ADD_PRODUCT_STOCK_ERROR
            });
        }
    }
}

// Delete product stock
export const deleteStock = (id, search="") => {
    return async (dispatch) => {
        try {
            await clientToken.put('api/producto/stock', {id});
            const available = await clientToken.get('api/producto/available', {params: {search}});
            const notAvailable = await clientToken.get('api/producto/notAvailable', {params: {search}});
            Swal.fire(
                'Stock eliminado correctamente.',
                'AudioCell-El sonido es tu voz',
                'success'
            );
            dispatch({
                type: ELIMINAR_STOCK,
                availableProducts: available.data.products,
                notAvailableProducts: notAvailable.data.products
            });
        } catch(error){
            console.log(error);
        }
    }
}

// Edit product
export const editarProducto = (producto) => {
    return async (dispatch) => {
        try {
            producto = {
                ...producto,
                categoria: parseInt(producto.categoria),
                precioVenta: parseInt(producto.precioVenta),
                precioCompra: parseInt(producto.precioCompra),
                stock: parseInt(producto.stock)
            }
            const resp = await clientToken.put('api/producto', producto);
            if(resp.data.data === 1){
                const available = await clientToken.get('api/producto/available', {params: {search:""}});
                const notAvailable = await clientToken.get('api/producto/notAvailable', {params: {search:""}});
                dispatch({
                    type: EDITAR_PRODUCTO,
                    availableProducts: available.data.products,
                    notAvailableProducts: notAvailable.data.products
                });
                Swal.fire(
                    'Producto editado correctamente.',
                    'AudioCell-El sonido es tu voz',
                    'success'
                );
            } else {
                Swal.fire(
                    'Producto no existente.',
                    'AudioCell-El sonido es tu voz',
                    'error'
                );
            }
        } catch(error){
            console.log(error);
        }
    }
}

export const deleteProducto = (id) => {
    return async (dispatch) => {
        try {
            const resp = await clientToken.put('api/producto/delete', {id: id});
            if(resp.data.data === 1){
                const productos = await clientToken.get('api/producto', {params: {page: 1, buscador: ''}});
                dispatch({
                    type: EDITAR_PRODUCTO,
                    productos: productos.data.productos,
                    productosNoDisponibles: productos.productosNoDisponibles,
                });
                Swal.fire(
                    'Producto eliminado correctamente.',
                    'AudioCell-El sonido es tu voz',
                    'success'
                );
            } else {
                Swal.fire(
                    'Producto no existente.',
                    'AudioCell-El sonido es tu voz',
                    'error'
                );
            }
        } catch(error){
            console.log(error);
        }
    }
}

export const seleccionarProducto = (producto) => {
    return async(dispatch) => {
        try {
            dispatch({
                type: SELECTED_PRODUCT,
                producto
            });
        } catch(error){
            console.log(error);
        }
    }
}

/* REPORTES */
export const getReporteProductos = () => {
    return async(dispatch) => {
        try {
            const productos = await clientToken.get('api/producto/reporte');
            dispatch({
                type: OBTENER_REPORTE_PRODUCTOS,
                productos: productos.data.productos
            });
        } catch(error){
            console.log(error);
        }
    }
}

export const getReporteProductosStock = (formFechas) => {
    return async(dispatch) => {
        try {
            const {data} = await clientToken.get('api/producto/reporteStock', {params: {inicio: formFechas.fechaInicio, fin: formFechas.fechaFin}});
            dispatch({
                type: OBTENER_REPORTE_STOCK,
                productos: data.results
            });
        } catch(error){
            console.log(error);
        }
    }
}

// Obtener listado de usuarios
export const obtenerTotalInvertido = () => {
    return async (dispatch) => {
        try {
            const {data} = await clientToken.get('api/venta/invertido');
            const totalInvertido = data.results[0].Invertido;
            if(isNaN(totalInvertido)){
                Swal.fire(
                    'Error al obtener total invertido.',
                    'AudioCell-El sonido es tu voz',
                    'error'
                );
            }else {
                dispatch({
                    type: OBTENER_TOTAL_INVERTIDO,
                    totalInvertido: parseFloat(totalInvertido)
                });
            }
        } catch(error) {
            console.log(error);
        }
    }
}

export const getCategoryReport = (category) => {
    return async(dispatch) => {
        try {
            const {data} = await clientToken.get('api/producto/categories', {params: {category}});
            dispatch({
                type: GET_CATEGORY_REPORT,
                products: data.productos
            });
        } catch(error){
            console.log(error);
        }
    }
}