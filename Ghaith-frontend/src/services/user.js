import Client from './api'

export const getUsers = async () => {
  try {
    const res = await Client.get('/users/all')
    return res.data
  } catch (error) {
    return error
  }
}
