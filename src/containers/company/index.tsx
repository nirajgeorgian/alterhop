import { Button, Checkbox, Col, Form, Input, Row, Select } from 'antd'
import React, { Component } from 'react'

import Search from 'antd/lib/input/Search'
import UploadCompanyPicture from 'containers/company/upload'
import style from 'containers/company/style.module.less'

const { Option } = Select
class Company extends Component {
	render = () => {
		const urlBefore = (
			<Select defaultValue="http://" className="select-before">
				<Option value="http://">http://</Option>
				<Option value="https://">https://</Option>
			</Select>
		)

		return (
			<Row>
				<Col span={10} className={style.company}>
					<UploadCompanyPicture />
					<span>upload your company logo</span>
				</Col>
				<Col span={14}>
					<Form>
						<Form.Item name="name">
							<Input placeholder="Company Name" />
						</Form.Item>
						<Form.Item name="description">
							<Input.TextArea rows={4} placeholder="Enter description for your company" />
						</Form.Item>
						<Form.Item name="url">
							<Input addonBefore={urlBefore} defaultValue="mysite.com" />
						</Form.Item>
						<Form.Item name="skills">
							<Select mode="tags" style={{ width: '100%' }} placeholder="Skills your company demand ?">
								{[]}
							</Select>
						</Form.Item>
						<Form.Item name="hiringStatus">
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
		)
	}
}

export default Company
