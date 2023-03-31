
const useStorage = () => {
  const initStorage = {
    id: null,
    email: null,
    default_password: null,
    email_verified: null,
    token: null,
    emp_id: null,
    first_name: null,
    middle_name: null,
    last_name: null,
    ext_name: null,
  }

  const localStorageKey = 'nedaintranet'

  const get = () => {

    let storage = localStorage.getItem(localStorageKey)
  
    if (storage === 'undefined' || storage === null) {
      storage = JSON.stringify(initStorage)
    }
    return storage

  }

  const set = (data) => {

    localStorage.setItem(localStorageKey, JSON.stringify(data))

  }

  const reset = () => {

    localStorage.setItem(localStorageKey, JSON.stringify(initStorage))

  }

  return {
    initStorage,
    localStorageKey,
    get,
    set,
    reset
  }

}

export default useStorage