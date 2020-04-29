import React, { createContext, useEffect, useState } from 'react'

export interface IResponsive {
	dimensions: {
		width: number
		height: number
	}
	isMobile: boolean
	isTablet: boolean
	isDesktop: boolean
	isLargeDesktop: boolean
}

/**
 * extractWidthAndHeight
 * utility to extract window width/height
 */
const extractWidthAndHeight = () => {
	if (typeof window !== 'undefined') {
		const { innerWidth, innerHeight } = window
		const { clientHeight, clientWidth } = document.documentElement

		const width = innerWidth || clientWidth
		const height = innerHeight || clientHeight

		return { width, height }
	}
}

// Extra small devices (portrait phones, less than 576px)
const EXTRA_SMALL_DEVICE = 575.98

// Small devices (landscape phones, 576px and up)
const SMALL_DEVICE = 767.98

// Medium devices (tablets, 768px and up)
const MEDIUM_DEVICE = 991.98

// Large devices (desktops, 992px and up)
// Extra large devices (large desktops, 1200px and up)
const LARGE_DEVICE = 1199.88


const ResponsiveContext = createContext<Partial<IResponsive>>({
	isMobile: false,
	dimensions: {
		height: null as unknown as number,
		width: null as unknown as number
	}
})
const { Consumer, Provider } = ResponsiveContext

const ResponsiveBase: React.FC = ({ children }) => {
	const [isMobile, setIsMobile] = useState(false)
	const [isTablet, setIsTablet] = useState(false)
	const [isDesktop, setIsDesktop] = useState(false)
	const [isLargeDesktop, setIsLargeDesktop] = useState(false)
	const [width, setWidth] = useState<number>(null as unknown as number)
	const [height, setHeight] = useState<number>(null as unknown as number)

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const handleResize = () => {
				const values = extractWidthAndHeight()
				if (values) {
					const { width, height } = values
					setWidth(width)
					setHeight(height)

					if (width <= EXTRA_SMALL_DEVICE) {
						setIsMobile(true)
					} else if (width > EXTRA_SMALL_DEVICE && width < SMALL_DEVICE) {
						setIsMobile(true)
					} else if (width > SMALL_DEVICE && width < MEDIUM_DEVICE) {
						setIsTablet(true)
					} else if (width > MEDIUM_DEVICE && width < LARGE_DEVICE) {
						setIsDesktop(true)
					} else {
						setIsLargeDesktop(true)
					}
				}
			}

			window && window.addEventListener("resize", handleResize)
			return () => window.removeEventListener('resize', handleResize)
		}
	}, [])

	console.log("browser width: ", width)
	console.log("browser height: ", height
	)

	return <Provider value={{ dimensions: { width, height }, isMobile, isTablet, isDesktop, isLargeDesktop }}>{children}</Provider>
}

export { ResponsiveBase as ResponsiveProvider, Consumer as ResponsiveConsumer }
export default ResponsiveContext
