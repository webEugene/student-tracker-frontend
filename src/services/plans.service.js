import { axiosHandler } from '@/axios.config';
// import getCompanyId from '../helpers/getCompanyId';

export { PlansService }

class PlansService {
    /**
     * Get all plans
     *
     * @returns {Promise<AxiosResponse<any>>}
     */
    static getAllPlans() {
        return axiosHandler.get(`${process.env.VUE_APP_API_ENDPOINT}/v1/plans`);
    }
}
