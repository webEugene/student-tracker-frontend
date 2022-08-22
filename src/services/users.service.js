import { axiosHandler } from '../axios.config';
import getCompanyId from '../helpers/getCompanyId';

export { UsersService };

class UsersService {
  /**
   * Create a new user
   *
   * @param {string} name
   * @returns {Promise<AxiosResponse<any>>}
   */
  static createUser(params) {
    // const { name, surname, email, password, role } = params;
    return axiosHandler.post(`${process.env.VUE_APP_API_ENDPOINT}/v1/users/new`, {
      ...params,
      company_id: getCompanyId(),
    });
  }

  /**
   * Get all users
   *
   * @returns {Promise<AxiosResponse<any>>}
   */
  static getAllUsers() {
    return axiosHandler.get(`${process.env.VUE_APP_API_ENDPOINT}/v1/users`, {
      params: {
        company_id: getCompanyId(),
      },
    });
  }

  /**
   * Get user by ID
   *
   * @returns {Promise<AxiosResponse<any>>}
   */
  static findOneUser(id) {
    return axiosHandler.get(`${process.env.VUE_APP_API_ENDPOINT}/v1/users/${id}`, {
      params: {
        company_id: getCompanyId(),
      },
    });
  }

  /**
   * Remove teachers
   *
   * @param {string} id
   * @returns {Promise<AxiosResponse<any>>}
   */
  static deleteUser(id) {
    return axiosHandler.delete(`${process.env.VUE_APP_API_ENDPOINT}/v1/users/${id}`, {
      params: {
        company_id: getCompanyId(),
      },
    });
  }

  /**
   * Remove user admin and company
   *
   * @param {string} id
   * @returns {Promise<AxiosResponse<any>>}
   */
  static deleteAdminAndCompany(id) {
    return axiosHandler.delete(`${process.env.VUE_APP_API_ENDPOINT}/v1/users/admin/${id}`, {
      params: {
        company_id: getCompanyId(),
      },
    });
  }

  /**
   * Update teachers
   *
   * @param {string} id
   * @param {object} params
   * @returns {Promise<AxiosResponse<any>>}
   */
  static updateUser(id, params) {
    // const { name, surname } = params;
    return axiosHandler.patch(`${process.env.VUE_APP_API_ENDPOINT}/v1/users/${id}`, {
      ...params,
      company_id: getCompanyId(),
    });
  }
}
