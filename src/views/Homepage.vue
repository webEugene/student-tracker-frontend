<template>
  <v-container fluid>
    <h1 class="text-center">Pupils Management Tracker</h1>
    <p class="text-center">
      Сервіс, що допомагає онлайн моніторити дітей з моменту, коли їх привели і до моменту коли їх забрали.
    </p>
    <plans-section />
  </v-container>
</template>

<script>
export default {
  name: 'Homepage',
  components: {
    PlansSection: () => import('@/layouts/Sections/PlansSection.vue'),
  }
};
</script>
