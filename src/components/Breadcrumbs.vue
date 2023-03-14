<template>
  <div>
    <v-breadcrumbs :items="items" v-if="!!items.length">
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item :to="item.to" class="text-subtitle-2 crumb-item" exact>{{
            item.text
          }}</v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>
  </div>
</template>
<script>
// i18n
import { i18n } from '@/plugins/i18n.js';

export default {
  name: 'Breadcrumbs',
  data: () => ({
    homePageUrls: ['/homepage'],
    homePageNames: {
      main: { to: '/homepage', text: i18n.t('breadcrumb.homepage') },
    },
  }),
  computed: {
    items() {
     return [{ to: '/homepage', text: i18n.t('breadcrumb.homepage') }];
    },
    setMainBreadcrumb() {
      return this.homePageNames[this.$route.meta.layout];
    },
    breadcrumbsList: function() {
      const page = this.$route.query?.page
          ? {
            path: `page=${this.$route.query?.page}`,
            to: `?page=${this.$route.query?.page}`,
            text: `${this.$t('breadcrumb.homepage')} ${this.$route.query?.page}`,
          }
          : '';
      let pathArray = this.$route.path.split('/');
      pathArray.shift();
      let breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {
        breadcrumbArray.push({
          path: path,
          to: breadcrumbArray[idx - 1]
              ? '/' + breadcrumbArray[idx - 1].path + '/' + path
              : '/' + path,
          text: this.$route.matched[idx]?.meta.breadcrumb || path,
        });
        return breadcrumbArray;
      }, []);
      if (page) breadcrumbs.push(page);

      if (!this.checkForHomepage(breadcrumbs)) {
        breadcrumbs.unshift(this.setMainBreadcrumb);
      } else {
        breadcrumbs.splice(0, breadcrumbs.length);
      }

      return this.checkForHomepageDuplication(breadcrumbs);
    },
  },
  methods: {
    checkForHomepage(breadcrumbs) {
      return breadcrumbs.some(elem => this.homePageUrls.includes(elem.to));
    },
    checkForHomepageDuplication(breadcrumbs) {
      return Array.from(new Set(breadcrumbs));
    },
  },
};
</script>
