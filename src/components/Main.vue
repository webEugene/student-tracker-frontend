<template>
  <v-main>
    <v-container fluid>
      <v-alert
          dense
          type="info"
      >
        You are using FREE plan with advertising. To choose other plan without advs check other <a href="/plans">plans</a>.
      </v-alert>
      <Breadcrumbs />
      <router-view />
    </v-container>
  </v-main>
</template>
<script>
import Breadcrumbs from '@/components/Breadcrumbs';
export default {
  components: {
    Breadcrumbs,
  },
};
</script>
