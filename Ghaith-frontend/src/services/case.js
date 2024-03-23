import Client from './api'

export const getCases = async () => {
  try {
    const res = await Client.get(`/cases`)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const showCase = async (casesId) => {
  try {
    const res = await Client.get(`/cases/${casesId}`)
    return res.data
  } catch (error) {
    console.log(error)
  }
}
