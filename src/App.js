import './App.css';
import { Login, Home, NotFound } from './pages';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { AuthContextProvider } from './context/authContext';
import * as ROUTES from './constants/routes';
import { PrivateRoute, IsUserRedirect } from './helpers/routes';

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <BrowserRouter forceRefresh={true}>
          <Switch>
            <IsUserRedirect exact path={ROUTES.LOGIN} component={Login} />
            <PrivateRoute exact path={ROUTES.BROWSE} component={Home} />
            <Route path="*" component={NotFound} />
          </Switch>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
