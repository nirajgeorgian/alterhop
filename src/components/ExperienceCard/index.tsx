import React from 'react'
import { Card, Row, Col, Avatar, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import style from './style.module.less'

const { Title, Paragraph } = Typography

interface IExperienceCardProps {
	logo?: string
	companyName: string
	role: string
	location: string
	startDate: string
	endDate: string
	description: string
}

const ExperienceCard: React.FC<IExperienceCardProps> = ({
	companyName,
	role,
	location,
	startDate,
	endDate,
	description
}) => (
	<Card className={style['card']}>
		<Row className={style['container']}>
			<Col className={style['avatar']} span={6}>
				<Avatar size={128} src="https://picsum.photos/200/200" icon={<UserOutlined />} />
			</Col>
			<Col className={style['content']} span={17}>
				<Row className={style['header']}>
					<Col>
						<Title className={style['role']} level={3}>
							{role}
						</Title>
						<div>
							<Title className={style['company']} level={4}>
								{companyName}
							</Title>
							<span className={style['location']}>{location}</span>
						</div>
					</Col>
					<Col>
						{startDate} - {endDate}
					</Col>
				</Row>
				<Row className={style['description']}>
					<Paragraph>{description}</Paragraph>
				</Row>
			</Col>
		</Row>
	</Card>
)

export default ExperienceCard
