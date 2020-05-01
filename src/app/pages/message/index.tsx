import { Button, Col, Dropdown, Input, Menu, Row, Tag, Typography } from 'antd';

import { CaretDownOutlined } from '@ant-design/icons';
import React from 'react';
import SideContainer from 'components/layout/side-container';
import UserMessage from 'components/message/list';
import moment from 'moment';
import style from 'app/pages/message/style.module.less'

const { Title, Text } = Typography;
const { Search } = Input;


const Message: React.FC = () => {
  console.log("message page")

  const Side = () => {
    const menu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
            1st menu item
      </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
            2nd menu item
      </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
            3rd menu item
      </a>
        </Menu.Item>
      </Menu>
    );

    return (
      <>
        <div className={style.primary}>
          <Row>
            <Col span={12}>
              <Title level={4}>Messages <Tag><Text>25</Text></Tag></Title>
            </Col>
            <Col span={12}>
              <Dropdown overlay={menu} placement="bottomCenter">
                <Button style={{ width: '100%' }}>All Messages <CaretDownOutlined /></Button>
              </Dropdown>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Search placeholder="search for your messages ..." />
            </Col>
          </Row>
        </div>
        <div className={style.secondary}>
          <Row>
            {new Array(10).fill(0).map((_, key) => (
              <Col>
                <UserMessage
                  isActive={key === 1}
                  key={key}
                  picture="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  name="dodo duck"
                  job="UI/UX Designer"
                  time={moment()}
                  read={false}
                  summary="dodo duck lives here with some data to be read more about. but the message can go long also" />
              </Col>
            ))}
          </Row>
        </div>
      </>
    )
  }

  const MessageData = () => (
    <>
      <h2>Your Messages</h2>
      <p>Send private photos and messages to a friend or group.</p>
    </>
  )

  return (
    <SideContainer side={<Side />}>
      <MessageData />
    </SideContainer>
  );
};

export default Message;