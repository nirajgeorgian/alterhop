/*
 * Created on Thu April 23 2020
 *
 * Main App composition where we combine different component to from an 
 * base starting point for application rendering
 *
 * @author nirajgeorgian@oojob.io (Niraj Georgian)
 *
 * Copyright (c) 2020 - oojob
 */

import { Col, Layout, Row } from 'antd'

import AppBody from 'app/_body'
import AppNavigation from 'app/_header'
import Contexts from 'app/contexts'
import React from 'react'
import styles from 'app/style.module.less'

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
