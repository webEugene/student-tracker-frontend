import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { messages } from '@/locale/messages';

Vue.use(VueI18n);

const defaultLocale = 'uk';

const i18n = new VueI18n({
  locale: defaultLocale,
  fallbackLocale: 'en',
  silentFallbackWarn: true,
  messages,
});

export { VueI18n, i18n, defaultLocale };
