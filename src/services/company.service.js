import { axiosHandler } from '@/axios.config';
import getCompanyId from '../helpers/getCompanyId';

export { CompanyService };

class CompanyService {
  /**
   * Change tariff plan for company
   *
   * @returns {Promise<AxiosResponse<any>>}
   * @param plan_id
   */
  static changeTariffPlan(plan_id, plan) {
    return axiosHandler.patch(`${process.env.VUE_APP_API_ENDPOINT}/v1/companies/change-tariff`, {
      plan_id,
      company_id: getCompanyId(),
      plan,
    });
  }
}
