import { CompanyMenu, ProfileMenu, RootMenu } from 'app/navigation'
import { Route, Switch } from 'react-router-dom'

import Job from 'app/pages/job/page'
import Payment from 'app/pages/payment/page'
import PrivateRoute from 'app/routes/private'
import Profile from 'app/pages/profile/page'
import React from 'react'
import Test from 'app/pages/test/page'
import style from 'app/style.module.less'

export const PrimaryRoutes: React.FC = () =>
  <div className={style.routes}>
    <Switch>
      <Route path="/" exact component={RootMenu} />
      <PrivateRoute path="/profile" component={ProfileMenu} />
      <Route path="/company" component={CompanyMenu} />
    </Switch>
  </div>


export const SecondaryRoutes: React.FC = () =>
  <div className={style.routes}>
    <Switch>
      <Route path="/" exact component={Test} />
      <Route path="/profile/feed" component={Profile} />
      <Route path="/company/jobs" component={Job} />
      <Route path="/profile/payment" component={Payment} />
    </Switch>
  </div>
