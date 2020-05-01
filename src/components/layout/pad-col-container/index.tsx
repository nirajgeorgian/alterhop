import { Col, Row } from 'antd'
import React, { ReactNode } from 'react'

import style from 'components/layout/pad-col-container/style.module.less'

interface IPadColContainerProps {
	side: ReactNode
	sideSpan: number
	contentSpan: number
	spacing: number
}

const PadColContainer: React.FC<IPadColContainerProps> = ({ children, side, sideSpan, contentSpan, spacing }) => (
	<Row className={style['pad-col-container']}>
		<Col span={sideSpan}>{side}</Col>
		<Col span={contentSpan} offset={spacing}>
			{children}
		</Col>
	</Row>
)

export default PadColContainer
