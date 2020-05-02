import { Button, Checkbox, Form, Input, Select } from 'antd'
import React, { useState } from 'react'

const { Option } = Select

interface ISalaryValue {
	value?: number
	currency?: string
}

interface ISalaryInputProps {
	salary?: ISalaryValue
	onChange?: (value: ISalaryValue) => void
}

const SalaryInput: React.FC<ISalaryInputProps> = ({ salary = {}, onChange }) => {
	const [value, setValue] = useState(0)
	const [currency, setCurrency] = useState('INR')

	const triggerChange = (changedValue) => {
		if (onChange) {
			onChange({ value, currency, ...salary, ...changedValue })
		}
	}

	const onNumberChange = (e) => {
		const newValue = parseInt(e.target.value || 0, 10)
		if (Number.isNaN(value)) {
			return
		}
		if (!('value' in salary)) {
			setValue(newValue)
		}
		triggerChange({ value: newValue })
	}

	const onCurrencyChange = (newCurrency) => {
		if (!('currency' in salary)) {
			setCurrency(newCurrency)
		}
		triggerChange({ currency: newCurrency })
	}

	return (
		<>
			<Input type="text" value={salary.value || value} onChange={onNumberChange} style={{ width: '60%' }} />
			<Select value={salary.currency || currency} style={{ width: '40%' }} onChange={onCurrencyChange}>
				<Option value="INR">INR</Option>
				<Option value="USD">USD</Option>
			</Select>
		</>
	)
}

export default SalaryInput
