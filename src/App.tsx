import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './infrastructure/routes/private-router';
import { privateRoutes } from './infrastructure/routes';
import { ROUTE_PATH } from './core/common/appRouter';
import LoginPage from './pages/login';
import { PublicRoute } from './infrastructure/routes/public-router';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {privateRoutes.map((page, index) => {
            if (page.private) {
              return (
                <Route
                  key={index}
                  path={page.path}
                  element={
                    <PrivateRoute component={<page.component />} role={page.role} />
                  } />
              )
            }
            else {
              return (
                <Route
                  key={index}
                  path={page.path}
                  element={
                    <page.component />
                  } />
              )
            }
          })}
          <Route path={ROUTE_PATH.LOGIN} element={<PublicRoute component={<LoginPage />} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
