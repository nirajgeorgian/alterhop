import { useEffect, useState } from 'react'

const useFetch = (url: string) => {
	const [data, setData] = useState<Array<any>>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string>((null as unknown) as string)

	useEffect(() => {
		const fetchUrl = async () => {
			try {
				const response = await fetch(url)
				const json = await response.json()
				if (response.ok) {
					setData(json)
				} else {
					setError(json.error)
				}
			} catch (error) {
				setError(error.message)
			}
			setLoading(false)
		}
		fetchUrl()
	}, [url])

	return [data, loading, error]
}
export { useFetch }
