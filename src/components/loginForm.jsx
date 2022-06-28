import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import auth from '../services/authService';
import { Navigate } from 'react-router-dom';
//import { withParams } from "../utils/withParams.jsx";

class LoginForm extends Form {    
    state = {
        data: {username: "", password: ""},
        errors: { }
    }

    schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password'),
    };

    //username = React.createRef();   // only use refs when you reaaaly need to.

    render() { 
        if(auth.getCurrentUser()) 
            return <Navigate replace to="movies" />

        return (
        <div>
            <h1>Login</h1>
            <form onSubmit={this.handleSubmit}>
                {this.renderInput("username","Username")} 
                {this.renderInput("password","Password", 'password')}         
                {this.renderButton('Login')}
            </form>
        </div>);
    }

    doSubmit = async () => {
        try
        {
            const { data } = this.state;
            await auth.login(data.username, data.password);    
            
            window.location =  "/";
        }
        catch(ex)
        {
            if(ex.response && ex.response.status === 400)
            {
                const errors = {...this.state.errors};
                errors.username = ex.response.data;
                this.setState({errors});
            }
        }
    }
}
 
export default LoginForm;
//export default withParams(LoginForm);