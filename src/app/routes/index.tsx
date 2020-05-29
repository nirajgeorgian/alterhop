/*
 * Created on Thu April 23 2020
 *
 * App Routes responsible for making routes in entire app
 *
 * @author nirajgeorgian@oojob.io (Niraj Georgian)
 *
 * Copyright (c) 2020 - oojob
 */

import { CompanyMenu, ProfileMenu, RootMenu } from 'app/navigation'
import { Route, Switch } from 'react-router-dom'

import ErrorPage from 'app/pages/error'
import Message from 'app/pages/message'
import Payment from 'app/pages/payment/page'
import Peer from 'app/pages/peer/page'
import Report from 'app/pages/report/report'
import Profile from 'app/pages/profile/page'
import React from 'react'
import Test from 'app/pages/test/page'
import style from 'app/style.module.less'

export const PrimaryRoutes: React.FC = () => (
	<div className={style.routes}>
		<Switch>
			<Route path="/profile" component={ProfileMenu} />
			<Route path="/college" component={CompanyMenu} />
			<Route path="/" component={RootMenu} />
			<Route path="*" component={ErrorPage} />
		</Switch>
	</div>
)

export const SecondaryRoutes: React.FC = () => (
	<div className={style.routes}>
		<Switch>
			<Route path="/peer" exact component={Peer} />
			<Route path="/test" exact component={Test} />
			<Route path="/report" exact component={Report} />
			<Route path="/profile/messages" exact component={Message} />
			<Route path="/profile/username" exact component={Profile} />
			<Route path="/colleges/branch" component={Test} />
			<Route path="/profile/payment" component={Payment} />
		</Switch>
	</div>
)
