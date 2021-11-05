import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Header, Loading } from './components/Shared';
import * as ROUTES from './constants/routes';
import './App.scss';

const Home = lazy(() => import('./pages/Home'));
const Recipes = lazy(() => import('./pages/Recipes'));
const Recipe = lazy(() => import('./pages/Recipe'));
const Category = lazy(() => import('./pages/Category'));
const About = lazy(() => import('./pages/About'));
const Admin = lazy(() => import('./pages/Admin'));
const CreateRecipe = lazy(() => import('./pages/CreateRecipe'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
    return (
        <Router>
            <Header />
            <Suspense fallback={<Loading />}>
                <Switch>
                    <Route exact path={ROUTES.HOME} component={Home} />
                    <Route path={ROUTES.RECIPES} component={Recipes} />
                    <Route path={ROUTES.CATEGORY} component={Category} />
                    <Route path={ROUTES.ABOUT} component={About} />
                    <Route path={ROUTES.ADMIN} component={Admin} />
                    <Route path={ROUTES.RECIPE} component={Recipe} />
                    <Route path={ROUTES.CREATE_RECIPE} component={CreateRecipe} />
                    <Route component={NotFound} />
                </Switch>
            </Suspense>
        </Router>
    );
}

export default App;
