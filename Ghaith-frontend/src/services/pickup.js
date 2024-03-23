import Client from './api'

export const showChairties = async (data) => {
  try {
    const res = await Client.post(`/pickup/charites`, data)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const addPickup = async (data) => {
  try {
    const res = await Client.post(`/pickup`, data)
    return res.data
  } catch (error) {
    console.log(error)
  }
}
