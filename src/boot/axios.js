import axios from 'axios' 


const axiosInstance = axios.create({ 
  //baseURL: 'https://panelweb.derkayvargas.com/api' 
  baseURL: process.env.NODE_ENV == 'development' ? 'http://webdyvsa.test/api' : 'https://panelweb.derkayvargas.com/api' 
})

/*
 * The interceptor here ensures that we check for the token in local storage every time an ajax request is made
 */
axiosInstance.interceptors.request.use(
  (config) => {

    let token = localStorage.getItem('apiJwt')

    if (token) {
      token = token.replace('__q_strn|','');
      config.headers['Authorization'] = `Bearer ${ token }`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  })

export default ({ Vue }) => {
  Vue.prototype.$axios = axiosInstance
}
export { axiosInstance }