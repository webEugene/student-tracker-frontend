<template>
  <v-container fluid>
    <h1>Список учеников</h1>
    <v-data-table :headers="headers" :items="students" class="elevation-1">
      <template v-slot:top>
        <!-- Start Edit Dialog -->
        <v-dialog v-model="dialogEdit" persistent max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">Edit</span>
            </v-card-title>
            <v-card-text>
              <v-chip class="mt-2" label color="primary">
                {{ editedItem.name }}
              </v-chip>
              <v-container>
                <v-row>
                  <v-col cols="12" lg="6">
                    <v-combobox :items="groupsList" item-text="name" hide-selected></v-combobox>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDialogs">Cancel</v-btn>
              <v-btn color="error darken-1" text @click="editStudent">Edit</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- End Edit Dialog -->
        <!-- Start Came At Dialog -->
        <v-dialog v-model="dialogCameAt" persistent max-width="400px">
          <v-card>
            <v-card-title>
              <span class="headline">Fix Arrive Time</span>
            </v-card-title>
            <v-card-text>
              <v-chip class="mt-2" label color="primary">
                {{ editedItem.name }}
              </v-chip>
              <v-container>
                <v-row>
                  <v-col cols="12" lg="6">
                    <v-combobox
                      :items="relativesList"
                      item-text="relative"
                      hide-selected
                    ></v-combobox>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDialogs">Cancel</v-btn>
              <v-btn color="error darken-1" text @click="fixCameAtTime">Fix Time</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- End Came At Dialog -->
        <!-- Start Came At Dialog -->
        <v-dialog v-model="dialogLeftAt" persistent max-width="400px">
          <v-card>
            <v-card-title>
              <span class="headline">Fix Left Time</span>
            </v-card-title>
            <v-card-text>
              <v-chip class="mt-2" label color="primary">
                {{ editedItem.name }}
              </v-chip>
              <v-container>
                <v-row>
                  <v-col cols="12" lg="6">
                    <v-combobox
                      :items="relativesList"
                      item-text="relative"
                      hide-selected
                    ></v-combobox>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDialogs">Cancel</v-btn>
              <v-btn color="error darken-1" text @click="fixLeftAtTime">Fix Time</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- End Came At Dialog -->
      </template>
      <!-- Data table output -->
      <template v-slot:item="row">
        <tr>
          <td>{{ row.item.name }}</td>
          <td>{{ row.item.group }}</td>
          <td>
            <v-chip :color="getColor(row.item.came_at)" dark small>
              {{ getText(row.item.came_at) }}
            </v-chip>
            <span v-if="row.item.brought" class="ml-1">Привел(а): {{ row.item.brought }}</span>
          </td>
          <td>
            <v-chip :color="getColor(row.item.left_at)" dark small>
              {{ getText(row.item.left_at) }}
            </v-chip>
            <span v-if="row.item.took" class="ml-1">Забрал(а): {{ row.item.took }}</span>
          </td>
          <td>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="mx-1 mr-1"
                  fab
                  dark
                  x-small
                  color="primary"
                  v-bind="attrs"
                  v-on="on"
                  @click="showEditDialog(row.item)"
                >
                  <v-icon dark> mdi-account-edit-outline </v-icon>
                </v-btn>
              </template>
              <span>Edit</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="mx-1 mr-1"
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
              <span>Came At</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="mx-1 mr-1"
                  fab
                  dark
                  x-small
                  color="primary"
                  v-bind="attrs"
                  v-on="on"
                  @click="showLeftAtDialog(row.item)"
                >
                  <v-icon dark> mdi-account-arrow-right-outline </v-icon>
                </v-btn>
              </template>
              <span>Leave At</span>
            </v-tooltip>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  name: 'ListStudents',
  data: () => ({
    dialogEdit: false,
    dialogCameAt: false,
    dialogLeftAt: false,
    editedIndex: -1,
    editedItem: {
      id: '',
      name: '',
      group: '',
      came_at: '',
      brought: '',
      left_at: '',
      took: '',
    },
    defaultItem: {
      id: '',
      name: '',
      group: '',
      came_at: '',
      brought: '',
      left_at: '',
      took: '',
    },
    groupsList: [{ name: 'Montesory' }, { name: 'Main' }],
    relativesList: [
      { relative: 'Папа' },
      { relative: 'Мама' },
      { relative: 'Дедушка' },
      { relative: 'Бабушка' },
    ],
    headers: [
      {
        text: 'Name',
        align: 'start',
        value: 'name',
        sortable: false,
      },
      { text: 'Group', value: 'group', sortable: false },
      { text: 'Came At', value: 'came_at', sortable: false },
      { text: 'Leave At', value: 'leave_at', sortable: false },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    students: [],
  }),
  created() {
    this.initialize();
  },
  computed: {},
  methods: {
    initialize() {
      this.students = [
        {
          id: 1,
          name: 'Eugene Bilan',
          group: 'Montessory',
          came_at: '8:34 - 02/05/2021',
          brought: 'Father',
          left_at: '16:34 - 02/05/2021',
          took: 'Mother',
        },
        {
          id: 2,
          name: 'Dima Bilan',
          group: 'Montessory',
          came_at: '',
          brought: '',
          left_at: '',
          took: '',
        },
      ];
    },
    getColor(came_at) {
      if (!came_at) return 'red';
      else return 'green';
    },
    getText(value) {
      if (!value) return 'Отсутствовал(а)';
      else return value;
    },
    editStudent() {
      console.log('edit');
    },
    fixCameAtTime() {
      console.log('fixCameAtTime');
    },
    fixLeftAtTime() {
      console.log('fixLeftAtTime');
    },
    closeDialogs() {
      // Close the modal window and reset the editable data
      this.dialogEdit = false;
      this.dialogCameAt = false;
      this.dialogLeftAt = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      // this.$v.editedItem.$reset();
    },
    showEditDialog(item) {
      // Get the object properties of the editable element
      this.editedIndex = this.students.indexOf(item);
      this.editedItem = Object.assign(
        {},
        {
          id: item.id,
          name: item.name,
          group: item.group,
          came_at: item.came_at,
          left_at: item.left_at,
        },
      );
      this.dialogEdit = true;
    },
    showCameAtDialog(item) {
      // Get the object properties of the editable element
      this.editedIndex = this.students.indexOf(item);
      this.editedItem = Object.assign(
        {},
        {
          id: item.id,
          name: item.name,
          group: item.group,
          came_at: item.came_at,
          left_at: item.left_at,
        },
      );
      this.dialogCameAt = true;
    },
    showLeftAtDialog(item) {
      // Get the object properties of the editable element
      this.editedIndex = this.students.indexOf(item);
      this.editedItem = Object.assign(
        {},
        {
          id: item.id,
          name: item.name,
          group: item.group,
          came_at: item.came_at,
          left_at: item.left_at,
        },
      );
      this.dialogLeftAt = true;
    },
  },
};
</script>
