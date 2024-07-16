<template>
  <v-container fluid class="st-page__welcome">
    <div class="ks-hero pt-5 pb-5">
      <h1 class="ks__heading ks-page__welcome--heading text-center">{{ $t('welcome.title') }}</h1>
      <span class="ks__subheading d-block text-center">{{ $t('welcome.subtitle') }}</span>
    </div>

    <div class="text-center st-page__welcome group-buttons mt-5 mb-5">
      <v-btn class="ma-2" color="secondary" @click="toLogin">
        {{ $t('buttons.login') }}
      </v-btn>
      <v-btn class="ma-2" color="secondary" @click="toRegister">
        {{ $t('buttons.register') }}
      </v-btn>
    </div>
    <plans-section class="mt-10 mb-10" />
    <section style="max-width: 900px" class="mx-auto">
      <h2 class="text-center">Чому це зручно?</h2>
      <v-alert color="cyan" border="left" elevation="2" colored-border icon="mdi-monitor-cellphone">
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
