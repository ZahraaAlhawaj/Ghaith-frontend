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

export const donate = async (data) => {
  try {
    const res = await Client.post('/donations', data)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const getStatistics = async (caseId) => {
  try {
    const res = await Client.get(`cases/${caseId}/statistics`)
    return res
  } catch (error) {
    console.log(error)
  }
}
