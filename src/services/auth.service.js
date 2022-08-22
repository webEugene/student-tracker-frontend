import router from '../router';
import axios from 'axios';
export { AuthService };

class AuthService {
  /**
   * Get jwt token
   *
   * @param {string} email
   * @param {string} password
   *
   * @returns {Promise<AxiosResponse<any>>}
   */
  static register(params) {
    return axios.post(`${process.env.VUE_APP_API_ENDPOINT}/v1/auth/register`, {
      ...params,
    });
  }
  /**
   * Logout from the service
   *
   */
  static logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('expireToken');
    localStorage.removeItem('userInfo');
    router.push('/').catch(() => {});
  }

  /**
   * Get jwt token
   *
   * @param {string} email
   * @param {string} password
   *
   * @returns {Promise<AxiosResponse<any>>}
   */
  static login(email, password) {
    return axios.post(`${process.env.VUE_APP_API_ENDPOINT}/v1/auth/login`, {
      email: `${email}`,
      password: `${password}`,
    });
  }

  /**
   * Check if user is logged in the system
   *
   * @returns Boolean
   */
  static isLoggedIn() {
    const loggedIn = localStorage.getItem('accessToken');
    const expireToken = localStorage.getItem('expireToken');
    // if token expire - logout
    return loggedIn && expireToken > Date.now() / 1000;
  }
}
