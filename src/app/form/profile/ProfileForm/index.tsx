import React from 'react'
import style from './style.module.less'
import { Row, Col, Input, Button, Form } from 'antd'

interface IInitialValues {
    first_name: string;
    last_name: string;
    headline: string;
    current_position: string;
    education: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
}

interface IProfileFormProps {
    disabled: boolean;
    initialValues: IInitialValues;
    onFinish: (e: any) => any;
}

const ProfileForm: React.FC<IProfileFormProps> = ({disabled, initialValues, onFinish}) => {

    return (
        <Form
            className={style['profile-form']}
            layout="vertical"
            style={{padding: "8px 0"}}
            // form={form}
            initialValues={{...initialValues}}
            onFinish={onFinish}
        >	
        <Row justify="space-between">
            <Col span={11}>
                <Form.Item label="First Name" name="first_name">
                    <Input size="large" value="Amit" placeholder="input placeholder" disabled={disabled}/>
                </Form.Item>
            </Col>
            <Col span={11}>
                <Form.Item label="Last Name" name="last_name">
                    <Input size="large" value="Rawat" placeholder="input placeholder" disabled={disabled} />
                </Form.Item>						
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Form.Item label="Headline" name="headline">
                    <Input size="large" value="Full Stack Developer | MERN" placeholder="input placeholder" disabled={disabled}/>
                </Form.Item>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Form.Item label="Current Position" name="current_position" >
                    <Input size="large" value="Self Employed" placeholder="input placeholder" disabled={disabled}/>
                </Form.Item>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Form.Item label="Education" name="education" >
                    <Input size="large" value="Bachelor's Degree" placeholder="input placeholder" disabled={disabled}/>
                </Form.Item>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Form.Item label="Address" name="address">
                    <Input size="large" value="342/A streets" placeholder="input placeholder" disabled={disabled}/>
                </Form.Item>
            </Col>
        </Row>
        <Row justify="space-between">
            <Col span={11}>
                <Form.Item label="City" name="city">
                    <Input size="large" value="Roorkee" placeholder="input placeholder" disabled={disabled}/>
                </Form.Item>
            </Col>
            <Col span={11}>
                <Form.Item label="State" name="state">
                    <Input size="large" value="Uttarakhand" placeholder="input placeholder" disabled={disabled} />
                </Form.Item>						
            </Col>
        </Row>
        <Row justify="space-between">
            <Col span={11}>
                <Form.Item label="Pincode" name="pincode">
                    <Input size="large" value="247667" placeholder="input placeholder" disabled={disabled}/>
                </Form.Item>
            </Col>
            <Col span={11}>
                <Form.Item label="Country" name="country">
                    <Input size="large" value="india" placeholder="input placeholder" disabled={disabled}/>
                </Form.Item>						
            </Col>
        </Row>
        <Row>
            {!disabled && <Button type="primary">Update</Button>}
        </Row>
        </Form>
    )
}

export default ProfileForm
