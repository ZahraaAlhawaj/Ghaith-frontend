import Client from './api'

export const getCategories = async () => {
  try {
    const res = await Client.get('/categories')
    return res.data
  } catch (error) {
    return error
  }
}

export const createCategory = async (data) => {
  try {
    const res = await Client.post('/categories', data)
    return res.data
  } catch (error) {
    return error
  }
}

export const updateCategory = async (id, data) => {
  try {
    const res = await Client.put(`/categories/${id}`, data)
    return res.data
  } catch (error) {
    return error
  }
}

export const deleteCategory = async (id) => {
  try {
    const res = await Client.delete(`/categories/${id}`)
    return res
  } catch (error) {
    return error
  }
}
