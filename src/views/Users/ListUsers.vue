<template>
  <v-container fluid>
    <h1>{{ $t('user.title.list') }}</h1>
    <v-row>
      <v-col cols="6" lg="6">
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
            <tr>
              <td>
                <v-chip class="" color="primary" label>
                  <v-icon left> mdi-account-circle-outline </v-icon>
                  {{ row.item.name }} {{ row.item.surname }}
                </v-chip>
              </td>
              <td>
                {{ row.item.roles[0].value }}
              </td>
              <td>
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
  },
  watch: {
    $route() {
      this.loadUsers();
    },
  },
  mounted() {
    this.loadUsers();
  },
};
</script>

<style scoped></style>
