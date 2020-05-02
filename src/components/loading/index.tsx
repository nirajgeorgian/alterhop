import { LoadingOutlined } from '@ant-design/icons'
import React from 'react'
import { Spin } from 'antd'
import style from 'components/loading/style.module.less'

export const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
export interface ILoading {
	loading: boolean
	message?: string
}

const Loading: React.FC<ILoading> = ({ children, loading, message }) => (
	<div className={style.loading}>
		<Spin indicator={loadingIcon} tip={message} delay={500} className={style.page} spinning={loading}>
			{children}
		</Spin>
	</div>
)

export default Loading
