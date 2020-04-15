import React from 'react'
import { Link } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Menu, Layout } from 'antd'
import styles from 'components/Navigation/Navigation.module.less'

const { Sider } = Layout

const Primary = () => (
	<Sider trigger={null} width="100%" className={styles.navigation}>
		<Menu defaultSelectedKeys={['1']} mode="inline" theme="dark">
			<Menu.Item key="1" title="oojob">
				<Link to="/">
					<Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
				</Link>
			</Menu.Item>
			<Menu.Item key="2" title="profile">
				<Link to="/profile">
					<Avatar>P</Avatar>
				</Link>
			</Menu.Item>
			<Menu.Item key="3" title="company">
				<Link to="/company">
					<Avatar>C</Avatar>
				</Link>
			</Menu.Item>
		</Menu>
	</Sider>
)

export default Primary
