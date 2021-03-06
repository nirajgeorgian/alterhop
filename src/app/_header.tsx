/*
 * Created on Thu April 23 2020
 *
 * Base component for App Composition
 * App => (Header/Body)
 *
 * @author nirajgeorgian@oojob.io (Niraj Georgian)
 *
 * Copyright (c) 2020 - oojob
 */

import { Col, Layout, Row } from 'antd'
import Navigation, { Primary } from 'app/navigation'

import Loading from 'components/loading'
import { PrimaryRoutes } from 'app/routes'
import React from 'react'
import styles from 'app/style.module.less'

const { Sider } = Layout

const AuthenticatedAppNavigation: React.FC = () => {
	const { user } = {
		user: { picture: 'http://dummy.duck', email: 'dodo@duck', name: 'dummy user' }
	}

	return (
		<Sider width="100%" className={styles.navigation} collapsedWidth="0" breakpoint="lg">
			<Row>
				<Navigation>
					<Col span={6} className={styles.menu}>
						<Primary user={user} isAuthenticated={false} />
					</Col>
					<Col span={18}>
						<PrimaryRoutes />
					</Col>
				</Navigation>
			</Row>
		</Sider>
	)
}

const UnauthenticatedAppNavigation: React.FC<{ loading: boolean }> = ({ loading }) => (
	<Sider width="100%" className={styles.navigation} collapsedWidth="0" breakpoint="lg">
		<Row>
			<Navigation>
				<Col span={6} className={styles.menu}>
					<Loading loading={loading}>
						<Primary user={null} isAuthenticated={true} />
					</Loading>
				</Col>
				<Col span={18}>
					<Loading loading={loading}>
						<PrimaryRoutes />
					</Loading>
				</Col>
			</Navigation>
		</Row>
	</Sider>
)

const AppNavigation: React.FC = () => {
	const { isLoading } = { isLoading: false }

	if (isLoading) {
		return <UnauthenticatedAppNavigation loading={Boolean(isLoading)} />
	}

	return <AuthenticatedAppNavigation />
}

export default AppNavigation
