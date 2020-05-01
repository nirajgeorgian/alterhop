import React from 'react';
import { Row, Col, Avatar, Card, Typography, Tag } from 'antd'
const { Text } = Typography;
import {
    HeartFilled
} from '@ant-design/icons';

interface IJob {
    identifier: Number
    employment: String
    salary: ISalary
    skills: String
    place: String
    metadata: IMetaData
    name: String
}

interface IMetaData {
    created_at: Date
    updated_at: Date
    published_date: Date
    end_date: Date;
    last_active: Date;
}

interface ISalary {
    max: Number,
    min: Number
}

const Job: React.FC<any> = ({ item }) => {
    return (
        <Card style={{
            width: "100%",
            borderRadius: "16px",
            background: "#feffff",
            boxShadow: "20px 20px 60px #d8d9d9, -20px -20px 60px #ffffff"
        }}>
            <Row>
                <Col span={5} >
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <img
                            width={64}
                            alt="logo"
                            src={item.hiringOrganization.logo}
                        />
                        <Tag color="green" style={{ marginTop: "16px" }}>94/100</Tag>
                    </div>
                </Col>

                <Col span={18} offset={1}>
                    <Row>
                        {item.hiringOrganization.name}
                        <Tag icon={<HeartFilled />} color="processing" style={{ marginLeft: "8px" }}>
                            New
                        </Tag>
                    </Row>
                    <Row>
                        <Text strong>{item.title}</Text>
                    </Row>
                    <Row>
                        <Col span={14}>
                            <Text type="secondary"> {item.jobLocation.address.addressRegion + item.jobLocation.address.addressLocality}</Text>
                        </Col>
                        <Col span={6} offset={3}>
                            90-100K <Text type="secondary">USD</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={14}>
                            <Tag>C++</Tag>
                            <Tag>JavaScript</Tag>
                            <Tag>React</Tag>
                            <Tag>JS</Tag>
                        </Col>
                        <Col span={6} offset={3}>
                            <Text>{item.datePosted}</Text>
                        </Col>

                    </Row>
                </Col>
            </Row>
        </Card >
    );
}

export default Job;