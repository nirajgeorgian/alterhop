import { CompanyMenu, ProfileMenu, RootMenu } from 'components/navigation/secondary'
import { Route, Switch } from 'react-router-dom'

import PrivateRoute from 'app/routes/private'
import Profile from 'app/pages/profile/page'
import React from 'react'

export const ProfileRoutes: React.FC = () =>
  <Switch>
    <Route path="/profile/feed" component={Profile} />
  </Switch>

export const SecondaryRoutes: React.FC = () =>
  <>
    <Route path="/" exact component={RootMenu} />
    <PrivateRoute path="/profile" component={ProfileMenu} />
    <PrivateRoute path="/companies" component={CompanyMenu} />
  </>