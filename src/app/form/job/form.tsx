import { Button, Checkbox, Col, Form, Input, Row, Select, Upload } from 'antd'
import React, { useState } from 'react'

import Range from 'components/range'
import SalaryInput from 'components/SalaryInput'
import { UploadOutlined } from '@ant-design/icons'

const { Option } = Select
const { Search } = Input

interface IFormProps {
	onSubmit: (values: any) => void
}

const JobForm: React.FC<IFormProps> = ({ onSubmit }) => {
	const checkSalary = (rule, salary) => {
		if (salary.value > 0) {
			return Promise.resolve()
		}

		return Promise.reject('Price must be greater than zero!')
	}

	const validateRange = (rule, value) => {
		if (!(value.min > 0)) {
			return Promise.reject('Min value must be greater than zero!')
		}
		if (!(value.max > 0)) {
			return Promise.reject('Max values must be greater than zero!')
		}
		if (value.min >= value.max) {
			return Promise.reject('Max value must be greater than Min value')
		}

		return Promise.resolve()
	}

	return (
		<Form
			name="job"
			onFinish={onSubmit}
			initialValues={{
				sallary_max: {
					value: 0,
					currency: 'INR'
				},
				sallary: {
					max: 0,
					min: 0
				},
				status: 'ACTIVE',
				type: 'DEFAULT'
			}}>
			<Form.Item name="name">
				<Input placeholder="Job Name" />
			</Form.Item>
			<Form.Item name="desc">
				<Input.TextArea rows={4} placeholder="Enter Description" />
			</Form.Item>
			<Form.Item name="category">
				<Select mode="tags" style={{ width: '100%' }} placeholder="Enter Categories">
					{[]}
				</Select>
			</Form.Item>
			<Form.Item name="skills_required">
				<Select mode="tags" style={{ width: '100%' }} placeholder="Skills Required">
					{[]}
				</Select>
			</Form.Item>
			<Row>
				<Col span={11}>
					<Form.Item name="sallary" label="Salary Range" rules={[{ validator: validateRange }]}>
						<Range />
					</Form.Item>
				</Col>
				<Col span={11} offset={2}>
					<Form.Item name="type" label="Job Type" style={{ padding: '0 2px' }}>
						<Select style={{ width: '100%' }}>
							<Option value="DEFAULT">Default</Option>
							<Option value="FEATURED">Featured</Option>
							<Option value="PREMIUM">Premium</Option>
						</Select>
					</Form.Item>
				</Col>
			</Row>
			<Row>
				<Col span={11}>
					<Form.Item name="sallary_max" label="Salary" rules={[{ validator: checkSalary }]}>
						<SalaryInput />
					</Form.Item>
				</Col>
				<Col span={11} offset={2}>
					<Form.Item name="status" label="Status">
						<Select style={{ width: '100%' }}>
							<Option value="ACTIVE">Active</Option>
							<Option value="HOLD">Hold</Option>
							<Option value="EXPIRED">Expired</Option>
						</Select>
					</Form.Item>
				</Col>
			</Row>
			<Form.Item name="location">
				<Search placeholder="company Location. ex: Bangalore" loading />
			</Form.Item>
			<Form.Item name="attachment" label="Attachments">
				<Upload>
					<Button>
						<UploadOutlined /> Click to Upload
					</Button>
				</Upload>
			</Form.Item>

			<Form.Item>
				<Button type="primary" htmlType="submit">
					Create
				</Button>
			</Form.Item>
		</Form>
	)
}

export default JobForm
