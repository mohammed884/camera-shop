import {BrowserRouter as Router , Route , Redirect, useHistory} from 'react-router-dom';
import React, {useEffect , useState} from 'react'

//Style
import './style/main.css'

//components
import Header from './components/header';
import About from './components/About';
import Home from './components/home'
import Panel from './components/panel';
import AddProduct from './components/add_product';
import Products from './components/products';
import Login from './components/login';
import Register from './components/register';
import Account from './components/account';
import Product from './components/product';

const Main =  () =>
{

  return (
    <div>
      <Router>
          <Header/> 

          <Route path='/' exact ><Redirect to="/home"/></Route>

          <Route path='/home' exact component={Home}/>

          <Route path='/about' exact component={About}/> 

          <Route path='/products' exact component={Products}/> 

          <Route path="/admin/products/add" exact component={AddProduct}/>

          <Route path="/products/:id" exact component={Product}/>
          <Route path="/admin/panel" exact component={Panel}/>
          
          <Route path="/login" exact component={Login}/>
          
          <Route path="/register" component={Register}/>

          <Route path="/account" exact component={Account}/>

      </Router>
    </div>
  );
}

export default Main;
                                                                                                                                
