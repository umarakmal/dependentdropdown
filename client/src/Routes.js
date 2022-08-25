import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import Signin from "./auth/Signin";
import AdminRoute from "./auth/AdminRoute";
import PageNotFound from "./component/PageNotFound";
import HomeUser from "./component/user/HomeUser";
import AddUser from "./component/user/AddUser";
import EditUser from "./component/user/EditUser";
import AddRole from "./component/role/AddRole";
import Home from "./component/role/Home";
import Edit from "./component/role/EditRole";
import AddRegion from "./component/location/region/AddRegion";
import AddCity from "./component/location/city/AddCity";
import AddState from "./component/location/state/AddState";
import HomeRegion from "./component/location/region/HomeRegion";
import HomeCity from "./component/location/city/HomeCity";
import HomeState from "./component/location/state/HomeState";
import EditRegion from "./component/location/region/EditRegion";
import EditState from "./component/location/state/EditState";
import EditCity from "./component/location/city/EditCity";
const Routess = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Signin} />
        <Route path="/signin" exact component={Signin} />
        <AdminRoute path="/admin" exact component={App} />
        <AdminRoute path="/addcity" exact component={AddCity} />
        <AdminRoute path="/region" exact component={HomeRegion} />
        <AdminRoute path="/edit/region/:id" exact component={EditRegion} />
        <AdminRoute path="/edit/state/:id" exact component={EditState} />
        <AdminRoute path="/edit/city/:id" exact component={EditCity} />
        <AdminRoute path="/cities" exact component={HomeCity} />
        <AdminRoute path="/states" exact component={HomeState} />
        <AdminRoute path="/addstate" exact component={AddState} />
        <AdminRoute path="/addregion" exact component={AddRegion} />
        <AdminRoute path="/users" exact component={HomeUser} />
        <AdminRoute path="/adduser" exact component={AddUser} />
        <AdminRoute path="/edit/user/:id" exact component={EditUser} />
        <AdminRoute path="/role" exact component={Home} />
        <AdminRoute path="/addrole" exact component={AddRole} />
        <AdminRoute path="/edit/:id" exact component={Edit} />
        <Route path="*" exact component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routess;
