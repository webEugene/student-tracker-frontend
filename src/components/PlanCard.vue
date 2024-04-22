<template>
  <v-card
    class="mx-4 d-flex flex-column"
    :class="{ 'is-chosen-plan': isChosenPlan }"
    width="250"
    outlined
  >
    <v-chip class="mx-auto plan-position-chip" color="primary" small>{{
      enumPlan[currentPlan.plan]
    }}</v-chip>
    <v-card-title class="mx-auto mt-2">
      <span class="price-style">{{ truncPrice(currentPlan.price) }}</span>
      <sup
        ><small>{{ currentPlan.currency_code }}</small></sup
      >
      / {{ $t('plans.title') }}
    </v-card-title>
    <v-card-subtitle class="mx-auto py-2">{{ currentPlan.description }}</v-card-subtitle>
    <v-divider class="mx-2"></v-divider>
    <v-card-text class="text--primary">
      <ul v-html="$t(`plans.tariffs.${[enumPlan[currentPlan.plan]?.toLowerCase()]}`)"></ul>
    </v-card-text>
    <v-divider class="mx-2"></v-divider>
    <v-card-actions class="d-flex flex-column">
      <v-btn
        v-if="!isChosenPlan"
        color="primary"
        class="d-flex mx-auto my-2"
        @click="goToRegister(currentPlan)"
      >
        {{ $t('plans.button.choose') }}
      </v-btn>
      <v-btn
        v-if="isChosenPlan && currentPlan.plan !== 0 && paymentStatus !== 2"
        small
        class="d-flex mx-auto my-2"
        color="success"
        type="submit"
        elevation="2"
        :to="{
          name: 'PaymentPage',
          params: {
            amount: +truncPrice(currentPlan.price),
            company_id: this.companyId,
            plan: currentPlan.plan,
            company_name: this.companyName,
          },
        }"
        >{{ $t('buttons.goToPayment') }}</v-btn
      >
      <v-chip
        v-if="isChosenPlan && currentPlan.plan !== 0 && paymentStatus === 2"
        color="success"
        label
        text-color="white"
        class="d-flex mx-auto my-2 text-uppercase font-weight-bold"
      >
        <v-avatar left>
          <v-icon>mdi-checkbox-marked-circle</v-icon>
        </v-avatar>
        {{ $t('payment.status.paid') }}</v-chip
      >
      <v-chip
        v-if="isChosenPlan && currentPlan.plan !== 0 && paymentStatus === 1"
        color="orange"
        label
        text-color="white"
        class="d-flex mx-auto my-2 text-uppercase font-weight-bold"
      >
        <v-avatar left>
          <v-icon>mdi-alert</v-icon>
        </v-avatar>
        {{ $t('payment.status.unpaid') }}</v-chip
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import router from '@/router';
import { Plan } from '@/common/constants/plan.enum-like';
import planNumberFilter from '@/filters/planNumberFilter';
import { AuthService } from '@/services/auth.service';

export default {
  name: 'PlanCard',
  props: {
    currentPlan: {
      type: Object,
      required: true,
    },
    hideChooseBtn: {
      type: Boolean,
      default: true,
      required: false,
    },
    chosenPlan: {
      type: Number,
      required: false,
    },
    paymentAmount: {
      type: String,
      required: false,
    },
    companyId: {
      type: String,
      required: false,
    },
    companyName: {
      type: String,
      required: false,
    },
    paymentStatus: {
      type: Number,
      required: false,
    },
  },
  data: () => ({
    enumPlan: Plan,
  }),
  computed: {
    isLoggedIn() {
      return AuthService.isLoggedIn();
    },
    isChosenPlan() {
      return this.currentPlan.plan === this.chosenPlan;
    },
  },
  methods: {
    truncPrice(price) {
      return price ? parseFloat(price) / 100 : 0;
    },
    goToRegister(chosenPlan) {
      if (this.isLoggedIn) {
        // eslint-disable-next-line no-undef
        this.$emit('change-tariff', chosenPlan);
      } else {
        return router.push(`/register?tariff=${planNumberFilter(chosenPlan).plan}`);
      }
    },
  },
};
</script>

<style scoped>
.price-style {
  font-size: 40px;
  color: #1976d2;
}
.plan-position-chip {
  content: '';
  position: absolute;
  top: -13px;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: flex;
  max-width: 120px;
  justify-content: center;
}
.is-chosen-plan {
  transform: scale(1.1);
  border-width: 2px;
  border-color: #1976d2;
}
</style>
