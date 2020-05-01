import { AppstoreOutlined, BookOutlined, MessageOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons'

import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import React from 'react'
import styles from 'app/navigation/style.module.less'

export const RootMenu = (props) => (
	<Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} className={styles.secondary}>
		<Menu.Item key="1" className={styles.hovered}>
			<Link to='/jobs'>
				<UserOutlined />
				<span>Jobs</span>
			</Link>
		</Menu.Item>
		<Menu.Item key="2" className={styles.hovered}>
			<VideoCameraOutlined />
			<span>Companies</span>
		</Menu.Item>
		<Menu.Item key="3" className={styles.hovered}>
			<UploadOutlined />
			<span>Root Menu 3</span>
		</Menu.Item>
	</Menu>
)

export const ProfileMenu = () => (
	<Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} className={styles.secondary}>
		<Menu.Item key="1">
			<Link to="/profile/username">
				<UserOutlined />
				<span>My Profile</span>
			</Link>
		</Menu.Item>
		<Menu.Item key="2">
			<AppstoreOutlined />
			<span>Jobs</span>
		</Menu.Item>
		<Menu.Item key="3">
			<BookOutlined />
			<span>Saved Jobs</span>
		</Menu.Item>
		<Menu.Item key="4">
			<Link to="/profile/message">
				<MessageOutlined />
				<span>Messages</span>
			</Link>
		</Menu.Item>
		<Menu.Item key="5">
			<VideoCameraOutlined />
			<span>Interviews</span>
		</Menu.Item>
	</Menu>
)

export const CompanyMenu = (props) => (
	<Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} className={styles.secondary}>
		<Menu.Item key="1" className={styles.hovered}>
			<UserOutlined />
			<Link to={`${props.location.pathname}/feeds`}>companies</Link>

		</Menu.Item>
		<Menu.Item key="1" className={styles.hovered}>
			<UserOutlined />
			<Link to={`${props.location.pathname}/Jobs`}>Jobs</Link>
		</Menu.Item>
	</Menu>
)