import { Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routes';
import { DefaultLayout } from './Layout';
import { PostProvider } from './context/PostProvider';
import PersistLogin from './components/PersistLogin';
function App() {
    return (
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
                <Route element={<PersistLogin />}>
                    {privateRoutes.map((route, index) => {
                        const Layout = route.layout || DefaultLayout;
                        const Page = route.component;
                        const auth = route.auth;

                        return route.title === 'post page' ? (
                            <Route key={index} element={auth}>
                                <Route
                                    path={route.path}
                                    element={
                                        <PostProvider>
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        </PostProvider>
                                    }
                                />
                            </Route>
                        ) : (
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
                </Route>
            </Routes>
        </div>
    );
}

export default App;
