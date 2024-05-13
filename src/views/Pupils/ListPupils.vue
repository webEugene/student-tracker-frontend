<template>
  <v-container fluid>
    <h1>{{ $t('pupil.title.list') }}</h1>
    <v-autocomplete
      clearable
      dense
      solo
      :items="groupsList"
      item-text="name"
      :label="$t('general.sortBy.group')"
      v-model="groupFilterValue"
    ></v-autocomplete>
    <v-data-table
      :headers="headers"
      :items="pupils"
      :loading="loading"
      :items-per-page="-1"
      class="elevation-1"
      hide-default-footer
      disable-sort
    >
      <template v-slot:top>
        <!-- Start Edit Dialog -->
        <v-dialog v-model="dialogEditGroup" persistent max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">{{ $t('dialog.heading.edit.group') }}</span>
            </v-card-title>
            <v-card-text>
              <v-chip class="mt-2" label color="primary"
                >{{ $t('dialog.chip.for') }} {{ editedItem.name }}
              </v-chip>
              <v-container>
                <v-row>
                  <v-col cols="12" lg="6">
                    <v-combobox
                      v-model="editedItem.group"
                      :items="groupsList"
                      item-text="name"
                    ></v-combobox>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDialogs">{{
                $t('buttons.cancel')
              }}</v-btn>
              <v-btn color="success darken-1" text @click="changeGroupForPupil(editedItem.id)">{{
                $t('buttons.edit')
              }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- End Edit Dialog -->
        <!-- Start Came At Dialog -->
        <v-dialog v-model="dialogCameAt" persistent max-width="400px">
          <v-card>
            <v-card-title>
              <span class="headline">{{ $t('dialog.heading.time.came') }}</span>
            </v-card-title>
            <v-card-text>
              <v-chip class="mt-2" label color="primary">{{ editedItem.name }}</v-chip>
              <v-container>
                <v-row>
                  <v-col cols="12" lg="6">
                    <v-combobox
                      v-if="!editedItem.came_at"
                      v-model="editedItem.brought"
                      :items="filteredRelatives"
                      item-text="name"
                    ></v-combobox>
                    <div v-else>
                      {{ $t('general.who') }}: {{ editedItem.brought | relativesFilter }}
                    </div>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDialogs">{{
                $t('buttons.cancel')
              }}</v-btn>
              <v-btn
                v-if="!editedItem.came_at"
                color="success darken-1"
                text
                @click="setCameTime"
                :disabled="!editedItem?.brought"
                >{{ $t('buttons.setTime') }}</v-btn
              >
              <v-chip
                v-else
                class="ma-2"
                :input-value="true"
                filter
                color="green darken-1"
                label
                outlined
              >
                {{ $t('dialog.chip.time.set') }}
              </v-chip>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- End Came At Dialog -->
        <!-- Start Came At Dialog -->
        <v-dialog v-model="dialogLeftAt" persistent max-width="400px">
          <v-card>
            <v-card-title>
              <span class="headline">{{ $t('dialog.heading.time.left') }}</span>
            </v-card-title>
            <v-card-text>
              <v-chip class="mt-2" label color="primary">
                {{ editedItem.name }}
              </v-chip>
              <v-container>
                <v-row>
                  <v-col cols="12" lg="6">
                    <v-combobox
                      v-if="!editedItem.left_at"
                      v-model="editedItem.took"
                      :items="filteredRelatives"
                      item-text="name"
                    ></v-combobox>
                    <div v-else>
                      {{ $t('general.who') }}: {{ editedItem.took | relativesFilter }}
                    </div>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDialogs">{{
                $t('buttons.cancel')
              }}</v-btn>
              <v-btn
                v-if="!editedItem.left_at"
                color="success darken-1"
                text
                :disabled="!editedItem?.took"
                @click="setLeftTime(editedItem.id)"
                >{{ $t('buttons.setTime') }}</v-btn
              >
              <v-chip
                v-else
                class="ma-2"
                :input-value="true"
                filter
                color="green darken-1"
                label
                outlined
              >
                {{ $t('dialog.chip.time.set') }}
              </v-chip>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- End Came At Dialog -->
      </template>
      <!-- Data table output -->
      <template v-slot:item="row">
        <tr :class="{ 'tbody-tr-mobile': isMobile }">
          <td>
            <div :class="[isMobile ? 'tbody-header-mobile' : 'tbody-header-desktop']">
              {{ headers[0].text }}:
            </div>
            <span>{{ row.item.name }} {{ row.item.surname }}</span>
            <div class="d-sm-none d-md-none d-lg-none tbody-redirect-mobile" v-if="$can('admin')">
              <v-btn
                fab
                x-small
                icon
                class="btn-domain-page"
                router
                :to="{
                  name: 'PupilProfile',
                  params: { id: row.item.id },
                }"
                ><v-icon>mdi-dots-vertical</v-icon></v-btn
              >
            </div>
            <div class="d-none d-sm-inline-block">
              <v-tooltip top v-if="$can('admin')">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    fab
                    x-small
                    icon
                    v-bind="attrs"
                    v-on="on"
                    class="btn-domain-page"
                    router
                    :to="{
                      name: 'PupilProfile',
                      params: { id: row.item.id },
                    }"
                    ><v-icon>mdi-dots-vertical</v-icon></v-btn
                  >
                </template>
                <span>{{ $t('pupil.redirectTo') }}</span>
              </v-tooltip>
            </div>
          </td>
          <td :class="{ 'flex-in-one-line-td': isMobile }">
            <div :class="[isMobile ? 'tbody-header-mobile' : 'tbody-header-desktop']">
              {{ headers[1].text }}:
            </div>
            <v-icon v-if="row.item.gender === 'male'" left>mdi-human-male</v-icon>
            <v-icon v-if="row.item.gender === 'female'" left>mdi-human-female</v-icon>
          </td>
          <td>
            <div :class="[isMobile ? 'tbody-header-mobile' : 'tbody-header-desktop']">
              {{ headers[2].text }}:
            </div>
            <v-chip v-if="row.item.group" color="primary" label>
              {{ row.item.group.name }}
            </v-chip>
            <v-chip v-else label small> - </v-chip>
          </td>
          <td>
            <div :class="[isMobile ? 'tbody-header-mobile' : 'tbody-header-desktop']">
              {{ headers[3].text }}:
            </div>
            <v-chip v-if="row.item.group && row.item.group.teacher" class="" color="primary" label>
              <v-icon left> mdi-account-circle-outline </v-icon>
              {{ row.item.group.teacher.name }} {{ row.item.group.teacher.surname }}
            </v-chip>
            <v-chip center v-else label small> - </v-chip>
          </td>
          <td>
            <div :class="[isMobile ? 'tbody-header-mobile' : 'tbody-header-desktop']">
              {{ headers[4].text }}:
            </div>
            <v-chip :color="getCameTime(row.item).color" dark small>
              {{ getCameTime(row.item).text }}
            </v-chip>
            <span v-if="conditionBySomebody(row.item.visits, 'brought')" class="ml-1"
              >{{ $t('general.who') }}:
              {{ getBySomebody(row.item.visits, 'brought') | relativesFilter }}</span
            >
          </td>
          <td>
            <div :class="[isMobile ? 'tbody-header-mobile' : 'tbody-header-desktop']">
              {{ headers[5].text }}:
            </div>
            <v-chip :color="getLeftTime(row.item).color" dark small>
              {{ getLeftTime(row.item).text }}
            </v-chip>
            <span v-if="conditionBySomebody(row.item.visits, 'took')" class="ml-1"
              >{{ $t('general.who') }}:
              {{ getBySomebody(row.item.visits, 'took') | relativesFilter }}</span
            >
          </td>
          <td :class="{ 'flex-in-one-line-td': isMobile }">
            <div :class="[isMobile ? 'tbody-header-mobile' : 'tbody-header-desktop']">
              {{ headers[6].text }}:
            </div>
            <div class="d-sm-none d-md-none d-lg-none tbody-actions-mobile" v-if="$can('admin')">
              <v-btn
                class="mx-1 mr-1"
                fab
                dark
                x-small
                color="primary"
                @click="showEditGroupDialog(row.item)"
              >
                <v-icon dark> mdi-account-edit-outline </v-icon>
              </v-btn>
              <v-btn
                class="mx-1 mr-1 disabled-action"
                fab
                dark
                x-small
                color="primary"
                @click="showCameAtDialog(row.item)"
              >
                <v-icon dark> mdi-account-arrow-left-outline </v-icon>
              </v-btn>
              <v-btn
                class="mx-1 mr-1 disabled-action"
                fab
                dark
                x-small
                color="primary"
                :disabled="getCameTime(row.item).showLeftTimeTooltip"
                @click="showLeftAtDialog(row.item)"
              >
                <v-icon dark> mdi-account-arrow-right-outline </v-icon>
              </v-btn>
            </div>
            <div class="d-none d-sm-flex">
              <v-tooltip top v-if="$can('admin')">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="mx-1 mr-1"
                    fab
                    dark
                    x-small
                    color="primary"
                    v-bind="attrs"
                    v-on="on"
                    @click="showEditGroupDialog(row.item)"
                  >
                    <v-icon dark> mdi-account-edit-outline </v-icon>
                  </v-btn>
                </template>
                <span>{{ $t('tooltips.edit.group') }}</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="mx-1 mr-1 disabled-action"
                    fab
                    dark
                    x-small
                    color="primary"
                    v-bind="attrs"
                    v-on="on"
                    @click="showCameAtDialog(row.item)"
                  >
                    <v-icon dark> mdi-account-arrow-left-outline </v-icon>
                  </v-btn>
                </template>
                <span>{{ $t('tooltips.set.time.arrival') }}</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="mx-1 mr-1 disabled-action"
                    fab
                    dark
                    x-small
                    color="primary"
                    v-bind="attrs"
                    v-on="on"
                    :disabled="getCameTime(row.item).showLeftTimeTooltip"
                    @click="showLeftAtDialog(row.item)"
                  >
                    <v-icon dark> mdi-account-arrow-right-outline </v-icon>
                  </v-btn>
                </template>
                <span>{{ $t('tooltips.set.time.leave') }}</span>
              </v-tooltip>
            </div>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { PupilsService } from '@/services/pupils.service';
