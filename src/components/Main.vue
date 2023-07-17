<template>
  <v-main>
    <v-container fluid>
      <div v-if="isLoggedIn">
        <v-alert
          dense
          type="info"
          v-if="false"
        >
          You are using FREE plan. Choose your tariff plan to use service with more opportunities<a href="/plans">plans</a>.
        </v-alert>
        <Breadcrumbs />
      </div>

      <router-view />
    </v-container>
  </v-main>
</template>
<script>
// import isFreePlan from '@/helpers/checkTestPlan';
import Breadcrumbs from '@/components/Breadcrumbs';
import { AuthService } from '@/services/auth.service';

export default {
  components: {
    Breadcrumbs,
  },
  computed: {
    // checkIfFreePlanIsUsed() {
    //   return isFreePlan();
    // },
    isLoggedIn(){
      return AuthService.isLoggedIn();
    }
  },
};
</script>
