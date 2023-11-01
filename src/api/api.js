import axios from "axios"


const instance = axios.create({
  withCredentials: true,
  baseURL: `https://social-network.samuraijs.com/api/1.0/`,
  headers: { "API-KEY": "a04742fc-b015-48d6-8ae1-43c8264c6140" }
})

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data)
  },

  follow(userId) {
    return instance.post(`follow/${userId}`)
  },

  unfollow(userId) {
    return instance.delete(`follow/${userId}`)
  },


}


export const authAPI = {
  me() {
    return instance.get(`auth/me`)
  },

  login(email, password, rememberMe = false) {
    return instance.post(`auth/login`, {
      email, password, rememberMe
    })
  },

  logout(email, password, rememberMe = false) {
    return instance.delete(`auth/login`)
  },
}

export const profileAPI = {
  getProfile(userId) {
    return instance.get(`profile/` + userId)
  },

  getStatus(userId) {
    return instance.get('profile/status/' + userId)
  },

  updateStatus(status) {
    return instance.put('profile/status/', { status: status })
  }

}
