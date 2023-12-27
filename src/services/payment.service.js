import { axiosHandler } from '@/axios.config';
// import getCompanyId from '../helpers/getCompanyId';

export { PaymentService };
class PaymentService {
  /**
   * Create payment and get Fondy checkout URL
   *
   * @returns {Promise<AxiosResponse<any>>}
   */
  static createPaymentFondy(params) {
    return axiosHandler.post(`${process.env.VUE_APP_API_ENDPOINT}/v1/payments/fondy`, {
      ...params,
    });
  }

  /**
   * Create payment and get Fondy checkout URL
   *
   * @returns {Promise<AxiosResponse<any>>}
   */
  static createPaymentFormLiqPay(params) {
    return axiosHandler.post(`${process.env.VUE_APP_API_ENDPOINT}/v1/payments/liqpay`, {
      ...params,
    });
  }
}
