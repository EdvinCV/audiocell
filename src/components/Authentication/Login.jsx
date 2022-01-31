import React, {useEffect} from 'react';
import LoginForm from './LoginForm';
import {useDispatch, useSelector} from 'react-redux';
import { loginUser } from '../Redux/actions/loginActions';
import {useHistory} from 'react-router-dom';
import './login.css';

const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogin = (values) => {
        dispatch(loginUser(values));   
    }

    const authenticated = useSelector((state) => state.authentication.authenticated);

    useEffect(() => {
        if(authenticated){
            history.push('/home');
        }
    }, [authenticated, history]);

    return (
        <div className="log-container">
            <div className="log-card">
                <div className="card-login" style={{display: "flex", flexDirection: "column", alignContent: "center"}}>
                    <div>
                        <img className="card-img-top" src="icons/logo" alt="AudioCell-El sonido es tu voz" style={{width:"300px"}}/>
                    </div>
                    <div className="card-body">
                        <LoginForm
                            onSubmit={handleLogin}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;