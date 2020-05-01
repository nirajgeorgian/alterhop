import { Col, Layout, Row } from 'antd'
import React, { ReactNode } from 'react'

import style from 'components/layout/side-container/style.module.less'

const { Sider, Content } = Layout
interface ISideContainerProps {
  side: ReactNode
}

const SideContainer: React.FC<ISideContainerProps> = ({ children, side }) =>
  <Row className={style['side-container']}>
    <Layout>
      <Col span={8}>
        <Sider theme="light" width="100%" className={style['sider']}>
          {side}
        </Sider>
      </Col>
      <Col span={16}>
        <Layout className="site-layout">
          <Content className={style.content}>
            {children}
          </Content>
        </Layout>
      </Col>
    </Layout>
  </Row>

export default SideContainer