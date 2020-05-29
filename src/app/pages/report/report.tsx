import React, { useState, useEffect } from 'react'
import * as d3 from 'd3'
import Pie from '../../../components/pie-chart/pie'
import style from './style.module.less'

const Report: React.FC = () => {
	const generateData = (value, length = 5) =>
		d3.range(length).map((item, index) => ({
			date: index,
			value: value === null || value === undefined ? Math.random() * 100 : value
		}))

	const [data, setData] = useState(generateData(null))
	const changeData = () => {
		setData(generateData(null))
	}

	console.log(typeof data)
	return (
		<div className={style.piechart}>
			<div className={style.transformBtn}>
				<button onClick={changeData}>Transform</button>
			</div>
			<div className={style.piebody}>
				<Pie data={data} width={200} height={200} innerRadius={30} outerRadius={100} />
			</div>
		</div>
	)
}

export default Report
