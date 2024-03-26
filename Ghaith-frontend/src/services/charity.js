import Client from './api'

export const showAllCharity = async () => {
  try {
    const res = await Client.get(`/charities`)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const getCharity = async (charityId) => {
  try {
    const res = await Client.get(`/charities/${charityId}`)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const updateCharity = async (charityId, data) => {
  try {
    const res = await Client.put(`/charities/${charityId}`, data)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const showCharityCases = async (charityId) => {
  try {
    const res = await Client.get(`/cases/charity/${charityId}`)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const donate = async (data) => {
  try {
    const res = await Client.post('/donations', data)
    return res
  } catch (error) {
    console.log(error)
  }
}
