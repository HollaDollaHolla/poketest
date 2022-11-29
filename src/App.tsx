import React from 'react';
import { Link, Outlet } from "react-router-dom";
import logo from './logo.svg';
import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>

        <nav className='link-list'>
          <Link to="/" className='link'>Home Page</Link>
          <Link to="/details/1" className='link'>Details Page</Link>
        </nav>

        <Outlet />

      </header>
    </div>
  );
}

export default App;
