import api from '../../services/api';
import { Login } from '../login';

const services = {
    authenticate(login: Login) {
        return api.post(`/User/Authenticate`, login);
    },
}

export default services;