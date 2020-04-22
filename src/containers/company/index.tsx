import { Button, Checkbox, Col, Form, Input, Row, Select } from 'antd'

import Loading from 'components/loading'
import EmployeeRange from 'components/EmployeeRange'
import React from 'react'
import Search from 'antd/lib/input/Search'
import UploadCompanyPicture from 'containers/company/upload'
import { mutationCreateCompany } from 'graph/company/mutatioon'
import style from 'containers/company/style.module.less'
import { useMutation } from '@apollo/client'

const Company = () => {
	const [addCompany, { loading, data }] = useMutation(mutationCreateCompany)

	const onSubmit = (values: any) => {
		console.log(values)
		addCompany({
			variables: {
				input: {
					createdBy: '123456789',
					...values
				}
			}
		})
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
		<Loading loading={loading}>
			<Row>
				<Col span={10} className={style.company}>
					<UploadCompanyPicture />
					<span>upload your company logo</span>
				</Col>
				<Col span={14}>
					<Form
						name="company"
						onFinish={onSubmit}
						initialValues={{
							noOfEmployees: {
								min: 0,
								max: 0
							}
						}}>
						<Form.Item name="name">
							<Input placeholder="Company Name" />
						</Form.Item>
						<Form.Item name="description">
							<Input.TextArea rows={4} placeholder="Enter description for your company" />
						</Form.Item>
						<Form.Item name="url">
							<Input type="url" defaultValue="mysite.com" />
						</Form.Item>
						<Form.Item name="skills">
							<Select mode="tags" style={{ width: '100%' }} placeholder="Skills your company demand ?">
								{[]}
							</Select>
						</Form.Item>
						<Form.Item name="noOfEmployees" label="No. of Employees" rules={[{ validator: validateRange }]}>
							<EmployeeRange />
						</Form.Item>
						<Form.Item name="hiringStatus" valuePropName="checked">
							<Checkbox>Hiring Status</Checkbox>
						</Form.Item>
						<Form.Item name="location">
							<Search placeholder="company Location. ex: Bangalore" loading />
						</Form.Item>
						<Form.Item>
							<Button type="primary" htmlType="submit">
								Create
							</Button>
						</Form.Item>
					</Form>
				</Col>
			</Row>
		</Loading>
	)
}

export default Company
