import React, {useEffect} from 'react';
import {FaEdit} from 'react-icons/fa';
import {AiFillDelete} from 'react-icons/ai';
import {BsListCheck} from 'react-icons/bs';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { obtenerProductos } from '../Redux/actions/productosActions';

const ProductsTable = ({data, handleSelectProducto, handleDelete, usuario, totalProductos, handleListStock}) => {
    // HOOKS
    const dispatch = useDispatch();
    // STATE
    const [admin, setAdmin] = useState(false);
    const [actualPage, setActualPage] = useState(1);
    
    useEffect(() => {
      if(usuario){
        if(usuario.me){
          if(usuario.me.rol === "ADMIN"){
            setAdmin(true);
          } else if(usuario.me.rol === "VENTAS"){
            setAdmin(false);
          }
        }
      }
    }, [usuario])

    useEffect(() => {
      dispatch(obtenerProductos(actualPage));
    }, [actualPage, dispatch])

    return (
      <>
      <table className="table table-hover table-secondary table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Categoría</th>
            <th scope="col">Proveedor</th>
            <th scope="col">Precio 1</th>
            <th scope="col">Precio 2</th>
            <th scope="col">Precio 3</th>
            <th scope="col">Color</th>
            <th scope="col">Disponible</th>
            {
              admin &&
                <>
                <th scope="col">Stock</th>
                <th scope="col">Editar</th>
                <th scope="col">Eliminar</th>
                </>
            }
          </tr>
        </thead>
        <tbody>
          {
            data.map((producto, index) => (
              <tr
                key={producto.id}
              >
              <th scope="row">{index+1}</th>
              <td>{producto.name}</td>
              <td>{producto.categoria}</td>
              <td>{producto.proveedor ? `${producto.proveedor}` : "---"}</td>
              <td>{producto.precioVenta1 ? `Q.${producto.precioVenta1}` : "---"}</td>
              <td>{producto.precioVenta2 ? `Q.${producto.precioVenta2}` : "---"}</td>
              <td>{producto.precioVenta3 ? `Q.${producto.precioVenta3}` : "---"}</td>
              <td>{producto.color ? producto.color : '---'}</td>
              <td>{producto.disponible ? producto.disponible : 0}</td>
              {
                admin &&
                  <>
                  <td>
                    <div style={{marginLeft: "20px"}}>
                      <button className="btn btn-secondary" onClick={() => {handleListStock(producto.id)}}>
                        <BsListCheck 
                          size="20px"
                          />
                      </button>
                    </div>
                  </td>
                  <td style={{display: "flex", justifyContent: "center"}}>
                    <div style={{marginLeft: "2px"}}>
                      <button className="btn btn-warning" onClick={() => {handleSelectProducto(producto)}}>
                        <FaEdit 
                          size="20px"
                        />
                      </button>
                    </div>
                  </td>
                  <td>
                    <div style={{marginLeft: "20px"}}>
                      <button className="btn btn-danger" onClick={() => {handleDelete(producto.id)}}>
                        <AiFillDelete 
                          size="20px"
                        />
                      </button>
                    </div>
                  </td>
                  </>
              }
            </tr>
            ))
          }
        </tbody>
        </table>
          </>
    )
}

export default ProductsTable;