import { Avatar, Card, Col, Row, Tag, Typography } from 'antd'

import { HeartFilled } from '@ant-design/icons'
import React from 'react'
import moment from 'moment'
import styles from './style.module.less'

const { Text } = Typography

interface IJob {
	identifier: number
	employment: string
	salary: ISalary
	skills: string
	place: string
	metadata: IMetaData
	name: string
}

interface IMetaData {
	created_at: Date
	updated_at: Date
	published_date: Date
	end_date: Date
	last_active: Date
}

interface ISalary {
	max: number
	min: number
}

const jobTags = {
	height: '24px',
	lineHeight: '24px',
	border: 'none'
}

const Job: React.FC<any> = ({ item, active }) => {
	const fromNow = moment(item.datePosted).fromNow()
	const type = fromNow.includes('hours') ? 'warning' : 'secondary'

	return (
		<Card className={styles['list-item']}>
			<div className={styles['left-active']} hidden={!active}>
				<span />
			</div>
			<div className={styles['right-active']} hidden={!active}>
				<span />
			</div>
			<Row justify="start" align="middle">
				<Col span={5}>
					<Row justify="center" align="middle" dir="column">
						<img width={64} alt="logo" src={item.hiringOrganization.logo} />
						<Tag color="green" style={{ ...jobTags, marginTop: '16px', marginLeft: '0px' }}>
							94/100
						</Tag>
					</Row>
				</Col>

				<Col span={18} offset={1}>
					<Row align="middle" dir="row" justify="start">
						<span style={{ fontSize: '1.2em' }}>{item.hiringOrganization.name}</span>
						<Tag icon={<HeartFilled />} style={{ ...jobTags, marginLeft: '8px' }} color="processing">
							New
						</Tag>
					</Row>
					<Row style={{ marginTop: '4px' }}>
						<Text strong style={{ fontSize: '1.2em' }}>
							{item.title}
						</Text>
					</Row>
					<Row justify="space-between" align="top" dir="row" style={{ marginTop: '8px' }}>
						<Text type="secondary" style={{ fontSize: '14px' }}>
							{' '}
							{item.jobLocation.address.addressRegion + item.jobLocation.address.addressLocality}
						</Text>
						<span>
							90-100K <Text type="secondary">USD</Text>
						</span>
					</Row>
					<Row justify="space-between" align="bottom" dir="row" style={{ marginTop: '8px' }}>
						<Row justify="start" dir="row" align="middle">
							<Tag style={jobTags}>C++</Tag>
							<Tag style={jobTags}>JavaScript</Tag>
							<Tag style={jobTags}>React</Tag>
							<Tag style={jobTags}>JS</Tag>
						</Row>
						<Text type={type} style={{ fontSize: 'x-small' }}>
							{fromNow}
						</Text>
					</Row>
				</Col>
			</Row>
		</Card>
	)
}

export default Job
