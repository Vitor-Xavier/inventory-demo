import api from '../../services/api';
import { Supplier } from '../supplier';

export default {
    getSuppliers(skip = 0, take = 10) {
        return api.get('/Supplier', {
            params: {
                skip,
                take
            }
        });
    },
    get(supplierId: number) {
        return api.get(`/Supplier/${supplierId}`);
    },
    insert(supplier: Supplier) {
        return api.post(`/Supplier`, supplier);
    },
    update(supplierId: number, supplier: Supplier) {
        return api.put(`/Supplier/${supplierId}`, supplier);
    },
    delete(supplierId: number) {
        return api.delete(`/Supplier/${supplierId}`);
    },
}