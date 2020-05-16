import React, { useState } from 'react'

import { InputNumber } from 'antd'

interface IRangeValue {
	min?: number
	max?: number
}
interface IRangeInputProps {
	value?: IRangeValue
	onChange?: (value: IRangeValue) => void
}

const Range: React.FC<IRangeInputProps> = ({ value = {}, onChange }) => {
	const [min, setMin] = useState(0)
	const [max, setMax] = useState(0)

	const triggerChange = (changedValue) => {
		if (onChange) {
			onChange({
				min,
				max,
				...value,
				...changedValue
			})
		}
	}

	const onMinChange = (min: number | undefined) => {
		if (min) {
			setMin(min)

			triggerChange({
				min
			})
		}
	}

	const onMaxChange = (max: number | undefined) => {
		if (max) {
			if (!('max' in value)) {
				setMax(max)
			}

			triggerChange({
				max
			})
		}
	}

	return (
		<>
			<InputNumber
				value={value.min || min}
				onChange={onMinChange}
				style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
				placeholder="Min"
			/>{' '}
			-{' '}
			<InputNumber
				value={value.max || max}
				onChange={+onMaxChange}
				style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
				placeholder="Max"
			/>
		</>
	)
}

export default Range
