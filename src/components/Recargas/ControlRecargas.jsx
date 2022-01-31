import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Loader from "react-loader-spinner";
import { Modal, Tabs, Tab } from 'react-bootstrap';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { clientToken } from '../../config/axios';
import { Redirect } from 'react-router-dom';
import { getCompanies, getDispositivos, postDispositivo, selectDevice } from '../Redux/actions/dispositivosActions';
import DispositivosTable from './DispositivosTable';
import CreateDispositivoForm from './CreateDispositivoForm';
import EditDispositivoForm from './EditDispositivoForm';

const ControlRecargas = () => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);

    const usuarioVerificacion = useSelector((state) => state.usuarios);
    const companies = useSelector((state) => state.companies.companies);
    const dispositivos = useSelector((state) => state.dispositivos.dispositivos);

    // Obtener dispositivos
    useEffect(() => {
        dispatch(getCompanies());
        dispatch(getDispositivos());
    }, [dispatch])

    // Handle submit form
    const handleSubmit = (values) => {
        setShow(false);
        dispatch(postDispositivo(values));
    }

    const handleSelectDevice = (device) => {
        Swal.fire({
            title: 'Introduzca contraseña',
            input: 'password',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonText: 'Confirmar',
            showLoaderOnConfirm: true,
            preConfirm: (password) => {
                const user = {
                    password,
                    username: usuarioVerificacion.me.username
                }
                return clientToken.post(`api/producto/verificar`, user)
                    .then(response => {
                        if(response.data.ok){
                            return response.data.msg
                        }
                    })
                    .catch(error => {
                        Swal.showValidationMessage(
                            `Contraseña incorrecta, vuelva a intentar`
                        )
                    })
            },
            allowOutsideClick: () => !Swal.isLoading()
            }).then((result) => {
                if (result.isConfirmed) {
                    console.log("ANTES DE AGREGAR", device);
                    dispatch(selectDevice(device));
                    setShowEditForm(true);
                }
            });
    }

    const handleSubmitEdit = (values) => {
    }

    const handleDeleteDevice = (id) => {
        Swal.fire({
            title: 'Desea eliminar el usuario?',
            showCancelButton: true,
            confirmButtonText: `Eliminar`,
            cancelButtonText: `Cancelar`
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Introduzca contraseña',
                    input: 'password',
                    inputAttributes: {
                        autocapitalize: 'off'
                    },
                    showCancelButton: true,
                    cancelButtonText: "Cancelar",
                    confirmButtonText: 'Confirmar',
                    showLoaderOnConfirm: true,
                    preConfirm: (password) => {
                        const user = {
                            password,
                            username: usuarioVerificacion.me.username
                            
                        }
                        return clientToken.post(`api/producto/verificar`, user)
                            .then(response => {
                                if(response.data.ok){
                                    return response.data.msg
                                }
                            })
                            .catch(error => {
                                Swal.showValidationMessage(
                                    `Contraseña incorrecta, vuelva a intentar`
                                )
                            })
                    },
                    allowOutsideClick: () => !Swal.isLoading()
                    }).then((result) => {
                        if (result.isConfirmed) {
                        }
                    });
            }
        });
    }

    const usuarios = useSelector((state) => state.usuarios.usuarios);
    
    if(usuarioVerificacion){
        if(usuarioVerificacion.me){
            console.log("USUARIO VER",usuarioVerificacion.me.rol);
            if(usuarioVerificacion.me.rol !== "ADMIN"){
                return (
                    <Redirect to="/home" />
                )
            }
        }
    }
    return (
        <div className="contenedor-controlProductos">
            <Tabs defaultActiveKey="dispositivos" id="uncontrolled-tab-example" className="mb-2 mt-10">
                <Tab eventKey="dispositivos" title="Dispositivos">
                    <div className="contenedor-productos">
                        <h1>Control de dispositivos</h1>
                        <div
                            style={{display: "flex", flexWrap: "wrap", justifyContent:"space-around"}}
                        >
                            <button
                                className="btn btn-primary"
                                onClick={() => setShow(true)}
                            >
                                Agregar dispositivo
                            </button>
                            <button
                                className="btn btn-primary"
                            >
                                Generar recarga
                            </button>
                        </div>
                        <hr/>
                        <div
                            style={{overflowY: "scroll", textAlign: "center", maxHeight:"700px"}}
                        >
                            {
                                dispositivos ? (
                                    dispositivos.length > 0 && (
                                        <DispositivosTable 
                                            data={dispositivos}
                                            handleSelectDevice={handleSelectDevice}
                                            handleDeleteDevice={handleDeleteDevice}
                                        />
                                    )
                                ) : (
                                    <h1>No existen dispositivos</h1>
                                )
                            }
                        </div>
                    </div>
                    {/* FORMULARIO PARA CREAR NUEVO DISPOSITIVO */}
                    <Modal
                        show={show}
                        onHide={() => {setShow(false)}}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Crear nuevo dispositivo</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <CreateDispositivoForm
                                companies={companies}
                                onSubmit={handleSubmit}
                            />
                        </Modal.Body>
                    </Modal>
                    {/* FORMULARIO DE EDICION DE DISPOSITIVO  */}
                    <Modal
                        show={showEditForm}
                        onHide={() => {setShowEditForm(false)}}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Editar dispositivo</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <EditDispositivoForm 
                                companies={companies}
                                onSubmit={handleSubmit}
                            />
                        </Modal.Body>
                    </Modal>
                </Tab>
                <Tab eventKey="history" title="Historial">
                    
                </Tab>
            </Tabs>
        </div>
    )

}
export default ControlRecargas;