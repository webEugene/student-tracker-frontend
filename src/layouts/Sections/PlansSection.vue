<template>
  <section>
    <h2 class="text-center mb-4">{{$t('plans.heading') }}</h2>
    <div class="plans d-flex justify-center">
      <plan-card v-for="(plan, index) in plans" :key="index" :current-plan="plan"></plan-card>
    </div>
  </section>
</template>

<script>
import { PlansService } from "@/services/plans.service";
import PlanCard from "@/components/PlanCard";

export default {
  name: 'PlansSection',
  components: { PlanCard },
  data: () => ({
    loading: false,
    disabled: false,
    plans: [],
    isMobile: false,
  }),
  methods: {
    async loadPlans() {
      this.beforeLoading();
      await PlansService.getAllPlansForNonLogin()
          .then((response) => {
            const sortedPlans = response.data;
            this.plans = sortedPlans.sort((a,b) => a.price - b.price);
          })
          .catch((error) => console.log(error));
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
  },
  mounted() {
    this.loadPlans();
  }
};
</script>
