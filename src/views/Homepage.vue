<template>
  <v-container fluid>
    <h1 class="text-center">Pupils Management Tracker</h1>
    <p class="text-center">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores, eaque!
    </p>
    <div class="plans">
      <div v-for="(plan, index) in plans" :key="index">
        {{ plan }}
      </div>
    </div>
  </v-container>
</template>

<script>
import {PlansService} from "@/services/plans.service";

export default {
  name: 'Homepage',
  data: () => ({
    loading: false,
    disabled: false,
    plans: [],
    isMobile: false,
  }),
  methods: {
    async loadPlans() {
      this.beforeLoading();
      await PlansService.getAllPlans()
          .then((response) => {
            this.plans = response.data;
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

<style scoped></style>
