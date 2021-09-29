import { Route } from "react-router-dom";
import ProductsTable from './components/product.table';
import ProductEdit from './container/product.edit';
import ProductNew from './container/product.new';

const productRoutes = [
    <Route key="products" path="/products" exact component={ProductsTable} />,
    <Route key="products-new" path="/products/new" exact component={ProductNew} />,
    <Route key="products-edit" path="/products/edit/:id" exact component={ProductEdit} />
];

export default productRoutes;