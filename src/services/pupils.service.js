import { axiosHandler } from '@/axios.config';
import getCompanyId from '../helpers/getCompanyId';
import getTariffPermission from "../helpers/getTariffPermission";

export { PupilsService };

class PupilsService {
  /**
   * Create a new pupil
   *
   * @returns {Promise<AxiosResponse<any>>}
   * @param params
   */
  static createPupil(params) {
    // const { name, surname, mobilePhone, birthday, group_id, gender } = params;
    return axiosHandler.post(`${process.env.VUE_APP_API_ENDPOINT}/v1/pupils`, {
      ...params,
      company_id: getCompanyId(),
      tariff_permission: getTariffPermission(),
    });
  }

  /**
   * Update a new pupil
   *
   * @returns {Promise<AxiosResponse<any>>}
   * @param id
   * @param params
   */
  static updatePupil(id, params) {
    // const { name, surname, phone, birthday, group_id, gender } = params;
    return axiosHandler.patch(`${process.env.VUE_APP_API_ENDPOINT}/v1/pupils/${id}`, {
      ...params,
      company_id: getCompanyId(),
    });
  }

  /**
   * Delete pupil
   *
   * @param {string} id
   * @returns {Promise<AxiosResponse<any>>}
   */
  static deletePupil(id) {
    return axiosHandler.delete(`${process.env.VUE_APP_API_ENDPOINT}/v1/pupils/${id}`, {
      params: {
        company_id: getCompanyId(),
      },
    });
  }

  /**
   * Get all pupils
   *
   * @returns {Promise<AxiosResponse<any>>}
   */
  static getAllPupils() {
    return axiosHandler.get(`${process.env.VUE_APP_API_ENDPOINT}/v1/pupils`, {
      params: {
        company_id: getCompanyId(),
      },
    });
  }

  /**
   * Get pupil by ID
   *
   * @returns {Promise<AxiosResponse<any>>}
   */
  static findOnePupil(id) {
    return axiosHandler.get(`${process.env.VUE_APP_API_ENDPOINT}/v1/pupils/${id}`, {
      params: {
        company_id: getCompanyId(),
      },
    });
  }

  /**
   * Change group for pupil
   *
   * @returns {Promise<AxiosResponse<any>>}
   */
  static pupilGroupChange(params) {
    const { id, group_id } = params;
    return axiosHandler.patch(
      `${process.env.VUE_APP_API_ENDPOINT}/v1/pupils/pupil-group-change/${id}`,
      {
        group_id,
        company_id: getCompanyId(),
      },
    );
  }

  /**
   * Set/Change pupil's avatar
   *
   * @returns {Promise<AxiosResponse<any>>}
   */
  static pupilAvatarChange(id, formData) {
    return axiosHandler.patch(
        `${process.env.VUE_APP_API_ENDPOINT}/v1/pupils/upload-avatar/${id}`,
        formData,
        {
          params: {
            company_id: getCompanyId(),
          },
        },
    );
  }

  /**
   * Delete pupil's avatar
   *
   * @returns {Promise<AxiosResponse<any>>}
   */
  static pupilRemoveAvatar(id, avatar_path) {
    return axiosHandler.delete(
      `${process.env.VUE_APP_API_ENDPOINT}/v1/pupils/delete-avatar/${id}`,
      {
        params: {
          avatar_path,
          company_id: getCompanyId(),
        },
      },
    );
  }
}
