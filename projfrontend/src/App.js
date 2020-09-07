import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './core/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';
import PrivateRoute from './auth/helper/PrivateRoute';
import AdminRoute from './auth/helper/AdminRoute';
import Profile from './user/Profile';
import AdminDashboard from './user/AdminDashboard';
import UserDashboard from './user/UserDashboard';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/sign-up' exact component={Signup} />
        <Route path='/sign-in' exact component={Signin} />
        <PrivateRoute path='/user/dashboard' exact component={UserDashboard} />
        <PrivateRoute path='/user/profile' exact component={Profile} />
        <AdminRoute path='/admin/dashboard' exact component={AdminDashboard} />
        <AdminRoute
          path='/admin/create/category'
          exact
          component={AddCategory}
        />
        <AdminRoute path='/admin/create/product' exact component={AddProduct} />
        {/* <AdminRoute path='/admin/products' exact component={ManageProducts} />
        <AdminRoute path='/admin/orders' exact component={ManageOrders} /> */}
        <Route path='/*' render={() => <h1>404</h1>} />
      </Switch>
    </Router>
  );
};
export default App;
