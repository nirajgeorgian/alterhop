import { Col, Layout, Row } from 'antd'
import React, { Suspense } from 'react'

import Contexts from 'app/contexts'
import Loading from 'components/loading'
import styles from 'app/style.module.less'

const AppBody = React.lazy(() => import('./_body'))
const AppNavigation = React.lazy(() => import('./_header'))

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
 * App
 */
const App: React.FC = () => (
  < Suspense fallback={<Loading loading={true} />}>
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
  </Suspense >
)

export default App
