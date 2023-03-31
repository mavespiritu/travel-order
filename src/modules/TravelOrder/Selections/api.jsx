import axios from "axios";
import { apiUrl } from '@constants/url'

/**
 * APIs
*/
export const getTypes = () => {
  const endpoint = 'v1/data/TO/types'
  const url = `${apiUrl}/${endpoint}`
  return axios.get(url)
}

export const getVehicles = () => {
  const endpoint = 'v1/data/TO/vehicles'
  const url = `${apiUrl}/${endpoint}`
  return axios.get(url)
}

export const getEmployees = () => {
  const endpoint = 'v1/data/IPMS/employees'
  const url = `${apiUrl}/${endpoint}`
  return axios.get(url)
}

export const getRegions = () => {
  const endpoint = 'v1/data/TO/regions'
  const url = `${apiUrl}/${endpoint}`
  return axios.get(url)
}

export const getProvinces = (payload) => {
  const endpoint = 'v1/data/TO/provinces'
  const url = `${apiUrl}/${endpoint}/${payload}`
  return axios.get(url)
}

export const getCitymuns = (payload) => {
  const endpoint = 'v1/data/TO/citymuns'
  const url = `${apiUrl}/${endpoint}/${payload}`
  return axios.get(url)
}

export const getSpecificLocations = (payload) => {
  const endpoint = 'v1/data/TO/specific-locations'
  const url = `${apiUrl}/${endpoint}/${payload}`
  return axios.get(url)
}