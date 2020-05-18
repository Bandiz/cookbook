import React from 'react';
import logo from '../../../logo.svg';
import Button from 'react-bootstrap/Button';
import HeaderNav from './HeaderNav/HeaderNav';

function Header() {

    return (
        <header className="App-header">
            <HeaderNav />
            <Button variant="primary">Primary</Button>
            
            <img src={logo} className="App-logo" alt="logo" />
            <p>
                Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
                Learn React
            </a>
        </header>
    )
}

export default Header;