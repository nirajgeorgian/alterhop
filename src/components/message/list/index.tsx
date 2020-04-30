import { Avatar, Card, Col, Row, Typography } from 'antd';
import moment, { Moment } from 'moment'

import React from 'react'
import { UserOutlined } from '@ant-design/icons';
import style from 'components/message/style.module.less'

const { Text, Title, Paragraph } = Typography;

interface IUserMessageProps {
  picture: string
  name: string
  job: string
  time: Moment
  summary: string
  read: boolean
  isActive: boolean
}
const MessageCard: React.FC<IUserMessageProps> = ({ summary, time, job, name, isActive }) => {
  const UserTitle = () =>
    <>
      <Row className="primary">
        <Col span={4} className={style.avatar}>
          <Avatar size="large" icon={<UserOutlined />} />
        </Col>
        <Col span={20}>
          <Row className={style.profile}>
            <Col>
              <Title className={style.title} level={4}>{name}</Title>
            </Col>
            <Col>
              <small>{moment().fromNow()}</small>
            </Col>
          </Row>
          <Paragraph>applied for <Text strong>a very long position</Text></Paragraph>
        </Col>
      </Row>
      <Paragraph>{summary}</Paragraph>
    </>

  return (
    <div className={style['message-card']}>
      <Card
        loading={false}
        bordered={false}
        bodyStyle={{ padding: '1rem' }}
        className={`${style.card} ${isActive ? style.active : ''}`}>
        <UserTitle />
      </Card>
      <hr />
    </div >
  );
};

export default MessageCard;