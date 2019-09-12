import React from "react";
import NavContainer from './nav/nav_container';
import { Route, Switch, Link } from 'react-router-dom';
import LoginFormContainer from './login/login_form_container';
import SignupFormContainer from './signup/signup_form_container';
import ItemIndexContainer from './items/item_index_container';
import NewItemContainer from './items/new_item_form_container';
import { AuthRoute } from '../util/route_util';


const App = () => (
  <div>
    <header>
      <NavContainer />
    </header>

    <Switch>
      <AuthRoute exact path="/login/" component={ LoginFormContainer }/>
      <AuthRoute exact path="/signup/" component={ SignupFormContainer }/>
      <Route exact path="/items/new/" component={ NewItemContainer }/>
      <Route exact path="/feed/" component={ ItemIndexContainer }/>
    </Switch>
  </div>
);

export default App;