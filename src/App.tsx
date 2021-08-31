import {
  Recipes,
  Recipe,
  About,
  Admin,
  NotFound,
  Category,
  Home,
} from "./pages";
import { Header } from "./components/Shared";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/recipes" component={Recipes} />
        <Route path="/category/:category" component={Category} />
        <Route path="/about" component={About} />
        <Route path="/admin" component={Admin} />
        <Route path="/recipe/:id" component={Recipe} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
