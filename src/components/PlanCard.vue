<template>
  <v-card class="mx-4 d-flex flex-column" width="250" outlined>
    <v-chip class="mx-auto ma-4" color="primary" label>{{ enumPlan[currentPlan.plan] }}</v-chip>
    <v-card-title class="mx-auto">
      <span class="price-style">{{ truncPrice(currentPlan.price) }}</span>
      <sup><small>{{ currentPlan.currency_code }}</small></sup>
      / {{$t('plans.title') }}
    </v-card-title>
    <v-card-subtitle class="mx-auto py-2">{{ currentPlan.description }}</v-card-subtitle>
    <v-divider class="mx-2"></v-divider>
    <v-card-text class="text--primary">
      <ul v-html="$t(`plans.tariffs.${[enumPlan[currentPlan.plan].toLowerCase()]}`)">
      </ul>

    </v-card-text>
    <v-divider class="mx-2"></v-divider>
    <v-card-actions class="">
      <v-btn
          color="primary"
          class="d-flex mx-auto my-2"
          @click="goToRegister(currentPlan)"
      >
        {{ $t('plans.button.choose') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import router from "@/router";
import { Plan } from '@/common/constants/plan.enum-like';
import planNumberFilter from "@/filters/planNumberFilter";

export default {
  name: "PlanCard",
  props: {
    currentPlan: {
      type: Object,
      required: true,
    }
  },
  data: () => ({
    enumPlan: Plan,
  }),
  methods: {
    truncPrice(price) {
      return Math.trunc(price);
    },
    goToRegister(chosenPlan) {
      return router.push(`/register?tariff=${planNumberFilter(chosenPlan).plan}`);
    },
  },
}
</script>

<style scoped>
.price-style {
  font-size: 40px;
  color: #1976d2;
}
</style>
