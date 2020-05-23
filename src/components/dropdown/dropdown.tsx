import React, { useState } from 'react'
import { Menu, Dropdown } from 'antd'
<<<<<<< HEAD
import style from './style.module.less'
=======
import './dropdown.css'
>>>>>>> f8f15c7b32a0cddcc30bdfbabadbb30edef54840

interface IDropdown {
	option: (getSelected: string) => void
}

const DropDown: React.FC<IDropdown> = ({ option }) => {
	const [selected, setSelected] = useState<string>('Select Peer to compare')
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
<<<<<<< HEAD
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

=======

	return (
		<div id="dropdown-basic-button">
			<Dropdown overlay={menu}>
				<a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
					{selected}
				</a>
			</Dropdown>
		</div>
	)
}

>>>>>>> f8f15c7b32a0cddcc30bdfbabadbb30edef54840
export default DropDown
