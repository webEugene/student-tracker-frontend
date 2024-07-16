<template>
  <v-menu offset-y>
    <template v-slot:activator="{ attrs, on }">
      <v-btn v-bind="attrs" v-on="on" text>
        <v-icon left>mdi-translate</v-icon>
        {{ activeLang }}
        <v-icon small right>mdi-menu-down</v-icon>
      </v-btn>
    </template>

    <v-list dense>
      <v-list-item
        v-for="(lang, index) in languages"
        :key="index"
        @click="changeLocale(lang.language)"
      >
        <v-list-item-title>{{ lang.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { i18n } from '@/plugins/i18n';

export default {
  name: 'LanguageSwitcher',
  data: () => ({
    activeLang: 'uk',
  }),
  computed: {
    languages() {
      return [
        { language: 'en', title: this.$t('general.flag.english') },
        { language: 'uk', title: this.$t('general.flag.ukraine') },
      ];
    },
  },
  mounted() {
    if (this.$route.query.locale) {
      i18n.locale = this.$route.query.locale;
      this.activeLang = this.$route.query.locale;
    }
  },
  methods: {
    changeLocale(locale) {
      i18n.locale = locale;
      this.activeLang = locale;
    },
  },
};
</script>
