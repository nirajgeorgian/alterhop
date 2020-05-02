/*
 * Created on Thu April 23 2020
 *
 * Secondary navigation for application
 *
 * @author nirajgeorgian@oojob.io (Niraj Georgian)
 *
 * Copyright (c) 2020 - oojob
 */

import { AppstoreOutlined, BookOutlined, MessageOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons'

import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import React from 'react'
import styles from 'app/navigation/style.module.less'

export const RootMenu: React.FC = () => (
	<Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} className={styles.secondary}>
		<Menu.Item key="1" className={styles.hovered}>
			<Link to='/jobs' data-testid="sec-jobs">
				<UserOutlined />
				<span>Jobs</span>
			</Link>
		</Menu.Item>
		<Menu.Item key="2" className={styles.hovered}>
			<Link to="/companies" data-testid="sec-companies">
				<VideoCameraOutlined />
				<span>Companies</span>
			</Link>
		</Menu.Item>
	</Menu>
)

export const ProfileMenu: React.FC = () => (
	<Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} className={styles.secondary}>
		<Menu.Item key="1">
			<Link to="/profile/username" data-testid="sec-profile">
				<UserOutlined />
				<span>My Profile</span>
			</Link>
		</Menu.Item>
		<Menu.Item key="2">
			<Link to="/profile/jobs" data-testid="sec-jobs">
				<AppstoreOutlined />
				<span>Jobs</span>
			</Link>
		</Menu.Item>
		<Menu.Item key="3">
			<Link to="/saved-jobs" data-testid="sec-saved-jobs">
				<BookOutlined />
				<span>Saved Jobs</span>
			</Link>
		</Menu.Item>
		<Menu.Item key="4">
			<Link to="/profile/messages" data-testid="sec-messages">
				<MessageOutlined />
				<span>Messages</span>
			</Link>
		</Menu.Item>
		<Menu.Item key="5">
			<Link to="/profile/interviews" data-testid="sec-interviews">
				<VideoCameraOutlined />
				<span>Interviews</span>
			</Link>
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