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

export const selectRequest = async (id, data) => {
  try {
    console.log(data)
    const res = await Client.post(`/request/${id}`, data)
    return res.data
  } catch (error) {
    return error
  }
}
