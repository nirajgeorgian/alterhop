import { Avatar, Button, Card, Col, Form, Input, Layout, List, Radio, Row, Spin, Typography } from 'antd'
import { EditOutlined, PlusOutlined, PlusSquareOutlined, UserOutlined } from '@ant-design/icons'
import React, { ReactNode, useState } from 'react'

import ExperienceCard from 'components/ExperienceCard'
import Loading from 'components/loading'
import ProfileForm from 'app/form/profile/ProfileForm'
import style from './style.module.less'
import { withRouter } from 'react-router-dom'

const { Content } = Layout
const { Title, Paragraph, Text } = Typography

interface ITitleBarProps {
	title: string
	onClick: () => any
	icon: ReactNode
}

const TitleBar: React.FC<ITitleBarProps> = ({ title, onClick, icon }) => (
	<div className={style['title-bar']}>
		<Title className={style['title']} level={2}>
			{' '}
			{title}{' '}
		</Title>
		<Button type="primary" icon={icon} size="large" onClick={onClick} />
	</div>
)

const ProfileBase: React.FC = () => {
	const [disabled, setDisabled] = useState<boolean>(true)
	const { user, isLoading } = {
		user: { picture: 'http://dummy.duck', email: 'dodo@duck', name: 'dummy user' },
		isLoading: false
	}
	const initialValues = {
		first_name: 'Amit',
		last_name: 'Rawat',
		headline: 'Full Stack Developer | MERN',
		current_position: 'Self Employeed',
		education: "Bachelor's Degree",
		address: '342/A Streets',
		city: 'Roorkee',
		pincode: '247667',
		state: 'Uttarakhand',
		country: 'India'
	}

	const onFinish = (e) => {
		/* eslint-disable no-console */
		console.log(e)
		setDisabled((state) => !state)
	}

	return (
		<Loading loading={isLoading || !user}>
			<Content className={style['container']}>
				<Row justify="space-around" className={style['inner-container']}>
					<Col span={12} className={style['profile-container']}>
						<TitleBar title="My Profile" icon={<EditOutlined />} onClick={() => setDisabled((state) => !state)} />
						<ProfileForm disabled={disabled} initialValues={initialValues} onFinish={onFinish} />
					</Col>
					<Col span={11} className={style['experience-container']}>
						<TitleBar title="Experience" icon={<PlusOutlined />} onClick={() => console.log('add experience')} />
						<div className={style['experience-list']}>
							{new Array(3).fill(0).map((value, key) => (
								<ExperienceCard
									key={key}
									companyName="Microsoft"
									location="banglore"
									role="Full Stack"
									startDate="Nov, 2017"
									endDate="july, 2019"
									description="Worked on the creation of dash board app for the management of file system of the servers running."
								/>
							))}
						</div>
					</Col>
				</Row>
			</Content>
		</Loading>
	)
}

export const Profile = withRouter(ProfileBase)
export default Profile
