import React from 'react';
import {Field, reduxForm} from 'redux-form';
const validate = values => {
    const errors = {}
    if(!values.username){
        errors.username = "Debes ingresar un nombre de usuario";
    }
    if(!values.password){
        errors.password = "Debes ingresar una contraseña";
    }

    return errors;
}

const renderField = ({
        input,
        label,
        type,
        meta: { touched, error, warning }
    }) => (
    <div>
      <div
        style={{maxWidth:"300px", margin:"0 auto", opacity: "0.5"}}
      >
        <input {...input} placeholder={label} type={type} className="form-control" />
        <br/>
        {touched &&
          ((error && <span style={{color: "white"}}>{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    </div>
  )

const LoginForm = (props) => {
    
    const {handleSubmit} = props;
    return (
        <form 
            onSubmit={handleSubmit}
        >
            <div
                className="form-group"
            >
                <Field
                    name="username"
                    type="text"
                    component={renderField}
                    label="Ingrese Usuario"
                />
                <br/>
                <Field
                    name="password"
                    type="password"
                    component={renderField}
                    label="Ingrese Contraseña"
                    
                />
            </div>
            <br /><br />
            <div>
                <button 
                    type="submit"
                    className="mt-2 btn btn-block btn-primary"
                >
                INGRESAR
                </button>
            </div>
        </form>
    );
}

export default reduxForm({
    form: 'loginForm',
    validate
})(LoginForm);