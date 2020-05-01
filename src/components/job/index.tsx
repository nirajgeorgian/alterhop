import { Avatar, Card, Col, Row, Tag, Typography } from 'antd'

import {
    HeartFilled
} from '@ant-design/icons';
import React from 'react';
import styles from './style.module.less'

const { Text } = Typography;
console.log(styles)



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

const jobTags = {
    height: "24px",
    lineHeight: "24px",
    border: "none"
}

const Job: React.FC<any> = ({ item, active }) => {
    return (
        <Card className={styles['list-item']} >
            <div className="left-active" hidden={!active} style={{
                display: "flex",
                position: "absolute",
                left: "0",
                top: "0",
                alignItems: "center",
                height: "100%"
            }}>
                <span style={{
                    height: "60%",
                    width: "4px",
                    background: "blue",
                    borderTopRightRadius: "20px",
                    borderBottomRightRadius: "20px"
                }} />
            </div>
            <div className="right-active" hidden={!active} style={{
                display: "flex",
                position: "absolute",
                right: "0",
                top: "0",
                alignItems: "center",
                height: "100%"
            }}>
                <span style={{
                    height: "60%",
                    width: "4px",
                    background: "blue",
                    borderTopLeftRadius: "20px",
                    borderBottomLeftRadius: "20px"
                }} />
            </div>
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
                        <Tag color="green" style={{ ...jobTags, marginTop: "16px", marginLeft: "0px" }}>94/100</Tag>
                    </div>
                </Col>

                <Col span={18} offset={1}>
                    <Row>
                        <span style={{ fontSize: "18px" }}>
                            {item.hiringOrganization.name}
                        </span>
                        <Row style={{ alignItems: "center" }}>
                            <Tag icon={<HeartFilled />} style={{ ...jobTags, marginLeft: "8px", }} color="processing">
                                New
                        </Tag>
                        </Row>
                    </Row>
                    <Row style={{ marginTop: "4px" }}>
                        <Text strong style={{ fontSize: "18px" }}>{item.title}</Text>
                    </Row>
                    <Row>
                        <Col span={14}>
                            <Text type="secondary" style={{ fontSize: "14px", marginTop: "8px" }}> {item.jobLocation.address.addressRegion + item.jobLocation.address.addressLocality}</Text>
                        </Col>
                        <Col span={6} offset={3}>
                            90-100K <Text type="secondary">USD</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={14}>
                            <Tag style={jobTags}>C++</Tag>
                            <Tag style={jobTags}>JavaScript</Tag>
                            <Tag style={jobTags}>React</Tag>
                            <Tag style={jobTags}>JS</Tag>
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