import React, { useState } from 'react'
import SearchBox from '../../../components/searchBox/searchBox'
import Table from '../../../components/table/table'
import style from './style.module.less'

const Peer: React.FC = () => {
	const [peer, setPeer] = useState<string>('')

	const getPeer = (peerString: string) => {
		setPeer(peerString)
	}

	return (
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
	)
}

export default Peer
