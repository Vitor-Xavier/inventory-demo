import api from '../../services/api';
import { User } from '../user';

const services = {
    getUsers(skip = 0, take = 10) {
        return api.get('/User', {
            params: {
                skip,
                take
            }
        });
    },
    get(userId: number) {
        return api.get(`/User/${userId}`);
    },
    insert(user: User) {
        return api.post(`/User`, user);
    },
    update(userId: number, user: User) {
        return api.put(`/User/${userId}`, user);
    },
    delete(userId: number) {
        return api.delete(`/User/${userId}`);
    },
}

export default services;