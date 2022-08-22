import { axiosHandler } from '../axios.config';
import getCompanyId from '../helpers/getCompanyId';

export { TeachersService };

class TeachersService {
  /**
   * Create a new teachers
   *
   * @param {string} name
   * @returns {Promise<AxiosResponse<any>>}
   */
  static createTeacher(params) {
    // const { name, surname, mobilePhone, group_id, birthday } = params;
    return axiosHandler.post(`${process.env.VUE_APP_API_ENDPOINT}/v1/teachers`, {
      ...params,
      company_id: getCompanyId(),
    });
  }

  /**
   * Get all teachers
   *
   * @returns {Promise<AxiosResponse<any>>}
   */
  static getAllTeachers() {
    return axiosHandler.get(`${process.env.VUE_APP_API_ENDPOINT}/v1/teachers`, {
      params: {
        company_id: getCompanyId(),
      },
    });
  }

  /**
   * Get teachers by ID
   *
   * @returns {Promise<AxiosResponse<any>>}
   */
  static findOneTeacher(id) {
    return axiosHandler.get(`${process.env.VUE_APP_API_ENDPOINT}/v1/teachers/${id}`, {
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
  static deleteTeacher(id) {
    return axiosHandler.delete(`${process.env.VUE_APP_API_ENDPOINT}/v1/teachers/${id}`, {
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
  static updateTeacher(id, params) {
    // const { name, surname, mobilePhone, birthday, group_id } = params;
    return axiosHandler.patch(`${process.env.VUE_APP_API_ENDPOINT}/v1/teachers/${id}`, {
      ...params,
      company_id: getCompanyId(),
    });
  }

  /**
   * Set/Change teachers\'s avatar
   *
   * @returns {Promise<AxiosResponse<any>>}
   */
  static teacherAvatarChange(id, formData) {
    return axiosHandler.patch(
      `${process.env.VUE_APP_API_ENDPOINT}/v1/teachers/upload-avatar/${id}`,
      formData,
      {
        params: {
          company_id: getCompanyId(),
        },
      },
    );
  }
}
