<template>
  <v-app id="inspire">
    <v-app-bar clipped-rightdark app color="green darken-1" dense dark>
      <v-toolbar-title>{{ appName }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <LanguageSwitcher />
    </v-app-bar>
    <Main />
  </v-app>
</template>

<script>
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Main from '@/components/Main';
export default {
  data: () => ({
    appName: 'Students Management Tracker',
  }),
  components: {
    Main,
    LanguageSwitcher,
  },
};
</script>
