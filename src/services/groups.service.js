import { axiosHandler } from '@/axios.config';
import getCompanyId from '../helpers/getCompanyId';

export { GroupsService };

class GroupsService {
  /**
   * Create a new group
   *
   * @param {string} name
   * @returns {Promise<AxiosResponse<any>>}
   */
  static createGroup(name) {
    return axiosHandler.post(`${process.env.VUE_APP_API_ENDPOINT}/v1/groups`, {
      name,
      company_id: getCompanyId(),
    });
  }

  /**
   * Get all groups with relations
   *
   * @returns {Promise<AxiosResponse<any>>}
   */
  static getAllGroups() {
    return axiosHandler.get(`${process.env.VUE_APP_API_ENDPOINT}/v1/groups`, {
      params: {
        company_id: getCompanyId(),
      },
    });
  }
  /**
   * Get all groups without relations
   *
   * @returns {Promise<AxiosResponse<any>>}
   */
  static getAllGroupsOnly() {
    return axiosHandler.get(`${process.env.VUE_APP_API_ENDPOINT}/v1/groups/list/only`, {
      params: {
        company_id: getCompanyId(),
      },
    });
  }
  /**
   * Update group
   *
   * @param {string} id
   * @param {string} name
   * @returns {Promise<AxiosResponse<any>>}
   */
  static updateGroup({ id, name }) {
    return axiosHandler.patch(`${process.env.VUE_APP_API_ENDPOINT}/v1/groups`, {
      id,
      name,
      company_id: getCompanyId(),
    });
  }

  /**
   * Remove group
   *
   * @param {string} id
   * @returns {Promise<AxiosResponse<any>>}
   */
  static deleteGroup(id) {
    return axiosHandler.delete(`${process.env.VUE_APP_API_ENDPOINT}/v1/groups/${id}`, {
      params: {
        company_id: getCompanyId(),
      },
    });
  }
}
