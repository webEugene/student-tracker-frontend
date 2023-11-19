<template>
  <v-app id="inspire">
    <v-app-bar clipped-rightdark app color="green darken-1" dense dark>
      <v-icon>mdi-timer-lock-outline</v-icon>
      <v-toolbar-title class="ml-2 d-none d-md-block">{{ appName }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <LanguageSwitcher />
    </v-app-bar>
    <Main />
    <Footer />
  </v-app>
</template>

<script>
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Main from '@/components/Main';
import Footer from '@/components/Footer';
export default {
  data: () => ({
    appName: 'Pupils Management Tracker',
  }),
  components: {
    Main,
    Footer,
    LanguageSwitcher,
  },
};
</script>
