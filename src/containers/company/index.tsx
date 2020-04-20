import { Button, Checkbox, Col, Form, Input, Row, Select } from 'antd'

import Loading from 'components/loading'
import React from 'react'
import Search from 'antd/lib/input/Search'
import UploadCompanyPicture from 'containers/company/upload'
import { mutationCreateCompany } from 'graph/company/mutatioon'
import style from 'containers/company/style.module.less'
import { useMutation } from '@apollo/client'

const Company = () => {
	const [addCompany, { loading, data }] = useMutation(mutationCreateCompany)

	const onSubmit = (values: any) => {
		addCompany({
			variables: {
				input: {
					createdBy: "123456789",
					noOfEmployees: {
						"min": 1,
						"max": 4
					},
					...values
				}
			}
		})
	}

	return (
			<Loading loading={loading}>
		<Row>
				<Col span={10} className={style.company}>
					<UploadCompanyPicture />
					<span>upload your company logo</span>
				</Col>
				<Col span={14}>
					<Form name="company" onFinish={onSubmit}>
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
