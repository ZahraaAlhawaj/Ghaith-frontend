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

export const showCharityCases = async (charityId) => {
  try {
    const res = await Client.get(`/cases/charity/${charityId}`)
    return res.data
  } catch (error) {
    console.log(error)
  }
}
