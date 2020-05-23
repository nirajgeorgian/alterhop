<<<<<<< HEAD
import React, { useState } from 'react'
import Dropdown from '../dropdown/dropdown'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from './style.module.less'

interface Ipvalue {
	pVal: (getPeer: string) => void
}

const SearchBox: React.FC<Ipvalue> = ({ pVal }) => {
	const [currentPeer, selectCurrentPeer] = useState<string>('')
	const getSelected = (selectedValue: string) => {
		selectCurrentPeer(selectedValue)
	}

	return (
		<div className={style.search}>
			<Dropdown option={getSelected} />
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
=======
import './searchBox.css'

import React, { useState } from 'react'

import Dropdown from '../dropdown/dropdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

interface Ipvalue {
  pVal: (getPeer: string) => void
}

const SearchBox: React.FC<Ipvalue> = ({ pVal }) => {
  const [currentPeer, selectCurrentPeer] = useState<string>('')
  const getSelected = (selectedValue: string) => {
    selectCurrentPeer(selectedValue)
  }

  return (
    <div className="search">
      <Dropdown option={getSelected} />
      <div>
        <FontAwesomeIcon
          className="plusBtn"
          icon={faPlusCircle}
          onClick={() => {
            pVal(currentPeer)
          }}
        />
      </div>
    </div>
  )
>>>>>>> f8f15c7b32a0cddcc30bdfbabadbb30edef54840
}

export default SearchBox
