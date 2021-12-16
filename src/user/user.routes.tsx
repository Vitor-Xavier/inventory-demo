import { Route } from "react-router-dom";
import UserTable from './components/user.table';

const userRoutes = [
    <Route key="users" path="/users" exact component={UserTable} />,
];

export default userRoutes;