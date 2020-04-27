import { Col, Layout, Row } from 'antd';
import Navigation, { Primary } from 'app/navigation';

import Loading from 'components/loading';
import { PrimaryRoutes } from './routes';
import React from 'react'
import styles from 'app/style.module.less'
import { useAuth } from './contexts/auth';

const { Sider } = Layout

/**
 * AuthenticatedAppNavigation
 */
const AuthenticatedAppNavigation: React.FC = () => {
  const { user } = useAuth();
  return (
    <Sider width="100%" className={styles.navigation} collapsedWidth="0" breakpoint="lg">
      <Row>
        <Navigation>
          <Col span={6} className={styles.menu}>
            <Primary user={user} isAuthenticated={true} />
          </Col>
          <Col span={18}>
            <PrimaryRoutes />
          </Col>
        </Navigation>
      </Row>
    </Sider>
  )
}

/**
 * UnauthenticatedAppNavigation
 * @param param0 
 */
const UnauthenticatedAppNavigation: React.FC<{ loading: boolean }> = ({ loading }) =>
  <Sider width="100%" className={styles.navigation} collapsedWidth="0" breakpoint="lg">
    <Row>
      <Navigation>
        <Col span={6} className={styles.menu}>
          <Loading loading={loading}>
            <Primary user={null} isAuthenticated={true} />
          </Loading>
        </Col>
        <Col span={18}>
          <Loading loading={loading}>
            <PrimaryRoutes />
          </Loading>
        </Col>
      </Navigation>
    </Row>
  </Sider>

/**
 * AppNavigation
 */
const AppNavigation: React.FC = () => {
  const { isLoading } = useAuth()

  if (isLoading) {
    return <UnauthenticatedAppNavigation loading={Boolean(isLoading)} />
  }

  return <AuthenticatedAppNavigation />
}

export default AppNavigation