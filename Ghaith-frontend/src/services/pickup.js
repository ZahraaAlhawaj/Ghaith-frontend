import Client from './api'

export const showChairties = async (coords) => {
  try {
    const res = await Client.post(`/pickup/charites`, coords)
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
