import { Button, Col, Layout, Modal, Row, Typography } from 'antd'
import React, { useState } from 'react'

import JobForm from '../../form/job/form'
import JobList from './list'
// import style from 'style.module.less'
import { PlusCircleOutlined } from '@ant-design/icons'
import { mutationCreateJob } from 'graph/company/mutatioon'
import { useMutation } from '@apollo/client'
import { withRouter } from 'react-router-dom'

const { Content } = Layout
const { Title } = Typography

const JobPage: React.FC = () => {
	const [visible, setVisible] = useState<boolean>(false)
	const [addJob, { loading, data }] = useMutation(mutationCreateJob)

	const onSubmit = (values: any) => {
		/* eslint-disable no-console */
		console.log(values)
		// addJob({
		// 	variables: {
		// 		input: {
		// 			company: 'xyz',
		// 			...values
		// 		}
		// 	}
		// })
	}

	return (
		<>
			<Content
				className="Job-content"
				style={{
					padding: 24,
					margin: 0,
					minHeight: 280
				}}>
				<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: '20px 0' }}>
					<Title level={3}>JOBS</Title>

					<Button type="primary" icon={<PlusCircleOutlined />} size="large" onClick={() => setVisible(!visible)}>
						Add A Job
					</Button>
				</div>
				<JobList />
				<hr />
			</Content>
			<Modal
				title="Add A Job"
				width={720}
				closable={true}
				visible={visible}
				onCancel={() => setVisible(!visible)}
				destroyOnClose={true}
				footer={null}>
				<JobForm onSubmit={onSubmit} />
			</Modal>
		</>
	)
}

export const Job = withRouter(JobPage)
export default Job
