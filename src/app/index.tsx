import { Col, Layout, Row } from 'antd'
import Navigation, { Primary } from 'components/navigation'
import { PrimaryRoutes, SecondaryRoutes } from 'app/routes'

import Contexts from 'app/contexts'
import Loading from 'components/loading'
import React from 'react'
import styles from 'app/app.module.less'
import { useAuth } from 'app/contexts/auth'

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
          <Col span={6} className={styles.menu}>
            <Loading loading={Boolean(isLoading)}>
              <Primary user={user} isAuthenticated={isAuthenticated} />
            </Loading>
          </Col>
          <Col span={18}>
            <Loading loading={Boolean(isLoading)}>
              <PrimaryRoutes />
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
const AppBody: React.FC = () => {
  const { isLoading } = useAuth();

  return (
    <Layout hasSider={false}>
      <Content>
        <Loading loading={Boolean(isLoading)} message="loading ...">
          <SecondaryRoutes />
        </Loading>
      </Content>
    </Layout>

  )
}


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
