import Client from './api'

export const getUserInfo = async () => {
  try {
    const res = await Client.get(`/users`)
    console.log(res.data)
    return res.data
  } catch (error) {
    console.log(error)
  }
}
