import React, { createContext, useEffect, useState } from 'react'

export interface IResponsive {
	dimensions: {
		width: number
		height: number
	}
	isMobile: boolean
}

/**
 * extractWidthAndHeight
 * utility to extract window width/height
 */
const extractWidthAndHeight = () => {
	const { innerWidth, innerHeight } = window
	const { clientHeight, clientWidth } = document.documentElement
	
	const width = innerWidth || clientWidth
	const height = innerHeight || clientHeight

	return {width, height}
}

const ResponsiveContext = createContext<Partial<IResponsive>>({
	isMobile: false,
	dimensions: {
		height: window.innerHeight,
    width: window.innerWidth
	}
})
const { Consumer, Provider } = ResponsiveContext

const ResponsiveBase: React.FC = ({ children }) => {
	const [isMobile, setIsMobile] = useState(false)
	const [dimensions, setDimensions] = useState({ 
    height: window.innerHeight,
    width: window.innerWidth
  })
	
	useEffect(() => {
		const handleResize = () => {
			const { width, height } = extractWidthAndHeight()
			setDimensions({
				width,
				height
			})
			if (width < 576) {
				setIsMobile(true)
			}
		}
		window.addEventListener("resize", handleResize)

		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return <Provider value={{ isMobile, dimensions }}>{children}</Provider>
}

export { ResponsiveBase as ResponsiveProvider, Consumer as ResponsiveConsumer }
export default ResponsiveContext
