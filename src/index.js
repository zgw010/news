import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header.js'
import New from './components/new.js'
import Login from './components/login.js'
import Register from './components/register.js';
import Publish from './components/publish.js';
import Home from './components/home.js';
import './index.css';
import {BrowserRouter ,Route ,Switch } from 'react-router-dom' // 引入路由
ReactDOM.render(
  <BrowserRouter>
    <div>
      <Header/>
      <Switch>
        <Route path='/login' component={Login}/>
        <Route path='/Register' component={Register}/>
        <Route path='/publish' component={Publish}/>
        <Route path='/news' component={New}/>
        <Route path='/:index' component={New}/>
        <Route path='/' component={Home}/>
        
      </Switch>
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);

