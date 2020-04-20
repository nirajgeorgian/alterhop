import { Col, Layout, Row } from 'antd'
import Navigation, { Primary, Secondary } from 'components/navigation'

import React from 'react'
import styles from './app.module.less'

const { Content, Sider } = Layout

const App = () => (
	<div className={styles.pageWrapper}>
		<div className={styles.mainWrapper}>
			<Row>
				<Layout hasSider={true}>
					<Col className={styles.mainMenu} xxl={6} xl={6} lg={8} md={8} xs={24} sm={24}>
						<Sider width="100%" className={styles.navigation}>
							<Row>
								<Navigation>
									<Col span={6}>
										<Primary />
									</Col>
									<Col span={18}>
										<Secondary />
									</Col>
								</Navigation>
							</Row>
						</Sider>
					</Col>
					<Col xxl={20} xl={20} lg={16} md={16} xs={24} sm={24}>
						<Layout hasSider={false}>
							<Content>content</Content>
						</Layout>
					</Col>
				</Layout>
			</Row>
		</div>
	</div>
)

export default App
