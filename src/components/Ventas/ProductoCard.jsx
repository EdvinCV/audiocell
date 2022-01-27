import React from 'react';
import { useDispatch } from 'react-redux';
import { agregarProductoCarrito } from '../Redux/actions/ventasActions';

const ProductoCard = ({productos}) => {
    const dispatch = useDispatch();

    const handleAddCarrito = ({id, name, producto, precioVenta1, precioVenta2, precioVenta3, color, stock}) => {
        if(name.includes("Kit") || name.includes("Accesorios") || name.includes("Epin")){
            if(id && name && producto && precioVenta1 && color && stock){
                dispatch(agregarProductoCarrito({id,name,producto,precioVenta1,precioVenta2,precioVenta3, color}))
            }
        }else {
            dispatch(agregarProductoCarrito({id,name,producto,precioVenta1}))
        }
    }

    return (
        <div className="productCard" style={{width: "100%"}}>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Categoría</th>
                        <th scope="col">Producto</th>
                        <th scope="col">Disponible</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Opciones</th>
                    </tr>
                </thead>
                <tbody>
                {
                    productos.map((prod) => (
                        <tr key={prod.id}>
                            <th scope="row">1</th>
                            <th scope="row" style={{color: prod.name.includes("Kit Liberado Claro") ? "orange" : prod.name.includes("Kit Claro") ? "red" : prod.name.includes("Kit Liberado Tigo") ? "yellow" : prod.name.includes("Kit Tigo") ? "blue" : "gray"}}>{prod.name}</th>
                            <th scope="row">{prod.producto} - {prod.color}</th>
                            <th scope="row">{prod.stock}</th>
                            <th scope="row">Q{prod.precioVenta1}{prod.precioVenta2 ? `-Q${prod.precioVenta2}` : ""}{prod.precioVenta3 ? `-Q${prod.precioVenta3}` : ""}</th>
                            <th scope="row">
                                <button 
                                    className="btn btn-primary btn-block mb-0"
                                    onClick={() => handleAddCarrito(prod)}
                                >
                                    Agregar
                                </button>
                            </th>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
}

export default ProductoCard;