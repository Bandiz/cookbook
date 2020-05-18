import React from 'react';
import { Home, Recipes, About, Admin, NotFound } from './components/Pages';
import { Header } from './components/Shared';
import { Route, Switch } from 'react-router-dom';
import './App.css';

function App() {
  
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/recipes" component={Recipes} />
        <Route path="/about" component={About} />
        <Route path="/administration" component={Admin} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
