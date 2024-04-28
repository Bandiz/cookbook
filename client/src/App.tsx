import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Header, Loading } from './components/Shared';
import * as ROUTES from './constants/routes';
import './App.scss';
import EditCategory from './pages/EditCategory';

const Home = lazy(() => import('./pages/Home'));
const Recipes = lazy(() => import('./pages/Recipes'));
const Recipe = lazy(() => import('./pages/Recipe'));
const Category = lazy(() => import('./pages/Category'));
const Categories = lazy(() => import('./pages/Categories'));
const About = lazy(() => import('./pages/About'));
const Admin = lazy(() => import('./pages/Admin'));
const CreateRecipe = lazy(() => import('./pages/CreateRecipe'));
const Login = lazy(() => import('./pages/Login'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
    return (
        <Router>
            <Header />
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route path={ROUTES.HOME} element={<Home />} />
                    <Route path={ROUTES.RECIPES} element={<Recipes />} />
                    <Route path={ROUTES.CATEGORY} element={<Category />} />
                    <Route path={ROUTES.EDIT_CATEGORY} element={<EditCategory />} />
                    <Route path={ROUTES.CATEGORIES} element={<Categories />} />
                    <Route path={ROUTES.ABOUT} element={<About />} />
                    <Route path={ROUTES.ADMIN} element={<Admin />} />
                    <Route path={ROUTES.RECIPE} element={<Recipe />} />
                    <Route path={ROUTES.CREATE_RECIPE} element={<CreateRecipe />} />
                    <Route path={ROUTES.LOGIN} element={<Login />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;
