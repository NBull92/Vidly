import { Component } from 'react';
import auth from '../services/authService';

class Logout extends Component {    
    render() { 
        return null;
    }

    componentDidMount() {
        auth.logout();
        window.location = "/";
    }
}
 
export default Logout;