/*
 * Created on Thu April 23 2020
 *
 * Main file responsible for navigation and combining them
 * Navigation => (Primary/Seconday)
 *
 * @author nirajgeorgian@oojob.io (Niraj Georgian)
 *
 * Copyright (c) 2020 - oojob
 */

import { CompanyMenu, ProfileMenu, RootMenu } from 'app/navigation/secondary'
import React, { createContext, useContext, useMemo, useState } from 'react'

import Primary from 'app/navigation/primary'
import { Switch } from 'react-router-dom'

interface INavigationContext {
	route: string
	setRoute: (value: string) => void
}

export const NavigationContext = createContext<Partial<INavigationContext>>({})

const Navigation: React.FC = (props) => {
	const [route, setRoute] = useState<string>('')

	const value = useMemo(() => ({ route, setRoute }), [route])

	return (
		<Switch>
			<NavigationContext.Provider value={value}>{props.children}</NavigationContext.Provider>
		</Switch>
	)
}

export const useNavigationContext = () => {
	const context = useContext(NavigationContext)
	if (!context) {
		throw new Error('Navigation compound components cannot be rendered outside the Navigation component')
	}

	return context
}

export { Navigation, Primary, RootMenu, CompanyMenu, ProfileMenu }
export default Navigation
