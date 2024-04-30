<template>
  <v-container fluid>
    <h1>Сторінка оплати тарифного плану</h1>
    <v-card class="mx-auto my-12" max-width="374">
      <v-card-title>Оплата за тарифом</v-card-title>
      <v-card-text>
        <div class="payment-total">
          <div><strong>Сумма</strong></div>
          <div v-if="amount">
            <strong>{{ amount }}</strong>
          </div>
        </div>
      </v-card-text>
      <v-card-actions>
        <div v-html="form"></div>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
import { PaymentService } from '@/services/payment.service';

export default {
  name: 'PaymentPage',
  data: () => ({
    form: null,
    amount: null,
    company_id: null,
    plan: null,
    company_name: null,
  }),
  created() {
    this.amount = this.$route.params?.amount.toString();
    this.company_id = this.$route.params?.company_id;
    this.plan = this.$route.params?.plan;
    this.company_name = this.$route.params?.company_name;
  },
  mounted() {
    this.form = '';
    this.getFormLiqpay(this.amount, this.company_id, this.plan, this.company_name);
  },
  methods: {
    async getFormLiqpay(amount, company_id, plan, company_name) {
      await PaymentService.createPaymentFormLiqPay({
        amount,
        company_id,
        plan,
        company_name,
      })
        .then((response) => {
          // console.log(response.data);
          this.form = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.payment-total {
  display: flex;
  justify-content: space-between;
  border-bottom: 2px dotted;
}
</style>
