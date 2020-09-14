import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Home} from './components/Home'
import {Department} from './components/Department'
import {Employees} from './components/Employees'
import {Navigation} from './components/Navigation'

import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {NavLink} from 'react-bootstrap';

function App() {
  return (
    <BrowserRouter>
    <div className="container">
      <h3 className="m-3 d-flex justify-content-center">
        Employee management portal
      </h3>
      <Navigation/>
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/department' component={Department} />
        <Route path='/employee' component={Employees} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
