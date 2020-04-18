import axios from 'axios'

export const register = newUser => {
  return axios
    .post('api/register', {
      userId: newUser.userId,
      email: newUser.email,
      password: newUser.password
    })
    .then(response => {
      console.log('Registered')
    })
}

export const login = user => {
  return axios
    .post('api/login', {
      email: user.email,
      password: user.password
    })
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const search = q =>{
  return axios
  .get(`api/users?q=${q}`)
  .then(res =>{
      return res.data
  })
  .catch(err =>{
    console.log("user not found")
  })
}

// export const profile = token =>{
//   return axios
//   .get('api/profile')
//   .then(res =>{
//     return res.data
//   })
// }