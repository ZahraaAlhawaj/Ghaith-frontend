import Client from './api'

export const getDonations = async () => {
  try {
    const res = await Client.get(`/donations`)
    return res.data
  } catch (error) {
    return error
  }
}

export const getStatistics = async () => {
  try {
    const res = await Client.get(`/donations/statistics`)
    return res.data
  } catch (error) {
    return error
  }
}
