/*
 * Created on Thu April 23 2020
 *
 * Message page main ccontainer
 * /profile/message
 *
 * @author nirajgeorgian@oojob.io (Niraj Georgian)
 *
 * Copyright (c) 2020 - oojob
 */

import { Button, Col, Dropdown, Input, Menu, Row, Tag, Typography } from 'antd';
import React, { useState } from 'react';

import { CaretDownOutlined } from '@ant-design/icons';
import SideContainer from 'components/layout/side-container';
import UserMessage from 'components/message/list';
import moment from 'moment';
import style from 'app/pages/message/style.module.less'

const { Title, Text } = Typography;
const { Search } = Input;


const Message: React.FC = () => {
  const [active, setActive] = useState<string>("1")

  const onSearch = (value: string) => {
    console.log("search")
  }

  const Side = () => {
    const menu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
            All Messages
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
            Unread Messages
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
            Read Messages
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
            Blocked Messages
          </a>
        </Menu.Item>
      </Menu>
    );

    return (
      <>
        <div className={style.primary}>
          <Row>
            <Col span={12}>
              <Title data-testid="message-title" level={4}>Messages <Tag><Text>25</Text></Tag></Title>
            </Col>
            <Col span={12}>
              <Dropdown overlay={menu} placement="bottomCenter" data-testid="message-button">
                <Button style={{ width: '100%' }}>All Messages <CaretDownOutlined /></Button>
              </Dropdown>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Search
                data-testid="message-search"
                onSearch={onSearch}
                placeholder="search for your messages ..."
              />
            </Col>
          </Row>
        </div>
        <div className={style.secondary}>
          <Row data-testid="message-list">
            {new Array(10).fill(0).map((_, key) => (
              <Col onClick={() => setActive("" + key)} data-testid={`message-list-item${key}`}>
                <UserMessage
                  isActive={key === parseInt(active)}
                  key={key}
                  picture="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  name="dodo duck"
                  job="UI/UX Designer"
                  time={moment()}
                  read={false}
                  summary="dodo duck lives here with some data to be read more about. but the message can go long also" />
                <hr />
              </Col>
            ))}
          </Row>
        </div>
      </>
    )
  }

  const MessageData = () => (
    <div>
      <h2>Your Messages</h2>
      <p>Send private photos and messages to a friend or group.</p>
    </div>
  )

  return (
    <SideContainer side={<Side />}>
      <MessageData />
    </SideContainer>
  );
};

export default Message;