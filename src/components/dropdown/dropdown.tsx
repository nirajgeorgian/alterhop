import { Dropdown, Menu } from 'antd'
import React, { useState } from 'react'
import style from './style.module.less'

interface IDropdown {
	option: (getSelected: string) => void
	placeholder: string
}

const DropDown: React.FC<IDropdown> = ({ option, placeholder }) => {
	const [selected, setSelected] = useState<string>(placeholder)
	const onClick = (key: any) => {
		setSelected(`Peer ${key.key}`)
		option(`Peer ${key.key}`)
	}

	const menu = (
		<Menu onClick={onClick}>
			<Menu.Item key="1">Peer 1</Menu.Item>
			<Menu.Item key="2">Peer 2</Menu.Item>
			<Menu.Item key="3">Peer 3</Menu.Item>
		</Menu>
	)

	return (
		<div id={style['dropdown-basic-button']}>
			<Dropdown overlay={menu}>
				<a className={style['ant-dropdown-link']} onClick={(e) => e.preventDefault()}>
					{selected}
				</a>
			</Dropdown>
		</div>
	)
}

export default DropDown
