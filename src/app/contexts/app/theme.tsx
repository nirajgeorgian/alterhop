import { useReducer } from 'react'

interface IThemeState {
	theme: 'light' | 'dark'
}

const themeActionTypes = {
	toggle: 'TOGGLE',
	light: 'LIGHT',
	dark: 'DARK'
}

const toggleThemeReducer = (state: IThemeState, action: { type: string; payload?: IThemeState }): IThemeState => {
	switch (action.type) {
		case themeActionTypes.toggle: {
			const isLight = state.theme

			return { theme: isLight ? 'dark' : 'light' }
		}
		case themeActionTypes.light: {
			return { theme: 'light' }
		}
		case themeActionTypes.dark: {
			return { theme: 'dark' }
		}
		default: {
			throw new Error(`Unhandled type: ${action.type}`)
		}
	}
}

const useTheme = (reducer?: typeof toggleThemeReducer) => {
	const toggleReducer = reducer ? reducer : toggleThemeReducer
	const [{ theme }, dispatch] = useReducer(toggleReducer, { theme: 'light' })

	const toggle = () => dispatch({ type: themeActionTypes.toggle })
	const setLight = () => dispatch({ type: themeActionTypes.light })
	const setDark = () => dispatch({ type: themeActionTypes.dark })

	return { theme, toggle, setLight, setDark }
}

export { useTheme, themeActionTypes, toggleThemeReducer }
