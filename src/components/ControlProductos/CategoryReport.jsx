import React, {useEffect} from 'react';
import {FaEdit} from 'react-icons/fa';
import {AiFillDelete} from 'react-icons/ai';
import {BsListCheck} from 'react-icons/bs';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const CategoryReport = ({data, usuario}) => {
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
          </tr>
        </thead>
        <tbody>
          {
            data && (
                data.map((producto, index) => (
                    <tr
                        key={producto.id}
                    >
                        <th scope="row">{index+1}</th>
                        <td style={{minWidth: "100px"}}>{producto.name}</td>
                        <td style={{minWidth: "100px"}}>{producto.categoria}</td>
                        <td>{producto.proveedor ? `${producto.proveedor}` : "---"}</td>
                        <td>{producto.precioVenta ? `Q.${producto.precioVenta}` : "---"}</td>
                        <td>{producto.precioVenta2 ? `Q.${producto.precioVenta2}` : "---"}</td>
                        <td>{producto.precioVenta3 ? `Q.${producto.precioVenta3}` : "---"}</td>
                        <td>{producto.color ? producto.color : '---'}</td>
                        <td>{producto.disponible ? producto.disponible : 0}</td>
                    </tr>
                ))
            )
          }
        </tbody>
        </table>
          </>
    )
}

export default CategoryReport;