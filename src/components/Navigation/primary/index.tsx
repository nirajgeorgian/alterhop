import { Avatar, Button, Layout, Menu, Modal } from 'antd'
import React, { useState } from 'react'

import Company from 'containers/company'
import { Link } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import styles from 'components/navigation/style.module.less'

const { Sider } = Layout

const Primary = () => {
	const [selectedMenu, changeSelectedMenu] = useState<string>('1')
	const [visible, setVisible] = useState<boolean>(false)
	const isSelectedMenu = (menuKey: string) => (selectedMenu === menuKey ? styles.selected : '')

	return (
		<Sider trigger={null} width="100%" className={styles.navigation}>
			<Menu defaultSelectedKeys={['1']} mode="inline" theme="dark" className={`${styles.primary}`}>
				<Menu.Item key="1" title="oojob" className={isSelectedMenu('1')} onClick={({ key }) => changeSelectedMenu(key)}>
					<Link to="/">
						<Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
					</Link>
				</Menu.Item>
				<Menu.Item
					key="2"
					title="profile"
					className={isSelectedMenu('2')}
					onClick={({ key }) => changeSelectedMenu(key)}>
					<Link to="/profile">
						<Avatar>P</Avatar>
					</Link>
				</Menu.Item>
				<Menu.Item
					key="3"
					title="company"
					className={isSelectedMenu('3')}
					onClick={({ key }) => changeSelectedMenu(key)}>
					<Link to="/company">
						<Avatar>C</Avatar>
					</Link>
				</Menu.Item>
				<Menu.Item key="4" title="Add A Company">
					<Button type="primary" shape="circle" onClick={() => setVisible(!visible)}>
						+
					</Button>
				</Menu.Item>
			</Menu>
			<Modal
				title="create company"
				width={720}
				closable={false}
				visible={visible}
				onCancel={() => setVisible(!visible)}
				footer={null}>
					<Company />
			</Modal>
		</Sider>
	)
}

export default Primary
