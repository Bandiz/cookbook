import { Layout } from 'antd';
import { lazy, Suspense } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import './App.scss';
import { Header, Loading, RouteGuard } from './components/Shared';
import * as ROUTES from './constants/routes';
import EditCategory from './pages/EditCategory';
import EditRecipe from './pages/EditRecipe';

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
            <Layout>
                <Header />
                <Layout>
                    <Suspense fallback={<Loading />}>
                        <Routes>
                            <Route path={ROUTES.HOME} element={<Home />} />
                            <Route path={ROUTES.RECIPES} element={<Recipes />} />
                            <Route path={ROUTES.CATEGORIES} element={<Categories />} />
                            <Route path={ROUTES.ABOUT} element={<About />} />
                            <Route path={ROUTES.LOGIN} element={<Login />} />
                            <Route path={ROUTES.RECIPE} element={<Recipe />} />
                            <Route path={ROUTES.CATEGORY} element={<Category />} />
                            <Route path={ROUTES.EDIT_CATEGORY} element={<RouteGuard />}>
                                <Route index element={<EditCategory />} />
                            </Route>
                            <Route path={ROUTES.ADMIN} element={<RouteGuard />}>
                                <Route index element={<Admin />} />
                            </Route>
                            <Route path={ROUTES.CREATE_RECIPE} element={<RouteGuard />}>
                                <Route index element={<CreateRecipe />} />
                            </Route>
                            <Route path={ROUTES.EDIT_RECIPE} element={<RouteGuard />}>
                                <Route index element={<EditRecipe />} />
                            </Route>
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Suspense>
                </Layout>
            </Layout>
        </Router>
    );
}

export default App;
