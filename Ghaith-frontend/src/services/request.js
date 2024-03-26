import Client from './api'

export const getRequests = async (data) => {
  try {
    const res = await Client.get(`/request`, data)
    return res.data
  } catch (error) {
    return error
  }
}

export const addRequest = async (data) => {
  try {
    const res = await Client.post(`/request`, data)
    return res.data
  } catch (error) {
    console.log(error)
  }
}
