<template>
  <v-container fluid>
    <h1>{{ $t('group.title.list') }}</h1>
    <v-row>
      <v-col cols="6" lg="6">
        <v-data-table
          :headers="headers"
          :items="groups"
          :loading="loading"
          class="elevation-1"
          hide-default-footer
          disable-sort
        >
          <template v-slot:top>
            <!-- Modal window for data editing -->
            <v-dialog v-model="dialogEdit" max-width="800px">
              <v-card>
                <v-card-title>
                  <span class="headline">{{ $t('dialog.heading.edit.group') }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" lg="6">
                        <v-text-field
                          v-model="editedItem.name"
                          :label="$t('formFields.group')"
                          :disabled="disabled"
                          :error-messages="groupErrors"
                          @input="$v.editedItem.name.$touch()"
                          @blur="$v.editedItem.name.$touch()"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    class="close-dialogs-btn"
                    text
                    @click="closeDialogs"
                    >{{ $t('buttons.cancel') }}</v-btn
                  >
                  <v-btn
                    color="success darken-1"
                    text
                    class="update-data-dialog-btn"
                    @click="updateGroup"
                    :disabled="$v.editedItem.$invalid || disabled"
                    >{{ $t('buttons.edit') }}</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
            <!-- Modal window for data deleting -->
            <v-dialog v-model="dialogDelete" persistent max-width="400px">
              <v-card>
                <v-card-title>{{ $t('dialog.heading.edit.group') }}?</v-card-title>
                <v-card-text>
                  <v-chip class="mt-2" label color="primary">
                    {{ deletedItem.name }}
                  </v-chip>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    class="close-dialogs-btn"
                    text
                    @click="closeDialogs"
                    >{{ $t('buttons.cancel') }}</v-btn
                  >
                  <v-btn
                    color="error darken-1"
                    text
                    class="delete-data-dialog-btn"
                    @click="deleteGroup(deletedItem.id)"
                  >
                    {{ $t('buttons.delete') }}</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
          <!-- Data table output -->
          <template v-slot:item="row">
            <tr>
              <td>{{ row.item.name }}</td>
              <td>
                <v-chip color="teal lighten-4" class="ml-0 mr-2 black--text" label>
                  {{ $t('general.chips.students') }}: {{ row.item.students.length }}
                </v-chip>
              </td>
              <td>
                <v-chip v-if="row.item.teacher" color="primary" label>
                  <v-icon left> mdi-account-circle-outline </v-icon>
                  {{ row.item.teacher.name }} {{ row.item.teacher.surname }}
                </v-chip>
                <v-chip v-else label> {{ $t('general.chips.attached.teacher') }} </v-chip>
              </td>
              <td>
                <!-- Edit button -->
                <v-tooltip top v-if="$can('admin')">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="show-edit-dialog-btn mx-2 mr-2"
                      fab
                      dark
                      x-small
                      color="primary"
                      @click="showEditDialog(row.item)"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon dark> mdi-pencil </v-icon>
                    </v-btn>
                  </template>
                  <span>{{ $t('tooltips.edit.group') }}</span>
                </v-tooltip>
                <!-- Delete button -->
                <v-tooltip top v-if="$can('admin')">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="show-delete-dialog-btn mx-2"
                      fab
                      dark
                      x-small
                      color="error"
                      @click="showDeleteDialog(row.item)"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon dark> mdi-delete </v-icon>
                    </v-btn>
                  </template>
                  <span>{{ $t('tooltips.delete') }}</span>
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
import { GroupsService } from '@/services/groups.service';
import { required } from 'vuelidate/lib/validators';
import { groupValidate } from '@/mixins/validators';

export default {
  name: 'ListGroups',
  data: () => ({
    loading: false,
    disabled: false,
    groups: [],
    editedIndex: -1,
    editedItem: {
      id: '',
      name: '',
    },
    defaultItem: {
      id: '',
      name: '',
    },
    dialogEdit: false,
    dialogDelete: false,
    deletedItem: {},
  }),
  validations: {
    editedItem: {
      name: { required, groupValidate },
    },
  },
  computed: {
    headers() {
      return [
        { text: this.$t('table.header.group'), align: 'start', value: 'name', sortable: false },
        {
          text: this.$t('table.header.students'),
          align: 'start',
          value: 'students',
          sortable: false,
        },
        {
          text: this.$t('table.header.teacher'),
          align: 'start',
          value: 'teacher',
          sortable: false,
        },
        { text: this.$t('table.header.actions'), value: 'actions', sortable: false },
      ];
    },
    groupErrors() {
      const errors = [];
      if (!this.$v.editedItem.name.$dirty) return errors;
      !this.$v.editedItem.name.required && errors.push(this.$t('validationErrors.group.required'));
      !this.$v.editedItem.name.groupValidate &&
        errors.push(this.$t('validationErrors.group.invalid'));
      return errors;
    },
  },
  methods: {
    async loadGroups() {
      this.beforeLoading();
      await GroupsService.getAllGroups()
        .then((response) => {
          this.groups = response.data;
        })
        .catch((error) => console.log(error));
      this.afterLoading();
    },
    async updateGroup() {
      // Validating and updating server data
      this.$v.editedItem.$touch();
      if (this.$v.editedItem.$invalid) return;

      this.closeDialogs();
      this.beforeLoading();
      await GroupsService.updateGroup({
        id: this.editedItem.id,
        name: this.editedItem.name,
      })
        .then((response) => {
          if ([200, 204].indexOf(response.status) >= 0) {
            this.$toast.success(this.$t('success.group.update'));
          }
          // After updating the data, the user should stay on the same page
          this.loadGroups();
        })
        .catch((error) => {
          this.$toast.error(`${this.$t('error.general.oops')} ${error.message}`);
          this.afterLoading();
        });
    },
    async deleteGroup(id) {
      if (!id) return;
      this.dialogDelete = false;
      this.beforeLoading();
      await GroupsService.deleteGroup(id)
        .then((response) => {
          if ([200, 204].indexOf(response.status) >= 0) {
            this.$toast.success(this.$t('success.group.delete'));
          }
          this.loadGroups();
        })
        .catch((error) => {
          this.$toast.error(`${this.$t('error.general.oops')} ${error.message}`);
          this.afterLoading();
        });
    },
    beforeLoading() {
      this.loading = true;
      this.disabled = true;
    },
    afterLoading() {
      this.loading = false;
      this.disabled = false;
    },
    showEditDialog(item) {
      // Get the object of the editable element
      this.editedIndex = this.groups.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogEdit = true;
    },
    showDeleteDialog(item) {
      // Delete the item after confirmation
      this.deletedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    closeDialogs() {
      // Close the modal window and reset the editable data
      this.dialogEdit = false;
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      this.$v.editedItem.$reset();
    },
  },
  watch: {
    $route() {
      this.loadGroups();
    },
  },
  mounted() {
    this.loadGroups();
  },
};
</script>
