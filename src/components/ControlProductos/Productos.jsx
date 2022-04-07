import React, {useEffect, useState} from 'react';
import ProductsTable from './ProductsTable';
import {useDispatch, useSelector} from 'react-redux';
import { obtenerProductos, crearProducto, seleccionarProducto, editarProducto, deleteProducto, obtenerTotalProductos, getReporteProductos, crearProductoStock, obtenerListadoStock, getReporteProductosStock, obtenerTotalInvertido, getCategoryReport, getAllProducts, getAvailableProducts, getNotAvailableProducts, clearStockList } from '../Redux/actions/productosActions';
import { obtenerUsuario } from '../Redux/actions/usersActions';
import ProductoForm from './ProductoForm';
import { Modal, Tabs, Tab } from 'react-bootstrap';
import { obtenerCategorias } from '../Redux/actions/categoriasActions';
import ProductoEditForm from './ProductoEditForm';
import Swal from 'sweetalert2';
import Loader from 'react-loader-spinner';
import { clientToken } from '../../config/axios';
import ProductoStockForm from './ProductoStockForm';
import ListadoStock from './ListadoStock';
import ReporteStock from './ReporteStock';
import CategoryReport from './CategoryReport';

const Productos = () => {
    // Mostrar formulario de creacion.
    const [show, setShow] = useState(false);
    // Mostrar formulario de edicion.
    const [showFormEdit, setShowFormEdit] = useState(false);
    // Mostrar formulario de stock.
    const [showStock, setShowStock] = useState(false);
    const [productoStock, setProductoStock] = useState(null);
    // Mostrar listado de stock
    const [showListadoStock, setShowListadoStock] = useState(false);
    // Fechas para reportes
    const [formFechasReporte, setFormFechasReporte] = useState({
        fechaInicio: null,
        fechaFin: null
    });
    // Category input
    const [categoryInput, setCategoryInput] = useState(null);

    const handleInputChangeReporte = (e) => {
        setFormFechasReporte({...formFechasReporte,[e.target.name] : e.target.value});
    }
    // Verificar si usuario logueado es admin
    const [admin, setAdmin] = useState(false);
    // Search values
    const [searchAvailableProducts, setSearchAvailableProducts] = useState("");
    const [searchNotAvailableProducts, setSearchNotAvailableProducts] = useState("");
    // Loader
    const [loading, setLoading] = useState(true);
    // Dispatch
    const dispatch = useDispatch();
    
    // STORE
    const availableProducts = useSelector((state) => state.productos.availableProducts);
    const notAvailableProducts = useSelector((state) => state.productos.notAvailableProducts);
    const allProducts = useSelector((state) => state.productos.allProducts);
    const categorias = useSelector((state) => state.categorias.categorias);
    const usuario = useSelector((state) => state.usuarios);
    const listadoStock = useSelector((state) => state.productos.listadoStock);
    const reporteStock = useSelector((state) => state.productos.reporteStock);
    const totalInvertido = useSelector((state) => state.productos.totalInvertido);
    const categoryReport = useSelector((state) => state.productos.categoryReport);
    
    // Get store data
    useEffect(() => {
        dispatch(obtenerUsuario());
        dispatch(obtenerCategorias());
        dispatch(getAvailableProducts());
        dispatch(getNotAvailableProducts());
        dispatch(getReporteProductos());
        dispatch(obtenerTotalInvertido());
    }, [dispatch])

    // Get actual user
    useEffect(() => {
        if(usuario){
            if(usuario.me){
                if(usuario.me.rol === "ADMIN"){
                    setAdmin(true);
                } else if(usuario.me.rol === "VENTAS"){
                    setAdmin(false);
                }
            }
            setLoading(false);
        }
    }, [usuario])

    // Search available products
    useEffect(() => {
        if(searchAvailableProducts === ""){
            dispatch(getAvailableProducts());
        } else {
            dispatch(getAvailableProducts(searchAvailableProducts));
        }
    }, [searchAvailableProducts, dispatch]);
    // Search not available products
    useEffect(() => {
        if(searchNotAvailableProducts === ""){
            dispatch(getNotAvailableProducts());
        } else {
            dispatch(getNotAvailableProducts(searchNotAvailableProducts));
        }
    }, [searchNotAvailableProducts, dispatch]);

    // Change available search
    const handleChangeAvailableSearch = (e) => {
        setSearchAvailableProducts(e.target.value);
    }
    // Change not available search 
    const handleChangeNotAvailableSearch = (e) => {
        setSearchNotAvailableProducts(e.target.value);
    }
    
    // Create product submit
    const handleSubmit = (values) => {
        setShow(false);
        dispatch(crearProducto(values));
    }
    // Submit agregar stock
    const handleSubmitStock = (values) => {
        if(!productoStock){
            Swal.fire('Debe seleccionar un producto','','error');
        }else {
            setShowStock(false);
            dispatch(crearProductoStock({cantidad:values.cantidad, precio:values.precioCompra,productoId: productoStock.value}));
        }
    }
    // Seleccionar producto para editar
    const handleSelectProducto = (producto) => {
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
                    username: usuario.me.username
                    
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
                    dispatch(seleccionarProducto(producto));
                    setShowFormEdit(true);
                }
            });
    }
    // Agregar stock
    const handleAgregarStock = (producto) => {
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
                    username: usuario.me.username
                    
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
                    dispatch(getAllProducts());
                    setShowStock(true);
                }
            });
    }
    // Seleccionar listado de stock
    const handleListStock = (producto) => {
        setShowListadoStock(true);
        dispatch(obtenerListadoStock(producto));
    }
    // Submit editar producto
    const handleSubmitEdit = (values) => {
        setShowFormEdit(false);
        dispatch(editarProducto(values));
        setLoading(false);
    }
    // Eliminar producto
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Desea eliminar el producto?',
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
                            username: usuario.me.username
                            
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
                            dispatch(deleteProducto(id));
                        }
                    });
            }
        });
    }
    // Submit Reporte
    const handleSubmitReporte = () => {
        const {fechaInicio, fechaFin} = formFechasReporte;
            if(!fechaInicio || !fechaFin){
                Swal.fire(
                    'Debe seleccionar dos fechas.',
                    'AudioCell-El sonido es tu voz.',
                    'error'
                );
            } else {
                dispatch(getReporteProductosStock(formFechasReporte));
            }
    }

    // Get category report
    const handleCategoryReport = () => {
            if(categoryInput === null || categoryInput === "0"){
                Swal.fire(
                    'Debe seleccionar una categoría.',
                    'AudioCell-El sonido es tu voz.',
                    'error'
                );
            } else {
                dispatch(getCategoryReport(categoryInput));
            }
    }

    if(loading){
        return (
            <div
                style={{display:"flex", alignItems:"center", justifyContent:"center"}}
            >
                <Loader
                    type="ThreeDots"
                    color="#17174a"
                    height={100}
                    width={100}
                />
            </div>
        )
    } else {
        return (
            <div className="contenedor-controlProductos">
            <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mb-2">
                <Tab eventKey="home" title="Productos Disponibles">
                    <div className="contenedor-productos">
                        <h1>Control de productos</h1>
                        <div
                            style={{display: "flex", flexWrap: "wrap", justifyContent:"space-between"}}
                        >
                            {
                                admin &&
                                    <>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => setShow(true)}
                                        >
                                            Agregar Producto
                                        </button>
                                        <button
                                            className="btn btn-primary"
                                            onClick={handleAgregarStock}
                                        >
                                            Agregar Stock
                                        </button>
                                    </>
                            }
                            <input
                                name="searchAvailableProducts"
                                className="form-control"
                                style={{maxWidth:"300px", marginTop:"2px"}}
                                type="text"
                                value={searchAvailableProducts}
                                onChange={handleChangeAvailableSearch}
                                placeholder="Buscar producto..."
                            />
                        </div>
                        <hr/>
                        <div
                            style={{overflowY: "scroll", textAlign: "center", maxHeight:"700px"}}
                        >
                            {
                                availableProducts ? (
                                    availableProducts.length > 0 ? (
                                        <ProductsTable
                                            data={availableProducts}
                                            handleSelectProducto={handleSelectProducto}
                                            handleDelete={handleDelete}
                                            usuario={usuario}
                                            handleListStock={handleListStock}
                                        />
                                    ) : (
                                        <h4>No existen productos...</h4>
                                    )
                                ) : (
                                    <Loader
                                        type="ThreeDots"
                                        color="#17174a"
                                        height={100}
                                        width={100}
                                    />
                                )
                            }
                        </div>
                        {/* FORM PARA CREAR NUEVO PRODUCTO */}
                        <Modal
                            show={show}
                            onHide={() => {setShow(false)}}
                            backdrop="static"
                            keyboard={false}
                            >
                            <Modal.Header closeButton>
                                <Modal.Title>Crear nuevo producto</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ProductoForm
                                    onSubmit={handleSubmit}
                                    categorias={categorias}
                                />
                            </Modal.Body>
                        </Modal>
                        {/* FORM PARA EDITAR PRODUCTO */}
                        <Modal
                            show={showFormEdit}
                            onHide={() => {setShowFormEdit(false)}}
                            backdrop="static"
                            keyboard={false}
                            >
                            <Modal.Header closeButton>
                                <Modal.Title>Editar producto</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ProductoEditForm
                                    onSubmit={handleSubmitEdit}
                                />
                            </Modal.Body>
                        </Modal>
                        {/* FORM PARA AGREGAR STOCK DE PRODUCTO */}
                        <Modal
                            show={showStock}
                            onHide={() => {setShowStock(false)}}
                            backdrop="static"
                            keyboard={false}
                            >
                            <Modal.Header closeButton>
                                <Modal.Title>Stock de producto</Modal.Title>
                            </Modal.Header>
                            {
                                <Modal.Body>
                                    <ProductoStockForm 
                                        onSubmit={handleSubmitStock}
                                        productos={allProducts}
                                        setProductoStock={setProductoStock}
                                        productoStock={productoStock}
                                    />
                                </Modal.Body>
                            }
                        </Modal>
                        {/* LISTADO DE STOCKS */}
                        <Modal
                            show={showListadoStock}
                            onHide={() => {setShowListadoStock(false)}}
                            backdrop="static"
                            keyboard={false}
                            >
                            <Modal.Header closeButton>
                                <Modal.Title>Listado de Stock</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {
                                    listadoStock ? (
                                        <ListadoStock 
                                            stocks={listadoStock}
                                            setShowListadoStock={setShowListadoStock}
                                        />
                                    ) : (
                                        <Loader
                                            type="ThreeDots"
                                            color="#17174a"
                                            height={100}
                                            width={100}
                                        />
                                    )
                                }
                            </Modal.Body>
                        </Modal>
                    </div>
                </Tab>
                <Tab eventKey="homeNo" title="No Disponibles">
                    <div className="contenedor-productos">
                    <h1>Control de productos</h1>
                    <div
                        style={{display: "flex", flexWrap: "wrap", justifyContent:"space-between"}}
                        >
                        {
                            admin &&
                                <>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => setShow(true)}
                                >
                                    Agregar Producto
                                </button>
                                <button
                                    className="btn btn-primary"
                                    onClick={handleAgregarStock}
                                >
                                    Agregar Stock
                                </button>
                                </>
                        }
                        <input
                            name="searchNotAvailableProducts"
                            className="form-control"
                            style={{maxWidth:"300px", marginTop:"2px"}}
                            type="text"
                            value={searchNotAvailableProducts}
                            onChange={handleChangeNotAvailableSearch}
                            placeholder="Buscar producto..."
                        />
                    </div>
                    <hr/>
                    <div
                        style={{overflowY: "scroll", textAlign: "center", maxHeight:"700px"}}
                    >
                        {
                            notAvailableProducts ? (
                                notAvailableProducts.length > 0 ? (
                                    <ProductsTable
                                        data={notAvailableProducts}
                                        handleSelectProducto={handleSelectProducto}
                                        handleDelete={handleDelete}
                                        usuario={usuario}
                                        handleListStock={handleListStock}
                                    />
                                ) : (
                                    <h4>No existen productos...</h4>
                                )
                            ) : (
                                <Loader
                                    type="ThreeDots"
                                    color="#17174a"
                                    height={100}
                                    width={100}
                                />
                            )
                        }
                    </div>
                    {/* FORM PARA CREAR NUEVO PRODUCTO */}
                    <Modal
                        show={show}
                        onHide={() => {setShow(false)}}
                        backdrop="static"
                        keyboard={false}
                        >
                        <Modal.Header closeButton>
                            <Modal.Title>Crear nuevo producto</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ProductoForm
                                onSubmit={handleSubmit}
                                categorias={categorias}
                            />
                        </Modal.Body>
                    </Modal>
                    {/* FORM PARA EDITAR PRODUCTO */}
                    <Modal
                        show={showFormEdit}
                        onHide={() => {setShowFormEdit(false)}}
                        backdrop="static"
                        keyboard={false}
                        >
                        <Modal.Header closeButton>
                            <Modal.Title>Editar producto</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ProductoEditForm
                                onSubmit={handleSubmitEdit}
                            />
                        </Modal.Body>
                    </Modal>
                    {/* FORM PARA AGREGAR STOCK DE PRODUCTO */}
                    <Modal
                        show={showStock}
                        onHide={() => {setShowStock(false)}}
                        backdrop="static"
                        keyboard={false}
                        >
                        <Modal.Header closeButton>
                            <Modal.Title>Stock de producto</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ProductoStockForm 
                                onSubmit={handleSubmitStock}
                                productos={allProducts}
                                setProductoStock={setProductoStock}
                                productoStock={productoStock}
                            />
                        </Modal.Body>
                    </Modal>
                    {/* LISTADO DE STOCKS */}
                    <Modal
                        show={showListadoStock}
                        onHide={() => {setShowListadoStock(false); dispatch(clearStockList())}}
                        backdrop="static"
                        keyboard={false}
                        >
                        <Modal.Header closeButton>
                            <Modal.Title>Listado de Stock</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {
                                listadoStock ? (
                                    <ListadoStock 
                                        stocks={listadoStock}
                                        setShowListadoStock={setShowListadoStock}
                                    />
                                ) : (
                                    <Loader
                                        type="ThreeDots"
                                        color="#17174a"
                                        height={100}
                                        width={100}
                                    />
                                )
                            }
                        </Modal.Body>
                    </Modal>
                    </div>
                </Tab>
                <Tab eventKey="reporte" title="Reporte Stock">
                    <div className="contenedor-productos">
                        <h1>Stock Ingresado</h1>
                        <div
                            style={{display: "flex", justifyContent:"space-around", flexWrap:"wrap"}}
                        >
                    <div>
                        <label htmlFor="">Fecha Inicio</label>
                        <input
                                name="fechaInicio"
                                className="form-control md-4"
                                type="date"
                                value={formFechasReporte.formInicio}
                                onChange={handleInputChangeReporte}
                        />
                    </div>
                    <div>
                        <label htmlFor="">Fecha Fin</label>
                        <input
                                name="fechaFin"
                                className="form-control md-4"
                                type="date"
                                value={formFechasReporte.formFin}
                                onChange={handleInputChangeReporte}
                        />
                    </div>
                    <button
                        className="btn btn-primary mt-3"
                        onClick={handleSubmitReporte}
                    >
                        Buscar
                    </button>
                </div>
                <hr />
                <div
                    style={{overflowY: "scroll", maxHeight: "400px"}}
                >
                {
                    reporteStock && 
                        <ReporteStock 
                            data={reporteStock}
                        />
                }
            </div>
            </div>
                </Tab>
                <Tab eventKey="categorias" title="Reporte categoría">
                <div className="contenedor-ventas">
                    <h1>Productos Categoría</h1>
                    <div
                        style={{display: "flex", justifyContent:"space-around", flexWrap:"wrap"}}
                    >
                        <div>
                            <label htmlFor="">Categoría</label>
                            <select 
                                className="form-select form-select-sm" 
                                aria-label=".form-select-sm example"
                                value={categoryInput}
                                onChange={(e) => {setCategoryInput(e.target.value)}}
                            >
                                <option value={0} >Seleccione una categoría</option>
                                {
                                    categorias && (
                                        categorias.map((c) => (
                                            <option value={c.id} key={c.id}>{c.name}</option>
                                        ))
                                    )
                                }
                            </select>
                        </div>
                        <button
                            className="btn btn-primary mt-2"
                            onClick={handleCategoryReport}
                        >
                            Generar reporte
                        </button>
                    </div>
                    <hr />
                    <div
                        style={{overflowY: "scroll", maxHeight: "400px"}}
                    >
                        {
                            <CategoryReport 
                                data={categoryReport}
                                usuario={usuario}
                            />
                        }
                    </div>
                </div>
                </Tab>
                {
                    admin &&
                        <Tab eventKey="total" title="Inversión">
                            <div className="contenedor-productos">
                                <div className="card text-center">
                                    <div className="card-header">
                                        <h3>Información de inversión estimada</h3>
                                    </div>
                                    <div className="card-body">
                                        <h3>Total: <b>Q.{totalInvertido ? totalInvertido : 0}</b> </h3>
                                        <h4>Fecha: {new Date().toLocaleString("es-GT", {timeZone: "America/Guatemala"})}</h4>
                                    </div>
                                    <div className="card-footer text-muted">
                                        AudioCell-El sonido es tu voz
                                    </div>
                                </div>
                            </div>
                        </Tab>
                }
            </Tabs>
            </div>
        )
    }
}

export default Productos;