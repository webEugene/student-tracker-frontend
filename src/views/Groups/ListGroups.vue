<template>
  <v-container fluid>
    <h1>List Groups</h1>
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
                  <span class="headline">Редактировать группу?</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" lg="6">
                        <v-text-field
                          v-model="editedItem.name"
                          label="ВВедите домен"
                          :disabled="disabled"
                          :error-messages="getNameErrors"
                          @input="$v.editedItem.name.$touch()"
                          @blur="$v.editedItem.name.$touch()"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" class="close-dialogs-btn" text @click="closeDialogs"
                    >Cancel</v-btn
                  >
                  <v-btn
                    color="success darken-1"
                    text
                    class="update-data-dialog-btn"
                    @click="updateGroup"
                    :disabled="$v.editedItem.$invalid || disabled"
                    >Обновить</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
            <!-- Modal window for data deleting -->
            <v-dialog v-model="dialogDelete" persistent max-width="400px">
              <v-card>
                <v-card-title>Удалить группу?</v-card-title>
                <v-card-text>
                  <v-chip class="mt-2" label color="primary">
                    {{ deletedItem.name }}
                  </v-chip>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" class="close-dialogs-btn" text @click="closeDialogs"
                    >Cancel</v-btn
                  >
                  <v-btn
                    color="error darken-1"
                    text
                    class="delete-data-dialog-btn"
                    @click="deleteGroup(deletedItem.id)"
                    >Удалить</v-btn
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
                <!-- Edit button -->
                <v-tooltip top>
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
                  <span>Редактировать группу</span>
                </v-tooltip>
                <!-- Delete button -->
                <v-tooltip top>
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
                  <span>Удалить группу</span>
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
export default {
  name: 'ListGroups',
  data: () => ({
    loading: false,
    disabled: false,
    headers: [
      {
        text: 'Name',
        align: 'start',
        value: 'name',
        sortable: false,
      },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
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
      name: {
        required,
      },
    },
  },
  computed: {
    getNameErrors() {
      const errors = [];
      if (!this.$v.editedItem.name.$dirty) return errors;
      !this.$v.editedItem.name.required && errors.push('Имя группы обьязательно');
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
            this.$toast.success(`${this.editedItem.name} успешно обновлена`);
          }
          // After updating the data, the user should stay on the same page
          this.loadGroups();
        })
        .catch((error) => {
          this.$toast.error(error.message);
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
            this.$toast.success(`Группа успешно удалена`);
          }
          this.loadGroups();
        })
        .catch((error) => {
          this.$toast.error(error.message);
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
