<template>
  <div id="app">
    <component :is="setLayout">
      <router-view />
    </component>
  </div>
</template>

<style lang="scss">
@import './assets/global.scss';
</style>

<script>
import EmptyLayout from '@/layouts/EmptyLayout';
import MainLayout from '@/layouts/MainLayout';
export default {
  name: 'App',
  computed: {
    setLayout() {
      return (this.$route.meta.layout || 'empty') + '-layout';
    },
  },
  components: {
    EmptyLayout,
    MainLayout,
  },
};
</script>
