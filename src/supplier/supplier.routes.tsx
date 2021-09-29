import { Route } from "react-router-dom";
import SupplierTable from './components/supplier.table';
import SupplierEdit from './container/supplier.edit';
import SupplierNew from './container/supplier.new';

const supplierRoutes = [
    <Route key="suppliers" path="/suppliers" exact component={SupplierTable} />,
    <Route key="suppliers-new" path="/suppliers/new" exact component={SupplierNew} />,
    <Route key="suppliers-edit" path="/suppliers/edit/:id" exact component={SupplierEdit} />
];

export default supplierRoutes;