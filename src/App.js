import React from "react";
import { Home, Recipes, About, Admin, NotFound } from "./components/Pages";
import { Header } from "./components/Shared/";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Recipe from "./components/Pages/Recipe/Recipe";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/recipes" component={Recipes} />
        <Route path="/about" component={About} />
        <Route path="/administration" component={Admin} />
        <Route path="/recipe/:id" component={Recipe} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
