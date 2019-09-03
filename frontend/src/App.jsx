import React from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';

import ConfirmEmail from './ConfirmEmail';
import Dashboard from './Dashboard';
import SignIn from './SignIn';
import SignUp from './SignUp';

import './App.css';
import { login, logout, describeAccount } from './api';

const AuthRoutes = (
  <HashRouter>
    <Switch>
      <Route path='/signin' component={SignIn}/>
      <Route path='/signup' component={SignUp}/>
      <Route
        path='/register/:registrationKey'
        component={({ match: { params: { registrationKey }}}) => (
          <ConfirmEmail registrationKey={registrationKey}/>
        )}
      />
      <Route path='/reset_password' component={SignIn}/>
      <Route path='/reset/:uid/:token/' component={SignIn}/>
      <Redirect to='/signin' />
    </Switch>
  </HashRouter>
);

const AdminRoutes = (
  <HashRouter>
    <Switch>
      <Route path='/dashboard' component={Dashboard}/>
      <Route path='/contacts' component={Dashboard}/>
      <Redirect to='/dashboard' />
    </Switch>
  </HashRouter>
);

function App() {
  const [isAccountLoading, setIsAccountLoading] = React.useState(true);
  const [account, setAccount] = React.useState({});

  async function loadAccount() {
    setIsAccountLoading(true);
    try {
      const { data = {} } = await describeAccount();
      setAccount(data);
    } catch (err) {
      console.log(err.response);
    } finally {
      setIsAccountLoading(false);
    }
  }

  React.useEffect(() => {
    loadAccount();
  }, []);

  if (isAccountLoading) {
    return null;
  }

  if (!account.username) {
    return AuthRoutes;
  }

  return AdminRoutes;
}

export default App;
