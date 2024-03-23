import Client from './api'

export const showAllCharity = async () => {
  try {
    const res = await Client.get(`/charities`)
    return res.data
  } catch (error) {
    console.log(error)
  }
}
