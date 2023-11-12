import { axiosHandler } from '@/axios.config';
import getCompanyId from '../helpers/getCompanyId';

export { VisitsService };

class VisitsService {
  /**
   * Sey a new came visit
   *
   * @returns {Promise<AxiosResponse<any>>}
   * @param params
   */
  static setPupilCameVisit(params) {
    const { pupil_id, came_at, brought, came_confirmer } = params;
    return axiosHandler.post(`${process.env.VUE_APP_API_ENDPOINT}/v1/visits/came`, {
      pupil_id,
      came_at,
      brought,
      company_id: getCompanyId(),
      came_confirmer
    });
  }

  /**
   * Sey a new came visit
   *
   * @returns {Promise<AxiosResponse<any>>}
   * @param params
   */
  static setPupilLeftVisit(params) {
    const { id, left_at, took, left_confirmer } = params;
    return axiosHandler.patch(`${process.env.VUE_APP_API_ENDPOINT}/v1/visits/left/${id}`, {
      id,
      left_at,
      took,
      company_id: getCompanyId(),
      left_confirmer
    });
  }
}
