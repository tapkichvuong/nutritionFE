import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routes';
import { DefaultLayout } from './Layout';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Layout = route.layout || DefaultLayout;
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                    {privateRoutes.map((route, index) => {
                        const Layout = route.layout || DefaultLayout;
                        const Page = route.component;
                        const auth = route.auth;
                        return (
                            <Route key={index} element={auth}>
                                <Route
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            </Route>
                        );
                    })}
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
