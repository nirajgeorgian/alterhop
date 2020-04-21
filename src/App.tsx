import { Col, Layout, Row } from 'antd'
import Navigation, { Primary, Secondary } from 'components/navigation'

import Loading from 'components/loading'
import React from 'react'
import styles from './app.module.less'

const { Content, Sider } = Layout

const App = () => (
	<div className={styles.pageWrapper}>
		<div className={styles.mainWrapper}>
			<Row>
				<Layout hasSider={true}>
					<Col className={styles.mainMenu} span={6} xs={24} sm={12} md={10} lg={8} xl={6}>
						<Sider width="100%" className={styles.navigation} collapsedWidth="0" breakpoint="lg">
							<Row>
								<Navigation>
									<Col span={6}>
										<Primary />
									</Col>
									<Col span={18}>
										<Loading loading={true}>
											<Secondary />
										</Loading>
									</Col>
								</Navigation>
							</Row>
						</Sider>
					</Col>
					<Col span={18}>
						<Layout hasSider={false}>
							<Content>
								<Loading loading={true} message="loading ..." />
							</Content>
						</Layout>
					</Col>
				</Layout>
			</Row>
		</div>
	</div>
)

export default App
