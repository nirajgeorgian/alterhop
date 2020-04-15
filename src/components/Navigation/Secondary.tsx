import { Layout, Menu } from 'antd'
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons'
import { Link, Route } from 'react-router-dom'
import React from 'react'
import styles from 'components/Navigation/Navigation.module.less'

const { Sider } = Layout

const RootMenu = (props) => (
	<Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
		<Menu.Item key="1">
			<UserOutlined />
			<Link to={`${props.location.pathname}/feeds`} />
		</Menu.Item>
		<Menu.Item key="2">
			<VideoCameraOutlined />
			<span>companies</span>
		</Menu.Item>
		<Menu.Item key="3">
			<UploadOutlined />
			<span>profile</span>
		</Menu.Item>
	</Menu>
)

const ProfileMenu = (props) => (
	<Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
		<Menu.Item key="1">
			<UserOutlined />
			<Link to={`${props.location.pathname}/feeds`}>profile</Link>
		</Menu.Item>
	</Menu>
)

const CompanyMenu = (props) => (
	<Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
		<Menu.Item key="1">
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
