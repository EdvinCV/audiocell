import React from 'react';
import { useDispatch } from 'react-redux';
import {eliminarProductoCarrito, cambiarCantidadEpin, cambiarCantidadPrecio} from '../Redux/actions/ventasActions';

const CardItem = ({producto}) => {
    
    const dispatch = useDispatch();

    // const handleAddCantidad = () => {
    //     dispatch(agregarCantidadProducto(producto.id));
    // }

    // const handleSubtractCantidad = () => {
    //     dispatch(restarCantidadProducto(producto.id));
    // }

    const handleDeleteProduct = () => {
        dispatch(eliminarProductoCarrito(producto.id));
    }

    const handleTotal = (e) => {
        dispatch(cambiarCantidadEpin(e.target.value));
    }

    const handleChangePrecio = (e) => {
        dispatch(cambiarCantidadPrecio({id: producto.id,cantidad: e.target.value}));
    }

    return(
        <div className="CardItem">
            <h6 style={{color: producto.name.includes("Kit Liberado Claro") ? "orange" : producto.name.includes("Kit Claro") ? "red" : producto.name.includes("Kit Liberado Tigo") ? "yellow" : producto.name.includes("Kit Tigo") ? "blue" : "gray"}}><b>{producto.name}</b></h6>
            <div>{producto.producto}</div>
            {
                (producto.name).includes("Epin") ? (
                    <input
                        className="form-control"
                        type="number"
                        placeholder="Ingrese cantidad"
                        onChange={handleChangePrecio}
                    />
                ) : (
                    <>
                        <div>Color: {producto.color ? producto.color: "-"}</div>
                        <div>Precio: Q{producto.precioVenta1}{producto.precioVenta2 ? `-Q${producto.precioVenta2}` : ""}{producto.precioVenta3 ? `-Q${producto.precioVenta3}` : ""}</div>
                        <br />
                        <input
                            className="form-control"
                            type="number"
                            placeholder="Ingrese precio"
                            defaultValue={producto.precioFinal}
                            onChange={handleChangePrecio}
                        />
                    </>
                )
            }
            <br/>
            <div>
                <button
                    className="btn btn-danger"
                    onClick={handleDeleteProduct}
                >
                    Eliminar
                </button>
            </div>
        </div>
    );
}

export default CardItem;