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
      <ul v-html="$t(`plans.tariffs.${[enumPlan[currentPlan.plan]?.toLowerCase()]}`)">
      </ul>

    </v-card-text>
    <v-divider class="mx-2"></v-divider>
    <v-card-actions class="" v-if="hideChooseBtn">
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
import { AuthService } from '@/services/auth.service';

export default {
  name: "PlanCard",
  props: {
    currentPlan: {
      type: Object,
      required: true,
    },
    hideChooseBtn: {
      type: Boolean,
      default: true,
      required: false,
    }
  },
  data: () => ({
    enumPlan: Plan,
  }),
  computed: {
    isLoggedIn(){
      return AuthService.isLoggedIn();
    }
  },
  methods: {
    truncPrice(price) {
      return Math.trunc(price);
    },
    goToRegister(chosenPlan) {
      if(this.isLoggedIn) {
        return router.push(`/?tariff=${planNumberFilter(chosenPlan).plan}`);
      }
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
