<template>
  <v-container fluid class="st-page__welcome">
    <h1 class="st__heading st-page__welcome--heading">{{ $t('welcome.title') }}</h1>
    <div class="text-center st-page__welcome group-buttons">
      <v-btn class="ma-2" color="secondary" @click="toLogin">
        {{ $t('buttons.login') }}
      </v-btn>
      <v-btn class="ma-2" color="secondary" @click="toRegister">
        {{ $t('buttons.register') }}
      </v-btn>
    </div>
    <plans-section />
    <section style="max-width: 900px;" class="mx-auto">
      <h2 class="text-center">Чому це зручно?</h2>
      <v-alert
          color="cyan"
          border="left"
          elevation="2"
          colored-border
          icon="mdi-monitor-cellphone"
      >
        Простота інтерфейсу
      </v-alert>
    </section>
  </v-container>
</template>

<script>
import router from '../router';

export default {
  name: 'Welcome',
  components: {
    PlansSection: () => import('@/layouts/Sections/PlansSection.vue'),
  },
  data: () => ({}),
  methods: {
    toLogin() {
      return router.push(`/login`);
    },
    toRegister() {
      return router.push(`/register`);
    },
  },
};
</script>

<style lang="scss" scoped>
.st-page__welcome {
  &--heading {
    text-align: center;
  }
}
</style>
