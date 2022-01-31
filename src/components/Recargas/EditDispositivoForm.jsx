import React from 'react';
import { connect } from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import { selectDevice } from '../Redux/actions/dispositivosActions';

const validate = values => {
    const errors = {}
    if(values.company === '0'){
        errors.company = "Campo requerido";
    }
    if(!values.name){
        errors.name = "Campo requerido";
    }
    if(!values.saldo){
        errors.saldo = "Campo requerido";
    }
    if(values.saldo){
        if(parseInt(values.saldo) < 0){
            errors.saldo = "Valor inválido";
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
        <input {...input} placeholder={placeholder} type={type} className="form-control" maxLength="30"/>
        {touched && ((error && <span style={{color: "red"}}>{error}</span>))}
    </div>
);

var EditDispositivoForm = (props) => {    
    const {handleSubmit} = props;
    const {companies} = props;
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label>Compañia</label>
                <br/>
                <Field
                    name="company"
                    component="select"
                    className="form-control"
                    required
                >
                    <option value="0">Seleccione una compañia</option>
                    {
                        companies.map((c) => (
                            <option value={c.id} key={c.id}>{c.name}</option>
                        ))
                    }
                </Field>
            </div>
            <div className="mb-3">
                <Field
                    name="name"
                    type="text"
                    component={renderField}
                    label="Nombre"
                    placeholder="Ingrese nombre"
                />
            </div>
            <div className="mb-3">
                <Field
                    name="saldo"
                    type="number"
                    component={renderField}
                    placeholder="Ingrese saldo"
                    label="Saldo"
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

EditDispositivoForm = reduxForm({
    form: 'editDispositivoForm',
    validate
})(EditDispositivoForm);

EditDispositivoForm = connect(
    state => ({
        initialValues: state.dispositivos.selectedDevice
    }),
    {load: selectDevice}
)(EditDispositivoForm)

export default EditDispositivoForm;