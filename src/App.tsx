import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './infrastructure/routes/private-router';
import { privateRoutes } from './infrastructure/routes';

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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
