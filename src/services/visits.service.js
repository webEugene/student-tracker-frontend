import { axiosHandler } from '../axios.config';
import getCompanyId from '../helpers/getCompanyId';

export { VisitsService };

class VisitsService {
  /**
   * Sey a new came visit
   *
   * @param {string} name
   * @returns {Promise<AxiosResponse<any>>}
   */
  static setStudentCameVisit(params) {
    const { student_id, came_at, brought } = params;
    return axiosHandler.post(`${process.env.VUE_APP_API_ENDPOINT}/v1/visits/came`, {
      student_id,
      came_at,
      brought,
      company_id: getCompanyId(),
    });
  }

  /**
   * Sey a new came visit
   *
   * @param {string} name
   * @returns {Promise<AxiosResponse<any>>}
   */
  static setStudentLeftVisit(params) {
    const { id, left_at, took } = params;
    return axiosHandler.patch(`${process.env.VUE_APP_API_ENDPOINT}/v1/visits/left/${id}`, {
      id,
      left_at,
      took,
      company_id: getCompanyId(),
    });
  }
}