import { GroupsService } from '@/services/groups.service';
import { VisitsService } from '@/services/visits.service';
import relativesFilter from '@/filters/relativesFilter';
export default {
  name: 'ListPupils',
  data: () => ({
    loading: false,
    disabled: false,
    dialogEditGroup: false,
    dialogCameAt: false,
    dialogLeftAt: false,
    editedIndex: -1,
    editedItem: {
      id: '',
      name: '',
      group: '',
      came_at: '',
      brought: null,
      left_at: '',
      took: null,
    },
    defaultItem: {
      id: '',
      name: '',
      group: '',
      came_at: '',
      brought: null,
      left_at: '',
      took: null,
    },
    groupsList: [],
    relativesList: [{ value: 0 }, { value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }],
    pupils: [],
    groupFilterValue: '',
    isMobile: false,
  }),
  computed: {
    filteredRelatives() {
      return this.relativesList.map((item) => {
        return {
          value: item.value,
          name: relativesFilter(item.value),
        };
      });
    },
    headers() {
      return [
        {
          text: `${this.$t('table.header.name')}/${this.$t('table.header.surname')}`,
          align: 'start',
          value: 'name',
          sortable: false,
        },
        { text: this.$t('table.header.gender'), value: 'gender', sortable: false },
        { text: this.$t('table.header.group'), value: 'group', filter: this.sortByGroup },
        { text: this.$t('table.header.teacher'), value: 'teacher', sortable: false },
        { text: this.$t('table.header.came'), value: 'came_at', sortable: false },
        { text: this.$t('table.header.left'), value: 'leave_at', sortable: false },
        { text: this.$t('table.header.actions'), value: 'actions', sortable: false },
      ];
    },
  },
  methods: {
    conditionBySomebody(value, by) {
      const getValue = this.getBySomebody(value, by);
      return getValue === 0 ? true : Boolean(getValue);
    },
    sortByGroup(value) {
      // If this filter has no value we just skip the entire filter.
      if (!this.groupFilterValue) {
        return true;
      }
      // Check if the current loop value
      // equals to the selected value at the <v-select>
      return value?.name === this.groupFilterValue;
    },
    async loadGroups() {
      this.beforeLoading();
      await GroupsService.getAllGroups()
        .then((response) => {
          this.groupsList = response.data;
        })
        .catch((error) => console.log(error));
      this.afterLoading();
    },
    async loadPupils() {
      this.beforeLoading();
      await PupilsService.getAllPupils()
        .then((response) => {
          this.pupils = response.data;
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
    getCameTime(value) {
      if (value?.visits === undefined || value?.visits[0]?.came_at === undefined) {
        return {
          showLeftTimeTooltip: true,
          color: 'red',
          text: `${this.$t('general.set.time.not')}`,
        };
      } else {
        const parseDate = Date.parse(value?.visits[0]?.came_at);
        return {
          showLeftTimeTooltip: false,
          color: 'green',
          text: new Date(parseDate).toLocaleString(),
        };
      }
    },
    getLeftTime(value) {
      if (
        value?.visits === undefined ||
        value?.visits[0]?.left_at === undefined ||
        value?.visits[0]?.left_at === null
      ) {
        return {
          color: 'red',
          text: `${this.$t('general.set.time.not')}`,
        };
      } else {
        const parseDate = Date.parse(value?.visits[0]?.left_at);
        return {
          color: 'green',
          text: new Date(parseDate).toLocaleString(),
        };
      }
    },
    async changeGroupForPupil(id) {
      this.beforeLoading();
      await PupilsService.pupilGroupChange({ id, group_id: this.editedItem.group.id })
        .then(() => {
          this.loadPupils();
          this.$toast.success(this.$t('success.pupil.edit.group'));
        })
        .catch((error) => {
          this.$toast.error(`${this.$t('error.general.oops')} ${error.message}`);
        });
      this.afterLoading();
      this.closeDialogs();
    },
    async setCameTime() {
      this.beforeLoading();
      const d = new Date();
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));

      await VisitsService.setPupilCameVisit({
        pupil_id: this.editedItem.id,
        came_at: d.toISOString(),
        brought: this.editedItem.brought.value,
        came_confirmer: `${userInfo.name} ${userInfo.surname}`,
      })
        .then(() => {
          this.loadPupils();
          this.$toast.success(this.$t('success.pupil.set.time'));
        })
        .catch((error) => {
          this.$toast.error(`${this.$t('error.general.oops')} ${error.message}`);
        });
      this.afterLoading();
      this.closeDialogs();
    },
    async setLeftTime(visitId) {
      this.beforeLoading();
      const d = new Date();
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));

      await VisitsService.setPupilLeftVisit({
        id: visitId,
        left_at: d.toISOString(),
        took: this.editedItem.took.value,
        left_confirmer: `${userInfo.name} ${userInfo.surname}`,
      })
        .then(() => {
          this.loadPupils();
          this.$toast.success(this.$t('success.pupil.set.time'));
        })
        .catch((error) => {
          this.$toast.error(`${this.$t('error.general.oops')} ${error.message}`);
        });
      this.afterLoading();
      this.closeDialogs();
    },
    closeDialogs() {
      // Close the modal window and reset the editable data
      this.dialogEditGroup = false;
      this.dialogCameAt = false;
      this.dialogLeftAt = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      // this.$v.editedItem.$reset();
    },
    showEditGroupDialog(item) {
      // Get the object properties of the editable element
      this.editedIndex = this.pupils.indexOf(item);
      this.editedItem = Object.assign(
        {},
        {
          id: item.id,
          name: item.name + ' ' + item.surname,
          group: item.group,
        },
      );
      this.dialogEditGroup = true;
    },
    showCameAtDialog(item) {
      // Get the object properties of the editable element
      const parseDate = item?.visits[0]?.came_at ? Date.parse(item?.visits[0]?.came_at) : '';
      this.editedIndex = this.pupils.indexOf(item);
      this.editedItem = Object.assign(
        {},
        {
          id: item.id,
          name: item.name + ' ' + item.surname,
          brought: typeof item?.visits[0]?.brought === 'number' ? item?.visits[0]?.brought : '',
          came_at: parseDate ? new Date(parseDate).toLocaleString() : '',
        },
      );
      this.dialogCameAt = true;
    },
    showLeftAtDialog(item) {
      // Get the object properties of the editable element
      const parseDate = item?.visits[0]?.left_at ? Date.parse(item?.visits[0]?.left_at) : '';
      this.editedIndex = this.pupils.indexOf(item);
      this.editedItem = Object.assign(
        {},
        {
          id: item?.visits[0]?.id,
          name: item.name + ' ' + item.surname,
          left_at: parseDate ? new Date(parseDate).toLocaleString() : '',
          took: typeof item?.visits[0]?.took === 'number' ? item?.visits[0]?.took : '',
        },
      );
      this.dialogLeftAt = true;
    },
    onResize() {
      this.isMobile = window.innerWidth < 600;
    },
  },
  watch: {
    $route() {
      this.loadPupils();
    },
  },
  beforeDestroy() {
    if (typeof window === 'undefined') return;

    window.removeEventListener('resize', this.onResize, { passive: true });
  },
  mounted() {
    this.loadPupils();
    this.loadGroups();
    this.onResize();

    window.addEventListener('resize', this.onResize, { passive: true });
  },
};
</script>
<style lang="scss" scoped>
.disabled-action.v-btn.v-btn--disabled.v-btn--has-bg {
  background-color: rgb(0 0 0 / 25%) !important;
}
//.theme--dark.v-btn.v-btn--disabled.v-btn--has-bg
</style>
