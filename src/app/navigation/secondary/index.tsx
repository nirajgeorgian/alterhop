/*
 * Created on Thu April 23 2020
 *
 * Secondary navigation for application
 *
 * @author nirajgeorgian@oojob.io (Niraj Georgian)
 *
 * Copyright (c) 2020 - oojob
 */

import { AppstoreOutlined, BookOutlined, MessageOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons'

import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import React from 'react'
import styles from 'app/navigation/style.module.less'
import AvatarCard from 'components/avatar-card'

export const RootMenu: React.FC = () => (
	<Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} className={styles.secondary}>
		<Menu.Item key="1" className={styles['menu-item']}>
			<Link to="/jobs" data-testid="sec-jobs">
				<UserOutlined />
				<span>Jobs</span>
			</Link>
		</Menu.Item>
		<Menu.Item key="2" className={styles['menu-item']}>
			<Link to="/companies" data-testid="sec-companies">
				<VideoCameraOutlined />
				<span>Companies</span>
			</Link>
		</Menu.Item>
	</Menu>
)

export const ProfileMenu: React.FC = () => (
	<>
		<AvatarCard />
		<Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} className={styles.secondary}>
			<Menu.Item key="1" className={styles['menu-item']}>
				<Link to="/profile/username" className={styles['menu-link']} data-testid="sec-profile">
					<UserOutlined className={styles['menu-icon']} />
					<span className={styles['menu-name']}>My Profile</span>
				</Link>
			</Menu.Item>
			<Menu.Item key="2" className={styles['menu-item']}>
				<Link to="/profile/jobs" className={styles['menu-link']} data-testid="sec-jobs">
					<AppstoreOutlined className={styles['menu-icon']} />
					<span className={styles['menu-name']}>Jobs</span>
				</Link>
			</Menu.Item>
			<Menu.Item key="3" className={styles['menu-item']}>
				<Link to="/saved-jobs" className={styles['menu-link']} data-testid="sec-saved-jobs">
					<BookOutlined className={styles['menu-icon']} />
					<span className={styles['menu-name']}>Saved Jobs</span>
				</Link>
			</Menu.Item>
			<Menu.Item key="4" className={styles['menu-item']}>
				<Link to="/profile/messages" className={styles['menu-link']} data-testid="sec-messages">
					<MessageOutlined className={styles['menu-icon']} />
					<span className={styles['menu-name']}>Messages</span>
				</Link>
			</Menu.Item>
			<Menu.Item key="5" className={styles['menu-item']}>
				<Link to="/profile/interviews" className={styles['menu-link']} data-testid="sec-interviews">
					<VideoCameraOutlined className={styles['menu-icon']} />
					<span className={styles['menu-name']}>Interviews</span>
				</Link>
			</Menu.Item>
		</Menu>
	</>
)

export const CompanyMenu = (props) => (
	<Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} className={styles.secondary}>
		<Menu.Item key="1" className={styles['menu-item']}>
			<UserOutlined />
			<Link to={`${props.location.pathname}/feeds`}>companies</Link>
		</Menu.Item>
		<Menu.Item key="1" className={styles['menu-item']}>
			<UserOutlined />
			<Link to={`${props.location.pathname}/Jobs`}>Jobs</Link>
		</Menu.Item>
	</Menu>
)
