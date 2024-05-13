import { axiosHandler } from '../axios.config';
import getCompanyId from '../helpers/getCompanyId';
import getTariffPermission from '../helpers/getTariffPermission';

export { UsersService };

class UsersService {
  /**
   * Create a new user
   *
   * @returns {Promise<AxiosResponse<any>>}
   * @param params
   */
  static createUser(params) {
    // const { name, surname, email, password, role } = params;
    return axiosHandler.post(`${process.env.VUE_APP_API_ENDPOINT}/v1/users/new`, {
      ...params,
      company_id: getCompanyId(),
      tariff_permission: getTariffPermission(),
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
   * Get admin by ID
   *
   * @param {string} id
   * @returns {Promise<AxiosResponse<any>>}
   */
  static findAdminUser(id) {
    return axiosHandler.get(`${process.env.VUE_APP_API_ENDPOINT}/v1/users/admin/${id}`, {
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
   * Update users
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

  /**
   * Get payments list by ID
   *
   * @param {string} id
   * @returns {Promise<AxiosResponse<any>>}
   */
  static getAllPayments() {
    return axiosHandler.get(
      `${process.env.VUE_APP_API_ENDPOINT}/v1/users/admin/payments-list/a6708e58-5d37-4f27-ab88-c052f3306d5e`,
      {
        params: {
          company_id: getCompanyId(),
        },
      },
    );
  }
}
