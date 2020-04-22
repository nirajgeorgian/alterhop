import { Auth0ClientOptions, IdToken, RedirectLoginResult } from '@auth0/auth0-spa-js'
import React, { createContext, useContext, useEffect, useState } from 'react'

import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client'
import createAuth0Client from '@auth0/auth0-spa-js'

interface IContextValueType {
  isAuthenticated?: boolean,
  user?: any,
  isLoading?: boolean,
  handleRedirectCallback?: () => void,
  getIdTokenClaims?: (...p: any) => any,
  loginWithRedirect?: (...p: any) => any,
  getTokenSilently?: (...p: any) => any,
  logout?: (...p: any) => any,
  isPopupOpen: boolean,
  loginWithPopup(...p: any): Promise<void>,
  getTokenWithPopup?: (...p: any) => any
}
interface IAuthProviderOptions {
  children: React.ReactElement
  onRedirectCallback(result: RedirectLoginResult): void
}
type AuthUser = Omit<IdToken, '__raw'>


// create the context
const Auth0Context = createContext<Partial<IContextValueType>>({})
const { Consumer, Provider } = Auth0Context
const useAuth = () => useContext(Auth0Context)

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname)
const AuthProvider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  domain,
  client_id,
  redirect_uri
}: IAuthProviderOptions & Auth0ClientOptions) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [user, setUser] = useState<AuthUser>()
  const [auth0Client, setAuth0Client] = useState<Auth0Client>()
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client({ domain, client_id, redirect_uri })
      setAuth0Client(auth0FromHook);

      if (window.location.search.includes("code=") &&
        window.location.search.includes("state=")) {
        const { appState } = await auth0FromHook.handleRedirectCallback();
        onRedirectCallback(appState);
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated();
      setIsAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        const user = await auth0FromHook.getUser();
        setUser(user);
      }

      setIsLoading(false);
    };
    initAuth0();
    // eslint-disable-next-line
  }, []);

  const handleRedirectCallback = async () => {
    setIsLoading(true)

    const result = await auth0Client!.handleRedirectCallback()
    const userProfile = await auth0Client!.getUser()

    setIsLoading(false)
    setIsAuthenticated(true)
    setUser(userProfile)

    return result
  }

  const loginWithPopup = async (options?: any) => {
    setIsPopupOpen(true)

    try {
      await auth0Client!.loginWithPopup(options)
    } catch (error) {
      console.error(error)
    } finally {
      setIsPopupOpen(false)
    }

    const userProfile = await auth0Client!.getUser()
    setUser(userProfile)
    setIsAuthenticated(true)
  }

  const configObject = {
    isLoading,
    isAuthenticated,
    isPopupOpen,
    user,
    loginWithPopup,
    handleRedirectCallback,
    loginWithRedirect: (...p: any) => auth0Client!.loginWithRedirect(...p),
    getTokenSilently: (...p: any) => auth0Client!.getTokenSilently(...p),
    getIdTokenClaims: (...p: any) => auth0Client!.getIdTokenClaims(...p),
    getTokenWithPopup: (...p: any) => auth0Client!.getTokenWithPopup(...p),
    logout: (...p: any) => auth0Client!.logout(...p)
  }

  return <Provider value={configObject}>{children}</Provider>
}

export { AuthProvider, Consumer as AuthConsumer, useAuth }
export default Auth0Context