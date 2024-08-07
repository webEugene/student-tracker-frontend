import router from '../router';
import axios from 'axios';
export { AuthService };

class AuthService {
  /**
   * Get jwt token
   *
   * @returns {Promise<AxiosResponse<any>>}
   * @param params
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

  /**
   * Forget the password
   *
   * @returns {Promise<AxiosResponse<any>>}
   * @param email
   * @param locale
   */
  static forgetPassword(email, locale = 'uk') {
    return axios.post(`${process.env.VUE_APP_API_ENDPOINT}/v1/auth/forgot-password`, {
      email,
      locale,
    });
  }

  static resetPassword(password, token) {
    return axios.post(`${process.env.VUE_APP_API_ENDPOINT}/v1/auth/reset-password`, {
      password: `${password}`,
      token: `${token}`,
    });
  }
}
