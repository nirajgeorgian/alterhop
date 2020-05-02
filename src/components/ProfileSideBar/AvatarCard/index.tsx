import { Avatar, Typography } from 'antd'

import React from 'react'
import { UserOutlined } from '@ant-design/icons'

const { Title } = Typography

const AvatarCard: React.FC = () => (
	<div
		style={{
			display: 'flex',
			flexDirection: 'column',
			padding: '12px 12px',
			justifyContent: 'center',
			alignContent: 'center'
		}}>
		<Avatar size={192} style={{ alignSelf: 'center' }} icon={<UserOutlined />} src="https://picsum.photos/200/200" />
		<Title style={{ color: 'white', alignSelf: 'center', marginBottom: '0', marginTop: '16px' }} level={3}>
			Amit Rawat
		</Title>
		<Title style={{ color: 'grey', alignSelf: 'center', marginTop: '0' }} level={4}>
			Roorkee, Uttarakhand
		</Title>
	</div>
)

export default AvatarCard
