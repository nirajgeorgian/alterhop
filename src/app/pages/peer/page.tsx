import { Col, Row, Typography } from 'antd'
import React, { useState } from 'react'

import FullContainer from 'components/layout/full-container'
import SearchBox from '../../../components/searchBox/searchBox'
import Table from '../../../components/table/table'
import styles from 'app/pages/peer/style.module.less'

const { Title, Paragraph, Text } = Typography

const Peer: React.FC = () => {
	const [peer, setPeer] = useState<string>('')

	const getPeer = (peerString: string) => {
		setPeer(peerString)
	}

	return (
		<FullContainer>
			<Row className={styles['peer-title']}>
				<Col span={12}>
					<Title level={1}>Harvard University</Title>
					<Text type="secondary" strong>
						BIG UNIVERSITY
					</Text>
				</Col>
				<Col span={12}>
					<Paragraph>Select a Peer to Compare</Paragraph>
					<SearchBox pVal={getPeer} placeholder={'Select a Peer to Compare'} />
				</Col>
			</Row>
			<Row className={styles['peer-content']}>
				<Col span={24}>
					<Title level={3}>University Comparison for Harvard University</Title>
					<Table selectedPeer={peer} />
				</Col>
			</Row>
		</FullContainer>
	)
}

export default Peer
