<template>
  <v-container fluid>
    <h1>{{ $t('teacher.title.list') }}</h1>
    <v-row>
      <v-col cols="12" xs="12" sm="8" md="6">
        <v-data-table
          :headers="headers"
          :items="teachers"
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
                <v-chip :color="showGroup(row.item.group).color" dark small>
                  {{ showGroup(row.item.group).text }}
                </v-chip>
              </td>
              <td class="flex-in-one-line-td">
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
                        name: 'TeacherProfile',
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
                        name: 'TeacherProfile',
                        params: { id: row.item.id },
                      }"
                      >
                        <v-icon>mdi-account-arrow-right-outline</v-icon>
                      </v-btn>
                    </template>
                    <span>{{ $t('teacher.redirectTo') }}</span>
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
import { TeachersService } from '@/services/teachers.service';

export default {
  name: 'ListTeachers',
  data: () => ({
    loading: false,
    disabled: false,
    teachers: [],
    isMobile: false,
  }),
  computed: {
    headers() {
      return [
        {
          text: this.$t('table.header.teacher'),
          align: 'start',
          value: 'name',
          sortable: false,
        },
        {
          text: this.$t('table.header.group'),
          align: 'start',
          value: 'name',
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
    showGroup(value) {
      if (value === null) {
        return {
          color: 'red',
          text: this.$t('general.chips.attached.group'),
        };
      } else {
        return {
          color: 'green',
          text: value.name,
        };
      }
    },
    async loadTeachers() {
      this.beforeLoading();
      await TeachersService.getAllTeachers()
        .then((response) => {
          this.teachers = response.data;
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
      this.loadTeachers();
    },
  },
  beforeDestroy () {
    if (typeof window === 'undefined') return;

    window.removeEventListener('resize', this.onResize, { passive: true });
  },
  mounted() {
    this.loadTeachers();
    this.onResize();

    window.addEventListener('resize', this.onResize, { passive: true });
  },
};
</script>

<style scoped></style>
