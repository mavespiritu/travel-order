import useStorage from './useStorage'

const useAuth = () => {

  const { token } = useStorage().get()

  const isLoggedIn = token === null ? false : true

  return {
    isLoggedIn
  }

}

export default useAuth;