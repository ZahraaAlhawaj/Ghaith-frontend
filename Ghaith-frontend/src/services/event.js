import Client from './api'

export const showAllEvent = async () => {
  try {
    const res = await Client.get(`/events`)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const getEvent = async (eventId) => {
  try {
    const res = await Client.get(`/events/${eventId}`)
    return res.data
  } catch (error) {
    console.log(error)
  }
}
