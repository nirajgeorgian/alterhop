import { Col, Layout, Row } from 'antd'
import Navigation, { Primary, Secondary } from 'components/navigation'

import Contexts from './contexts'
import Loading from 'components/loading'
import React from 'react'
import styles from './app.module.less'

const { Content, Sider } = Layout

/**
 * AppLayout
 * @param param0 
 */
const AppLayout: React.FC = ({ children }) =>
  <Contexts>
    <div className={styles.pageWrapper}>
      <div className={styles.mainWrapper}>
        {children}
      </div>
    </div>
  </Contexts>


/**
 * AppNavigation 
 */
const AppNavigation: React.FC = () =>
  <Sider width="100%" className={styles.navigation} collapsedWidth="0" breakpoint="lg">
    <Row>
      <Navigation>
        <Col span={6}>
          <Primary />
        </Col>
        <Col span={18}>
          <Loading loading={false}>
            <Secondary />
          </Loading>
        </Col>
      </Navigation>
    </Row>
  </Sider>


/**
 * AppBody
 */
const AppBody: React.FC = () =>
  <Layout hasSider={false}>
    <Content>
      <Loading loading={true} message="loading ..." />
    </Content>
  </Layout>


/**
 * App
 */
const App: React.FC = () => (
  <AppLayout>
    <Row>
      <Layout hasSider={true}>
        <Col className={styles.mainMenu} span={6} xs={24} sm={12} md={10} lg={8} xl={6}>
          <AppNavigation />
        </Col>
        <Col span={18}>
          <AppBody />
        </Col>
      </Layout>
    </Row >
  </AppLayout>
)

export default App
