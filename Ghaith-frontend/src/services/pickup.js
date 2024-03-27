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

export const getPickupsByCharity = async () => {
  try {
    const res = await Client.get(`/pickup/charity`)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const updatePickupStatus = async (id, data) => {
  try {
    const res = await Client.put(`/pickup/${id}/status`, data)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const showAllPickup = async () => {
  try {
    const res = await Client.get(`/pickup`)
    return res.data
  } catch (error) {
    console.log(error)
  }
}
