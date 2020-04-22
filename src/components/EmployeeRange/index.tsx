import React, { useState } from 'react'
import { Form, Input } from 'antd'

interface RangeValue {
	min?: number
	max?: number
}

interface RangeInputProps {
	value?: RangeValue
	onChange?: (value: RangeValue) => void
}

const EmployeeRange: React.FC<RangeInputProps> = ({ value = {}, onChange }) => {
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

	const onMinChange = (e) => {
		const newMin = parseInt(e.target.value || 0, 10)
		if (Number.isNaN(min)) {
			return
		}
		if (!('min' in value)) {
			setMin(newMin)
		}

		triggerChange({
			min: newMin
		})
	}

	const onMaxChange = (e) => {
		const newMax = parseInt(e.target.value || 0, 10)
		if (Number.isNaN(max)) {
			return
		}
		if (!('max' in value)) {
			setMax(newMax)
		}

		triggerChange({
			max: newMax
		})
	}

	return (
		<span>
			<Input
				value={value.min || min}
				onChange={onMinChange}
				style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
				placeholder="Min"
			/>{' '}
			-{' '}
			<Input
				value={value.max || max}
				onChange={onMaxChange}
				style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
				placeholder="Max"
			/>
		</span>
	)
}

export default EmployeeRange
