<template>
  <div id="app">
    <component :is="setLayout">
      <router-view />
    </component>
  </div>
</template>

<style>
@import './assets/styles.css';
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
