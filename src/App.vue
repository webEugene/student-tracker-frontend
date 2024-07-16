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
  metaInfo: {
    title: 'KiddySafe Title',
    titleTemplate: '%s | kiddysafe.com',
    meta: [{ name: 'description', content: 'An example Vue application with vue-meta.' }],
  },
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
