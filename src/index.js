import React from 'react'; //librerias ruteo
import ReactDOM from 'react-dom'; //librerías ruteo
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'; // Archivo CSS de Bootstrap 4 
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'; // Archivo Javascript de Bootstrap 4 
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Home from './componentes/home/HomeLogic';
import Game from './componentes/game/GameLogic';
import "bootstrap/dist/css/bootstrap.min.css";


ReactDOM.render( //ruteo
  <BrowserRouter> 
    <Switch>
      <Route  path="/Home/:Game/:user/:category/:difficult">
        <Game/>
      </Route>
        
      <Route exact path="/" component={Home}/> {/* principal */}
    </Switch>
  </BrowserRouter>,
   document.getElementById('root')
);


reportWebVitals();
