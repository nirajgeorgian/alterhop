import { Layout, Menu } from 'antd'
import { Link, Route } from 'react-router-dom'
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons'

import React from 'react'
import styles from 'components/navigation/style.module.less'

const { Sider } = Layout

const RootMenu = (props) => (
	<Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} className={styles.secondary}>
		<Menu.Item key="1" className={styles.hovered}>
			<Link to={`${props.location.pathname}/feeds`}>
			<UserOutlined />
			<span>profile</span>
			</Link>
		</Menu.Item>
		<Menu.Item key="2" className={styles.hovered}>
			<VideoCameraOutlined />
			<span>companies</span>
		</Menu.Item>
		<Menu.Item key="3" className={styles.hovered}>
			<UploadOutlined />
			<span>profile</span>
		</Menu.Item>
	</Menu>
)

const ProfileMenu = (props) => (
	<Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} className={styles.secondary}>
		<Menu.Item key="1" className={styles.hovered}>
			<UserOutlined />
			<Link to={`${props.location.pathname}/feeds`}>profile</Link>
		</Menu.Item>
	</Menu>
)

const CompanyMenu = (props) => (
	<Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} className={styles.secondary}>
		<Menu.Item key="1" className={styles.hovered}>
			<UserOutlined />
			<Link to={`${props.location.pathname}/feeds`}>companies</Link>
		</Menu.Item>
	</Menu>
)

const Secondary: React.FC = (props) => (
	<Sider trigger={null} width="100%" className={styles.navigation}>
		<Route path="/" component={RootMenu} />
		<Route path="/profile" component={ProfileMenu} />
		<Route path="/ccompanies" component={CompanyMenu} />
	</Sider>
)

export default Secondary
