import React from 'react'
import './App.css'
import { Layout, Row, Col } from 'antd'
import styles from './App.module.less'

const { Content, Sider } = Layout

const App = () => (
	<div className={styles.pageWrapper}>
		<div className={styles.mainWrapper}>
			<Row>
				<Layout>
					<Col className={styles.mainMenu} xxl={6} xl={6} lg={8} md={8} xs={24} sm={24}>
						<Sider width="100%" className={styles.navigation}>
							navigation
						</Sider>
					</Col>
					<Col xxl={18} xl={18} lg={16} md={16} xs={24} sm={24}>
						<Layout>
							<Content>content</Content>
						</Layout>
					</Col>
				</Layout>
			</Row>
		</div>
	</div>
)

export default App
