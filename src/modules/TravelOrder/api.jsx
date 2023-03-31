import axios from "axios";
import { apiUrl } from '../../constants/url'

/**
 * APIs
*/
export const getRecords = (payload) => {
  const endpoint = 'v1/data/TO/travel-orders'
  const url = `${apiUrl}/${endpoint}`
  return axios.get(url, {params: {...payload}})
}

export const saveRecord = (payload) => {
  const endpoint = 'v1/data/TO/travel-order'
  const url = `${apiUrl}/${endpoint}`
  return axios.post(url, payload)
}

export const updateRecord = (payload) => {
  const { id } = payload
  const endpoint = 'v1/data/TO/travel-order'
  const url = `${apiUrl}/${endpoint}/${id}`
  return axios.put(url, payload)
}

export const getRecord = (payload) => {
  const { id } = payload
  const endpoint = 'v1/data/TO/travel-order'
  const url = `${apiUrl}/${endpoint}/${id}`
  return axios.get(url)
}

export const deleteRecord = (payload) => {
  const { id } = payload
  const endpoint = 'v1/data/TO/travel-order'
  const url = `${apiUrl}/${endpoint}/${id}`
  return axios.delete(url)
}

export const deleteRecords = (payload) => {
  const endpoint = 'v1/data/TO/travel-orders'
  const url = `${apiUrl}/${endpoint}`
  return axios.delete(url, {data: {ids: payload} })
}