// Actions types
import {
    GET_DISPOSITIVOS, GET_DISPOSITIVOS_ERROR, CREAR_PRODUCTO, EDITAR_PRODUCTO, SELECTED_PRODUCT, GET_COMPANIES, GET_COMPANIES_ERROR, POST_DISPOSITIVO, POST_DISPOSITIVO_ERROR, SELECT_DEVICE
} from '../actionTypes';
// ACTIONS DE AUTENTICACION
import {clientToken} from '../../../config/axios';
import Swal from 'sweetalert2';

// GET Companies
export const getCompanies = () => {
    return async (dispatch) => {
        try {
            const companies = await clientToken.get('api/companies');
            dispatch({
                type: GET_COMPANIES,
                companies: companies.data.companies
            });
        } catch(error) {
            dispatch({
                type: GET_COMPANIES_ERROR
            });
        }
    }
}

// GET Dispositivos
export const getDispositivos = () => {
    return async (dispatch) => {
        try {
            const dispositivos = await clientToken.get('api/dispositivos');
            dispatch({
                type: GET_DISPOSITIVOS,
                dispositivos: dispositivos.data.dispositivos
            });
        } catch(error) {
            dispatch({
                type: GET_DISPOSITIVOS_ERROR
            });
        }
    }
}

// POST Dispositivos
export const postDispositivo = (dispositivo) => {
    return async (dispatch) => {
        try {
            await clientToken.post('api/dispositivos', dispositivo);
            Swal.fire(
                'Dispositivo creado correctamente.',
                'AudioCell-El sonido es tu voz',
                'success'
            );
            dispatch({
                type: POST_DISPOSITIVO
            });
            const dispositivos = await clientToken.get('api/dispositivos');
            dispatch({
                type: GET_DISPOSITIVOS,
                dispositivos: dispositivos.data.dispositivos
            });
        } catch(error){
            Swal.fire(
                'Ha ocurrido un error, vuelva a intentar.',
                'AudioCell-El sonido es tu voz',
                'error'
            );
            dispatch({
                type: POST_DISPOSITIVO_ERROR
            });
            console.log(error.message);
        }
    }
}

// SELECTED DEVICE TO EDIT
export const selectDevice = (device) => {
    return async(dispatch) => {
        const dev = {
            ...device,
            saldo: device.stock,
            company: device.CompanyId
        }
        try {
            dispatch({
                type: SELECT_DEVICE,
                device: dev
            });
        } catch(error){
            console.log(error);
        }
    }
}

// PUT: Device
export const putDevice = (device) => {
    return async (dispatch) => {
        try {
            const resp = await clientToken.put('api/dispositivos', device);
            if(resp.data.data === 1){
                const productos = await clientToken.get('api/producto', {params: {page: 1, buscador: ''}});
                dispatch({
                    type: EDITAR_PRODUCTO,
                    productos: productos.data.productos,
                    productosNoDisponibles: productos.data.productosNoDisponibles
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

// DELETE: Device
export const deleteDevice = (id) => {
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

export const crearProductoStock = (producto) => {
    return async (dispatch) => {
        try {
            console.log("DIS",producto);

            await clientToken.post('api/producto/stock', producto);
            const productos = await clientToken.get('api/producto', {params: {page: 1,buscador:''}});
            Swal.fire(
                'Stock agregado correctamente.',
                'AudioCell-El sonido es tu voz',
                'success'
            );
            dispatch({
                type: CREAR_PRODUCTO,
                productos: productos.data.productos,
                productosNoDisponibles: productos.data.productosNoDisponibles
            });
        } catch(error){
            console.log(error);
        }
    }
}