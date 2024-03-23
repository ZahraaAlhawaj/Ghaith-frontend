import Client from './api'

export const addRequest = async (data) => {
  try {
    const res = await Client.post(`/request`, data)
    return res.data
  } catch (error) {
    console.log(error)
  }
}
