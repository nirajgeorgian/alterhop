/*
 * Created on Thu April 23 2020
 *
 * Primary navigation for application
 *
 * @author nirajgeorgian@oojob.io (Niraj Georgian)
 *
 * Copyright (c) 2020 - alterhop
 */

import { Avatar, Button, Layout, Menu } from 'antd'
import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import styles from 'app/navigation/style.module.less'

const { Sider } = Layout

const Primary: React.FC<any> = ({ user }) => {
	const [selectedMenu, changeSelectedMenu] = useState<string>('1')
	const [visible, setVisible] = useState<boolean>(false)
	const isSelectedMenu = (menuKey: string) => (selectedMenu === menuKey ? styles.selected : '')

	return (
		<Sider trigger={null} width="100%" className={styles.navigation}>
			<Menu defaultSelectedKeys={['1']} mode="inline" theme="dark" className={`${styles.primary}`}>
				<Menu.Item key="1" title="oojob" className={isSelectedMenu('1')} onClick={({ key }) => changeSelectedMenu(key)}>
					<Link to="/" data-testid="home">
						<Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
					</Link>
				</Menu.Item>
				<Menu.Item
					key="2"
					title="profile"
					className={isSelectedMenu('2')}
					onClick={({ key }) => changeSelectedMenu(key)}>
					<Link to="/profile" data-testid="profile">
						<Avatar>P</Avatar>
					</Link>
				</Menu.Item>
				<Menu.Item key="4" title="Add A Company">
					<Button type="primary" shape="circle" onClick={() => setVisible(!visible)}>
						+
					</Button>
				</Menu.Item>
			</Menu>
		</Sider>
	)
}

export default Primary
