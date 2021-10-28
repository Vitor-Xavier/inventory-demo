import api from '../../services/api'
import { Product } from '../product';


const services = {
    getProducts(skip = 0, take = 10) {
        return api.get('/Product', {
            params: {
                skip,
                take
            }
        });
    },
    get(productId: number) {
        return api.get(`/Product/${productId}`);
    },
    insert(product: Product) {
        return api.post(`/Product/`, product);
    },
    update(productId: number, product: Product) {
        return api.put(`/Product/${productId}`, product);
    },
    delete(productId: number) {
        return api.delete(`/Product/${productId}`);
    },
}

export default services;