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

export const joinEvent = async (eventId) => {
  try {
    const res = await Client.put(`/events/${eventId}/join`)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const getEventByCharity = async () => {
  try {
    const res = await Client.get(`/events/charity`)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const createEvent = async (data) => {
  try {
    const res = await Client.post(`/events`, data)
    return res.data
  } catch (error) {
    console.log(error)
  }
}
