import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import style from './style.module.less'

interface ITable {
	selectedPeer: string
}

const RenderTable: React.FC<ITable> = ({ selectedPeer }) => {
	const [changes, setChanges] = useState<string>('')

	useEffect(() => {
		setChanges(selectedPeer)
	}, [selectedPeer])

	const data = [
		{
			key: '1',
			comparisonParameters: 'Earnings Per Share (Rs)',
			firstUniversity: 55.47,
			secondUniversity: 1.89,
			peer: changes
		},
		{
			key: '2',
			comparisonParameters: 'DPS (Rs)',
			firstUniversity: 6.5,
			secondUniversity: 1.0,
			peer: changes
		},
		{
			key: '3',
			comparisonParameters: 'Book Value/Share (Rs)',
			firstUniversity: 639.41,
			secondUniversity: 61.21,
			peer: changes
		},
		{
			key: '4',
			comparisonParameters: 'EBIT Margin (%)',
			firstUniversity: 14.24,
			secondUniversity: 1.46,
			peer: changes
		}
	]

	const deletePeer = () => setChanges('')

	return (
		<div>
			<Table columns={columns} dataSource={data} />
			<div className={style.removePeerBtn}>
				<button onClick={deletePeer}>Remove Peer</button>
			</div>
		</div>
	)
}

const columns = [
	{
		title: 'Comparison Parameters',
		dataIndex: 'comparisonParameters',
		key: 'comparisonParameters'
	},
	{
		title: 'Choose First University',
		dataIndex: 'firstUniversity',
		key: 'firstUniversity'
	},
	{
		title: 'Choose Second University',
		dataIndex: 'secondUniversity',
		key: 'secondUniversity'
	},
	{
		title: 'Add a Peer',
		dataIndex: 'peer',
		key: 'peer'
	}
]

export default RenderTable
