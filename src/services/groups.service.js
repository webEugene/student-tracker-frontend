import { axiosHandler } from '../axios.config';

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
    });
  }

  /**
   * Get all groups
   *
   * @returns {Promise<AxiosResponse<any>>}
   */
  static getAllGroups() {
    return axiosHandler.get(`${process.env.VUE_APP_API_ENDPOINT}/v1/groups`);
  }

  /**
   * Updating group
   *
   * @param {string} id
   * @param {string} name
   * @returns {Promise<AxiosResponse<any>>}
   */
  static updateGroup({ id, name }) {
    return axiosHandler.put(`${process.env.VUE_APP_API_ENDPOINT}/v1/groups`, {
      id,
      name,
    });
  }

  /**
   * Remove group
   *
   * @param {string} id
   * @returns {Promise<AxiosResponse<any>>}
   */
  static deleteGroup(id) {
    return axiosHandler.delete(`${process.env.VUE_APP_API_ENDPOINT}/v1/groups/${id}`);
  }
}
