import React from 'react';
import { useDispatch } from 'react-redux';
import { agregarProductoCarrito } from '../Redux/actions/ventasActions';

const ProductoCard = ({id, name, producto, precioVenta, color, stock}) => {
    const dispatch = useDispatch();

    const handleAddCarrito = () => {
        if(name.includes("Kit") || name.includes("Accesorios")){
            if(id && name && producto && precioVenta && color && stock){
                dispatch(agregarProductoCarrito({id,name,producto,precioVenta, color}))
            }
        }else {
            dispatch(agregarProductoCarrito({id,name,producto,precioVenta}))
        }
    }

    return (
        <div className="productCard">
            <h6><strong>{name}</strong></h6>
            <h6><strong>{producto}</strong></h6>
            {
                color ?
                <div>{color}</div> :
                <div>---</div>
            }
            <div>Stock: {stock}</div>
            {
                precioVenta ?
                <div>Q.{precioVenta}</div> :
                <div>---</div>
            }
            <br />
            <button
                className="btn btn-primary btn-block mb-0"
                onClick={handleAddCarrito}
            >
                Agregar
            </button>
        </div>
    );
}

export default ProductoCard;