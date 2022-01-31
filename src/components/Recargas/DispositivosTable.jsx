import React from 'react';
import {FaEdit} from 'react-icons/fa';
import {AiFillDelete} from 'react-icons/ai';

const DispositivosTable = ({data, handleSelectDevice, handleDeleteDevice}) => {
    return (
      <table className="table table-hover table-secondary">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Compañia</th>
            <th scope="col">Saldo Disponible</th>
            <th scope="col">Opciones</th>
          </tr>
        </thead>
        <tbody>
        {
            data.map((dispositivo, index) => (
                <tr
                    key={dispositivo.id}
                >
                    <th scope="row">{index+1}</th>
                    <td>{dispositivo.name}</td>
                    <td>{dispositivo.Company.name}</td>
                    <td>{dispositivo.stock}</td>
                    <td style={{display: "flex", justifyContent: "center"}}>
                        <div style={{marginLeft: "2px"}}>
                            <button 
                            className="btn btn-warning"
                            onClick={() => handleSelectDevice(dispositivo)}
                            >
                            <FaEdit 
                            size="20px"
                            />
                            </button>
                        </div>
                        <div style={{marginLeft: "20px"}}>
                            <button
                            className="btn btn-danger"
                            onClick={() => handleDeleteDevice(dispositivo)}
                            >
                            <AiFillDelete 
                            size="20px"
                            />
                            </button>
                        </div>
                    </td>
                </tr>
            ))
        }
        </tbody>
      </table>
    )
}

export default DispositivosTable;