<template>
  <nav class="menu-tabs">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title> Menu </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>
    <v-list nav dense class="menu-list">
      <div v-for="(link, i) in links" :key="i">
        <v-list-item v-if="!link.subLinks" :to="link.url" class="v-list-item">
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-title v-text="link.title" />
        </v-list-item>

        <v-list-group :key="link.title" no-action :prepend-icon="link.icon" :value="false">
          <template v-slot:activator>
            <v-list-item-title>{{ link.title }}</v-list-item-title>
          </template>

          <v-list-item v-for="sublink in link.subLinks" :to="sublink.url" :key="sublink.title">
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
  data: () => ({
    links: [
      {
        title: 'Groups',
        url: '',
        icon: 'mdi-account-group',
        subLinks: [
          {
            title: 'Add Group',
            url: '/add-group',
            icon: 'mdi-group',
          },
          {
            title: 'List Groups',
            url: '/list-groups',
            icon: 'mdi-group',
          },
        ],
      },
      {
        title: 'Students',
        url: '',
        icon: 'mdi-account-group',
        subLinks: [
          {
            title: 'Add Student',
            url: '/add-students',
            icon: 'mdi-group',
          },
          {
            title: 'List Students',
            url: '/list-students',
            icon: 'mdi-group',
          },
        ],
      },
    ],
  }),
  methods: {},
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
