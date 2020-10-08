import React, { Component, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

//Pages and charts
import Plotlychart from './components/Plotlychart'
import Mainpage from './pages/Mainpage';
import Candlestick from './components/Candlestick'
import Forecast from './components/Forecast'
import Multiline from './components/Mulitlineplotly'
import './App.css'

export default function App() {
  return (
    <Router>
      <div>
        <nav className='NavbarItems'>
          <ul className='nav-menu'>
            <li className = 'nav-links'>
              <Link to="/">Frontpage</Link>
            </li>
            <li className = 'nav-links'>
              <Link to="/multiline">Multiline chart</Link>
            </li>
            <li className = 'nav-links'>
              <Link to="/candlestick">Candlestick chart</Link>
            </li>
            <li className = 'nav-links'>
              <Link to="/forecast">Forecast chart</Link>
            </li>
            <li className = 'nav-links'>
              <Link to="/plotly">Plotly chart</Link>
            </li>
          </ul>
        </nav>

        {}
        <Switch>
          <Route path="/multiline">
            <Multiline />
          </Route>
          <Route path="/candlestick">
            <Candlestick />
          </Route>
          <Route path="/forecast">
            <Forecast />
          </Route>
          <Route path="/plotly">
            <Plotlychart />
          </Route>
          <Route path="/">
            <Mainpage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

