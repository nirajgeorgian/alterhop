import React, { useState } from 'react'

import Dropdown from '../dropdown/dropdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import style from './style.module.less'

interface Ipvalue {
	pVal: (getPeer: string) => void
	placeholder: string
}

const SearchBox: React.FC<Ipvalue> = ({ pVal, placeholder }) => {
	const [currentPeer, selectCurrentPeer] = useState<string>('')
	const getSelected = (selectedValue: string) => {
		selectCurrentPeer(selectedValue)
	}

	return (
		<div className={style.search}>
			<Dropdown option={getSelected} placeholder={placeholder} />
			<div>
				<FontAwesomeIcon
					className={style.plusBtn}
					icon={faPlusCircle}
					onClick={() => {
						pVal(currentPeer)
					}}
				/>
			</div>
		</div>
	)
}

export default SearchBox
