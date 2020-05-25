import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import SearchBox from '../searchBox/searchBox'
import style from './style.module.less'

interface ITable {
	selectedPeer: string
}

const RenderTable: React.FC<ITable> = ({ selectedPeer }) => {
	const [changes, setChanges] = useState<string>('')
	const [universityOne, setUniversityOne] = useState<string>('')

	const [uniOne, setUniOneChanges] = useState({
		EPS: 0,
		DPS: 0,
		BV: 0,
		EBIT: 0
	})

	const [universityTwo, setUniversityTwo] = useState<string>('')

	const [uniTwo, setUniTwoChanges] = useState({
		EPS: 0,
		DPS: 0,
		BV: 0,
		EBIT: 0
	})

	const getSelectedUniversityOne = (selectedValue: string) => {
		setUniversityOne(selectedValue)
	}

	const getSelectedUniversityTwo = (selectedValue: string) => {
		setUniversityTwo(selectedValue)
	}

	useEffect(() => {
		setChanges(selectedPeer)
		if (universityOne === 'Peer 1') {
			setUniOneChanges({
				EPS: 55.47,
				DPS: 6.5,
				BV: 639.41,
				EBIT: 14.24
			})
		} else if (universityOne === 'Peer 2') {
			setUniOneChanges({
				EPS: 1.89,
				DPS: 1,
				BV: 61.21,
				EBIT: 1.46
			})
		} else if (universityOne === 'Peer 3') {
			setUniOneChanges({
				EPS: 30.89,
				DPS: 2,
				BV: 70.89,
				EBIT: 5.99
			})
		}

		if (universityTwo === 'Peer 1') {
			setUniTwoChanges({
				EPS: 55.47,
				DPS: 6.5,
				BV: 639.41,
				EBIT: 14.24
			})
		} else if (universityTwo === 'Peer 2') {
			setUniTwoChanges({
				EPS: 1.89,
				DPS: 1,
				BV: 61.21,
				EBIT: 1.46
			})
		} else if (universityTwo === 'Peer 3') {
			setUniTwoChanges({
				EPS: 30.89,
				DPS: 2,
				BV: 70.89,
				EBIT: 5.99
			})
		}
	}, [selectedPeer, universityOne, universityTwo])

	const data = [
		{
			key: '1',
			comparisonParameters: 'Earnings Per Share (Rs)',
			firstUniversity: uniOne.EPS,
			secondUniversity: uniTwo.EPS,
			peer: changes
		},
		{
			key: '2',
			comparisonParameters: 'DPS (Rs)',
			firstUniversity: uniOne.DPS,
			secondUniversity: uniTwo.DPS,
			peer: changes
		},
		{
			key: '3',
			comparisonParameters: 'Book Value/Share (Rs)',
			firstUniversity: uniOne.BV,
			secondUniversity: uniTwo.BV,
			peer: changes
		},
		{
			key: '4',
			comparisonParameters: 'EBIT Margin (%)',
			firstUniversity: uniOne.EBIT,
			secondUniversity: uniTwo.EBIT,
			peer: changes
		}
	]

	const columns = [
		{
			title: 'Comparison Parameters',
			dataIndex: 'comparisonParameters',
			key: 'comparisonParameters'
		},
		{
			title: <SearchBox pVal={getSelectedUniversityOne} placeholder={'Choose First University'} />,
			dataIndex: 'firstUniversity',
			key: 'firstUniversity'
		},
		{
			title: <SearchBox pVal={getSelectedUniversityTwo} placeholder={'Choose Second University'} />,
			dataIndex: 'secondUniversity',
			key: 'secondUniversity'
		},
		{
			title: 'Add a Peer',
			dataIndex: 'peer',
			key: 'peer'
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

export default RenderTable
