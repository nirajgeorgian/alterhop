<<<<<<< HEAD
import React, { useState } from 'react'
import SearchBox from '../../../components/searchBox/searchBox'
import Table from '../../../components/table/table'
import style from './style.module.less'
=======
import './peer.css'

import { Col, Row, Typography } from 'antd'
import React, { useState } from 'react'

import FullContainer from 'components/layout/full-container'
import SearchBox from '../../../components/searchBox/searchBox'
import Table from '../../../components/table/table'
import styles from 'app/pages/peer/style.module.less'

const { Title, Paragraph, Text } = Typography;
>>>>>>> f8f15c7b32a0cddcc30bdfbabadbb30edef54840

const Peer: React.FC = () => {
	const [peer, setPeer] = useState<string>('')

	const getPeer = (peerString: string) => {
		setPeer(peerString)
	}

	return (
<<<<<<< HEAD
		<div>
			<div className={style.searchBoxDiv}>
				<div className={style.searchBox}>
					<p>Select a Peer to Compare</p>
					<SearchBox pVal={getPeer} />
				</div>
			</div>
			<div className={style.PeerTable}>
				<Table selectedPeer={peer} />
			</div>
		</div>
=======
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
					<SearchBox pVal={getPeer} />
				</Col>
			</Row>
			<Row className={styles['peer-content']}>
				<Col span={24}>
					<Title level={3}>University Comparison for Harvard University</Title>
					<Table selectedPeer={peer} />
				</Col>
			</Row>
		</FullContainer>
>>>>>>> f8f15c7b32a0cddcc30bdfbabadbb30edef54840
	)
}

export default Peer
