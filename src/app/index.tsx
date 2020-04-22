import { Col, Layout, Row } from 'antd'
import Navigation, { Primary, Secondary } from 'components/navigation'

import Contexts from './contexts'
import Loading from 'components/loading'
import { ProfileRoutes } from './routes'
import React from 'react'
import styles from './app.module.less'
import { useAuth } from './contexts/auth'

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
const AppNavigation: React.FC = () => {
  const { isLoading, user, isAuthenticated } = useAuth();
  return (
    <Sider width="100%" className={styles.navigation} collapsedWidth="0" breakpoint="lg">
      <Row>
        <Navigation>
          <Col span={6}>
            <Loading loading={Boolean(isLoading)}>
              <Primary user={user} isAuthenticated={isAuthenticated} />
            </Loading>
          </Col>
          <Col span={18}>
            <Loading loading={Boolean(isLoading)}>
              <Secondary />
            </Loading>
          </Col>
        </Navigation>
      </Row>
    </Sider>
  )
}


/**
 * AppBody
 */
const AppBody: React.FC = () =>
  <Layout hasSider={false}>
    <Content>
      <Loading loading={true} message="loading ...">
        <ProfileRoutes />
      </Loading>
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
