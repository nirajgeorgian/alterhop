import React, { useEffect, useState } from 'react'

import { Table } from 'antd'

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
			realianceIndustries: 55.47,
			mrpl: 1.89,
			peer: changes
		},
		{
			key: '2',
			comparisonParameters: 'DPS (Rs)',
			realianceIndustries: 6.5,
			mrpl: 1.0,
			peer: changes
		},
		{
			key: '3',
			comparisonParameters: 'Book Value/Share (Rs)',
			realianceIndustries: 639.41,
			mrpl: 61.21,
			peer: changes
		},
		{
			key: '4',
			comparisonParameters: 'EBIT Margin (%)',
			realianceIndustries: 14.24,
			mrpl: 1.46,
			peer: changes
		}
	]

	const deletePeer = () => setChanges('')

	return (
		<div>
			<Table columns={columns} dataSource={data} />
			<button onClick={deletePeer}>Remove Peer</button>
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
		title: 'Reliance Industries LTD',
		dataIndex: 'realianceIndustries',
		key: 'realianceIndustries'
	},
	{
		title: 'MRPL',
		dataIndex: 'mrpl',
		key: 'mrpl'
	},
	{
		title: 'Add a Peer',
		dataIndex: 'peer',
		key: 'peer'
	}
]

export default RenderTable
