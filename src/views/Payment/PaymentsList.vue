<template>
  <v-container fluid>
    <h1>Payments list</h1>
    <v-row>
      <v-col md="12" lg="8">
        <v-data-table
          :headers="headers"
          :items="payments"
          :loading="loading"
          class="elevation-1"
          hide-default-footer
          disable-sort
        >
          <!-- Data table output -->
          <template v-slot:item="row">
            <tr :class="{ 'tbody-tr-mobile': isMobile }">
              <td>
                <div :class="[isMobile ? 'tbody-header-mobile' : 'tbody-header-desktop']">
                  {{ headers[0].text }}:
                </div>
                {{ enumCurrency[row.item.currency] }}{{ row.item.amount }}
              </td>
              <td>
                <div :class="[isMobile ? 'tbody-header-mobile' : 'tbody-header-desktop']">
                  {{ headers[1].text }}:
                </div>
                <v-chip :color="paymentStatusColorSet(row.item.status)" label small>
                  {{ enumPaymentStatus[row.item.status] }}
                </v-chip>
              </td>
              <td>
                <div :class="[isMobile ? 'tbody-header-mobile' : 'tbody-header-desktop']">
                  {{ headers[2].text }}:
                </div>
                <v-chip color="orange" text-color="white" small>
                  {{ enumPlan[row.item.plan] }}
                </v-chip>
              </td>
              <td>
                <div :class="[isMobile ? 'tbody-header-mobile' : 'tbody-header-desktop']">
                  {{ headers[3].text }}:
                </div>
                <v-chip color="green" text-color="white" label small>
                  {{ convertDate(row.item.tariff_start_date) }}
                </v-chip>
              </td>
            </tr>
          </template>
          <!-- Show the message if there is no data -->
          <template v-slot:no-data>
            {{ $t('general.nodata') }}
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { UsersService } from '../../services/users.service';
import { Plan } from '@/common/constants/plan.enum-like';
import { PaymentStatusEnum } from '@/common/constants/payment-status.enum-like';
import { CurrencyEnum } from '@/common/constants/currency.enum-like';
export default {
  name: 'PaymentsList',
  data: () => ({
    loading: false,
    disabled: false,
    payments: [],
    isMobile: false,
    enumPlan: Plan,
    enumCurrency: CurrencyEnum,
    enumPaymentStatus: PaymentStatusEnum,
  }),
  computed: {
    headers() {
      return [
        { text: this.$t('table.header.amount'), align: 'start', value: 'amount', sortable: false },
        {
          text: this.$t('table.header.status'),
          align: 'start',
          value: 'status',
          sortable: false,
        },
        {
          text: this.$t('table.header.plan'),
          align: 'start',
          value: 'plan',
          sortable: false,
        },
        {
          text: this.$t('table.header.tariffStart'),
          align: 'start',
          value: 'tariff_start',
          sortable: false,
        },
      ];
    },
  },
  watch: {
    $route() {
      this.loadPayments();
    },
  },
  methods: {
    onResize() {
      this.isMobile = window.innerWidth < 600;
    },
    async loadPayments() {
      const { id } = JSON.parse(localStorage.getItem('userInfo'));
      this.beforeLoading();
      await UsersService.getAllPayments(id)
        .then((response) => {
          this.payments = response.data;
        })
        .catch(() => {});
      this.afterLoading();
    },
    beforeLoading() {
      this.loading = true;
      this.disabled = true;
    },
    afterLoading() {
      this.loading = false;
      this.disabled = false;
    },
    convertDate(date) {
      const parseDate = Date.parse(date);
      return new Date(parseDate).toLocaleString();
    },
    paymentStatusColorSet(status) {
      switch (status) {
        case 0:
          return 'primary';
        case 1:
          return '#ffd166';
        case 2:
          return '#06d6a0';
      }
    },
  },
  beforeDestroy() {
    if (typeof window === 'undefined') return;

    window.removeEventListener('resize', this.onResize, { passive: true });
  },
  mounted() {
    this.loadPayments();
    this.onResize();
    window.addEventListener('resize', this.onResize, { passive: true });
  },
};
</script>
