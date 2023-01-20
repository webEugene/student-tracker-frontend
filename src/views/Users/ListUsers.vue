<template>
  <v-container fluid>
    <h1>{{ $t('user.title.list') }}</h1>
    <v-row>
      <v-col cols="12" xs="12" sm="8" md="6">
        <v-data-table
          :headers="headers"
          :items="users"
          :loading="loading"
          class="elevation-1"
          hide-default-footer
          disable-sort
        >
          <!-- Data table output -->
          <template v-slot:item="row">
            <tr :class="{'tbody-tr-mobile': isMobile}">
              <td>
                <div :class="[isMobile ? 'tbody-header-mobile' : 'tbody-header-desktop']">{{ headers[0].text }}:</div>
                <v-chip class="" color="primary" label>
                  <v-icon left> mdi-account-circle-outline </v-icon>
                  {{ row.item.name }} {{ row.item.surname }}
                </v-chip>
              </td>
              <td>
                <div :class="[isMobile ? 'tbody-header-mobile' : 'tbody-header-desktop']">{{ headers[1].text }}:</div>
                {{ row.item.roles[0].value }}
              </td>
              <td :class="{'flex-in-one-line-td' : isMobile}">
                <div :class="[isMobile ? 'tbody-header-mobile' : 'tbody-header-desktop']">{{ headers[2].text }}:</div>
                <div class="d-sm-none d-md-none d-lg-none tbody-actions-mobile" v-if="$can('admin')">
                  <v-btn
                      fab
                      dark
                      small
                      icon
                      color="primary"
                      router
                      :to="{
                        name: 'UserProfile',
                        params: { id: row.item.id },
                      }"
                  >
                    <v-icon>mdi-account-arrow-right-outline</v-icon>
                  </v-btn>
                </div>
                <div class="d-none d-sm-flex">
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                          fab
                          dark
                          small
                          icon
                          v-bind="attrs"
                          v-on="on"
                          color="primary"
                          router
                          :to="{
                        name: 'UserProfile',
                        params: { id: row.item.id },
                      }"
                      >
                        <v-icon>mdi-account-arrow-right-outline</v-icon>
                      </v-btn>
                    </template>
                    <span>{{ $t('user.redirectTo') }}</span>
                  </v-tooltip>
                </div>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { UsersService } from '@/services/users.service';

export default {
  name: 'UsersList',
  data: () => ({
    loading: false,
    disabled: false,
    users: [],
    isMobile: false,
  }),
  computed: {
    headers() {
      return [
        {
          text: this.$t('table.header.users'),
          align: 'start',
          value: 'name',
          sortable: false,
        },
        {
          text: this.$t('table.header.role'),
          align: 'start',
          value: 'role',
          sortable: false,
        },
        {
          text: this.$t('table.header.actions'),
          align: 'start',
          value: 'actions',
          sortable: false,
        },
      ];
    },
  },
  methods: {
    async loadUsers() {
      this.beforeLoading();
      await UsersService.getAllUsers()
        .then((response) => {
          this.users = response.data;
        })
        .catch((error) => console.log(error));
      this.afterLoading();
    },
    beforeLoading() {
      this.loading = true;
      this.disabled = true;
    },
    afterLoading() {
      this.loading = false;
      this.disabled = false;
    },
    onResize () {
      this.isMobile = window.innerWidth < 600;
    },
  },
  watch: {
    $route() {
      this.loadUsers();
    },
  },
  beforeDestroy () {
    if (typeof window === 'undefined') return;

    window.removeEventListener('resize', this.onResize, { passive: true });
  },
  mounted() {
    this.loadUsers();
    this.onResize();

    window.addEventListener('resize', this.onResize, { passive: true });
  },
};
</script>

<style scoped></style>
