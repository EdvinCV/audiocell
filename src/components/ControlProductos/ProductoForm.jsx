import React from 'react';
import {Field, reduxForm} from 'redux-form';
import { useState } from 'react';
import { maxLength200, maxLength50 } from '../Helpers/ReduxFormValidations';

const validate = values => {
    const errors = {}
    if(values.categoria === undefined || values.categoria === "0"){
        errors.categoria = "Campo requerido";
    }else if(values.categoria){
        if((values.categoria).includes("Kit") || (values.categoria).includes("Accesorios")){
            if(!values.color){
                errors.color = "Campo requerido";
            }
            if(!values.precioVenta || values.precioVenta <= 0){
                errors.precioVenta = "Campo requerido";
            }
        }
    }
    if(!values.name){
        errors.name = "Campo requerido";
    }
    if(!values.precioVenta){
        errors.precioVenta = "Campo requerido";
    }
    if(values.precioVenta){
        if(parseInt(values.precioVenta) < 0){
            errors.precioVenta = "Valor inválido";
        }
    }
    if(values.precioVenta2){
        if(parseInt(values.precioVenta2) < 0){
            errors.precioVenta2 = "Valor inválido";
        }
    }
    if(values.precioVenta3){
        if(parseInt(values.precioVenta3) < 0){
            errors.precioVenta3 = "Valor inválido";
        }
    }

    return errors;
}

const renderField = ({
    input,
    label,
    type,
    placeholder,
    meta: { touched, error }
}) => (
    <div>
        <label>{label}</label>
        <input {...input} placeholder={placeholder} type={type} className="form-control"/>
        {touched && ((error && <span style={{color: "red"}}>{error}</span>))}
    </div>
);

const ProductoForm = (props) => {    
    const {handleSubmit} = props;
    const {categorias} = props;
    const [showForm, setShowForm] = useState(false);

    const handleChangeCategory = (e) => {
        if((e.target.value).includes("Kit") || (e.target.value).includes("Accesorios")){
            setShowForm(true);
        } else {
            setShowForm(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label>Categoría</label>
                <br/>
                <Field
                    name="categoria"
                    component="select"
                    placeholder=""
                    className="form-control"
                    onChange={handleChangeCategory}
                >
                    <option value="0" defaultValue>Seleccione una categoría</option>
                    {
                        categorias.map((cat) => (
                            <option key={cat.id} value={cat.name}>{cat.name}</option>
                        ))
                    }
                </Field>
            </div>
            <div className="mb-3">
                <Field
                    name="name"
                    type="text"
                    component={renderField}
                    label="Nombre de producto"
                    placeholder="Ingrese el nombre"
                    validate={maxLength50}
                />
            </div>
            <div className="mb-3">
                <Field
                    name="color"
                    type="text"
                    component={renderField}
                    label="Color"
                    placeholder="Ingrese el color"
                    validate={maxLength50}
                />
            </div>
            <div className="mb-3">
                <Field
                    name="proveedor"
                    type="text"
                    component={renderField}
                    label="Proveedor"
                    placeholder="Ingrese proveedor"
                    validate={maxLength50}
                />
            </div>
            <div className="mb-3">
                <Field
                    name="precioVenta"
                    type="number"
                    component={renderField}
                    placeholder="Ingrese el precio de venta"
                    label="Precio Venta 1"
                />
            </div>
            <div className="mb-3">
                <Field
                    name="precioVenta2"
                    type="number"
                    component={renderField}
                    placeholder="Ingrese el precio de venta"
                    label="Precio Venta 2"
                />
            </div>
            <div className="mb-3">
                <Field
                    name="precioVenta3"
                    type="number"
                    component={renderField}
                    placeholder="Ingrese el precio de venta"
                    label="Precio Venta 3"
                />
            </div>
            <div className="mb-3">
                <Field
                    name="descripcion"
                    type="text"
                    component={renderField}
                    placeholder="Ingrese la descripción"
                    label="Descripción"
                    validate={maxLength200}
                />
            </div>
            <div>
                <button 
                    type="submit"
                    className="mt-3 btn btn-primary btn-block"
                >
                Guardar
                </button>
            </div>
        </form>
    );
}

export default reduxForm({
    form: 'productoForm',
    validate
})(ProductoForm);