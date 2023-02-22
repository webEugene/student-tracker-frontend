<template>
  <nav class="menu-tabs">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>{{ $t('menu.heading') }} </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>
    <v-list nav dense class="menu-list">
      <div v-for="(link, i) in links" :key="i">
        <v-list-item
          v-if="!link.subLinks && checkMenuPermissions(link.permission)"
          :to="link.url"
          class="v-list-item"
        >
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-title v-text="link.title" />
        </v-list-item>

        <v-list-group
          v-else-if="checkMenuPermissions(link.permission)"
          :key="link.title"
          no-action
          :prepend-icon="link.icon"
          :value="false"
        >
          <template v-slot:activator>
            <v-list-item-title>{{ link.title }}</v-list-item-title>
          </template>

          <v-list-item
            v-for="sublink in link.subLinks"
            :to="sublink.url"
            :key="sublink.title"
            v-show="checkMenuPermissions(sublink.permission)"
          >
            <v-list-item-icon>
              <v-icon>{{ sublink.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ sublink.title }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
      </div>
    </v-list>
  </nav>
</template>
<script>
export default {
  data: () => ({}),
  computed: {
    links() {
      return [
        {
          title: this.$t('menu.group.mainTitle'),
          url: '',
          icon: 'mdi-account-group',
          subLinks: [
            {
              title: this.$t('menu.group.subLinks.add'),
              url: '/add-group',
              icon: 'mdi-group',
              permission: ['admin'],
            },
            {
              title: this.$t('menu.group.subLinks.list'),
              url: '/list-groups',
              icon: 'mdi-group',
              permission: ['admin', 'user'],
            },
          ],
          permission: ['admin', 'user'],
        },
        {
          title: this.$t('menu.pupil.mainTitle'),
          url: '',
          icon: 'mdi-account-group',
          subLinks: [
            {
              title: this.$t('menu.pupil.subLinks.add'),
              url: '/add-pupils',
              icon: 'mdi-account-multiple-plus-outline',
              permission: ['admin'],
            },
            {
              title: this.$t('menu.pupil.subLinks.list'),
              url: '/list-pupils',
              icon: 'mdi-card-account-details-outline',
              permission: ['admin', 'user'],
            },
          ],
          permission: ['admin', 'user'],
        },
        {
          title: this.$t('menu.teacher.mainTitle'),
          url: '',
          icon: 'mdi-human-male-board',
          subLinks: [
            {
              title: this.$t('menu.teacher.subLinks.add'),
              url: '/add-teacher',
              icon: 'mdi-account-multiple-plus',
              permission: ['admin'],
            },
            {
              title: this.$t('menu.teacher.subLinks.list'),
              url: '/list-teachers',
              icon: 'mdi-account-multiple',
              permission: ['admin'],
            },
          ],
          permission: ['admin'],
        },
        {
          title: this.$t('menu.user.mainTitle'),
          url: '',
          icon: 'mdi-account-group',
          subLinks: [
            {
              title: this.$t('menu.user.subLinks.add'),
              url: '/add-user',
              icon: 'mdi-group',
              permission: ['admin'],
            },
            {
              title: this.$t('menu.user.subLinks.list'),
              url: '/list-users',
              icon: 'mdi-group',
              permission: ['admin'],
            },
          ],
          permission: ['admin'],
        },
      ];
    },
  },
  methods: {
    checkMenuPermissions(menuElem) {
      const userPermissions = JSON.parse(localStorage.getItem('userInfo'));
      return userPermissions.roles.some((val) => menuElem.indexOf(val.value) !== -1);
    },
  },
};
</script>
<style lang="scss">
.v-application--is-ltr
  .v-list--dense.v-list--nav.menu-list
  .v-list-group--active
  > .v-list-group__items
  > .v-list-item {
  padding-left: 20px;
}
</style>
