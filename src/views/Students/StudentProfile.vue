<template>
  <v-container fluid>
    <h1 v-if="student.gender">
      {{ $t('student.title.profile.' + gender) }}: {{ student.name }} {{ student.surname }}
    </h1>
    <v-card>
      <!--  Tabs  -->
      <v-tabs v-model="tab" color="deep-purple accent-4" left>
        <v-tab>
          {{ $t('general.detail.title') }}
        </v-tab>
        <v-tab>
          {{ $t('student.visit.title') }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card class="mt-4" max-width="900px" :loading="loading">
            <v-card-title>{{ $t('general.detail.title') }}</v-card-title>
            <v-card-text>
              <v-dialog v-model="dialogAvatar" persistent max-width="350">
                <v-card>
                  <v-card-title class="text-h6">{{ $t('avatar.title') }}</v-card-title>
                  <v-card-text>
                    <v-file-input
                      id="avatar"
                      :rules="rules"
                      accept="image/png, image/jpeg, image/jpg"
                      :placeholder="$t('avatar.placeholder')"
                      prepend-icon="mdi-camera"
                      :label="$t('avatar.label')"
                      show-size
                      chips
                      clearable
                    ></v-file-input>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialogAvatar = false">
                      {{ $t('buttons.cancel') }}
                    </v-btn>
                    <v-btn color="green darken-1" text @click.prevent="updateAvatar">
                      {{ $t('buttons.edit') }}
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <form @submit.prevent>
                <v-row>
                  <v-col xl="12" sm="12" md="4" lg="4">
                    <div class="d-flex flex-column" style="max-width: 120px">
                      <v-avatar class="profile" color="blue-grey lighten-4" size="120" rounded>
                        <v-img
                          lazy-src="https://lux-admin-pro.indielayer.com/images/avatars/avatar1.svg"
                          max-height="150"
                          max-width="120"
                          :src="`${avatar}`"
                          :alt="`${student.name} ${student.surname}`"
                        ></v-img>
                      </v-avatar>
                      <v-btn
                        elevation="1"
                        small
                        class="mt-2"
                        @click.prevent="dialogAvatar = true"
                        >{{ $t('buttons.edit') }}</v-btn
                      >
                    </div>
                  </v-col>
                  <v-col xl="12" sm="12" md="8" lg="8">
                    <div>
                      <v-text-field
                        v-model="name"
                        :error-messages="nameErrors"
                        :label="$t('formFields.name')"
                        :disabled="disabled"
                        @input="$v.name.$touch()"
                        @blur="$v.name.$touch()"
                      ></v-text-field>
                      <v-text-field
                        v-model="surname"
                        :error-messages="surnameErrors"
                        :label="$t('formFields.surname')"
                        :disabled="disabled"
                        @input="$v.surname.$touch()"
                        @blur="$v.surname.$touch()"
                      ></v-text-field>
                      <div>Стать</div>
                      <v-radio-group v-model="gender" row :disabled="disabled">
                        <v-radio :label="$t('formFields.male')" value="male"></v-radio>
                        <v-radio :label="$t('formFields.female')" value="female"></v-radio>
                      </v-radio-group>
                      <v-text-field
                        v-model="mobilePhone"
                        :error-messages="mobilePhoneErrors"
                        :label="$t('formFields.phone')"
                        placeholder="+380991234567"
                        :disabled="disabled"
                        @input="$v.mobilePhone.$touch()"
                        @blur="$v.mobilePhone.$touch()"
                      ></v-text-field>
                      <v-dialog
                        ref="dialog"
                        v-model="modal"
                        :return-value.sync="birthday"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="birthday"
                            :label="$t('formFields.birthday')"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            :disabled="disabled"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="birthday" scrollable>
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="modal = false">
                            {{ $t('buttons.cancel') }}
                          </v-btn>
                          <v-btn text color="primary" @click="$refs.dialog.save(birthday)">
                            {{ $t('buttons.ok') }}
                          </v-btn>
                        </v-date-picker>
                      </v-dialog>
                      <v-text-field
                        v-model="email"
                        :error-messages="emailErrors"
                        :label="$t('formFields.email')"
                        @input="$v.email.$touch()"
                        @blur="$v.email.$touch()"
                        :disabled="disabled"
                      ></v-text-field>
                      <div v-if="disabled">
                        <v-text-field
                          :value="selectGroup !== null ? selectGroup.name : ''"
                          :label="$t('formFields.group')"
                          disabled
                        ></v-text-field>
                      </div>
                      <div v-else>
                        <v-select
                          v-model="selectGroup"
                          :items="groupsList"
                          :error-messages="groupErrors"
                          :label="$t('formFields.group')"
                          item-text="name"
                          item-value="id"
                          @change="$v.selectGroup.$touch()"
                          @blur="$v.selectGroup.$touch()"
                        ></v-select>
                      </div>
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col md="10">
                    <v-btn
                      small
                      class="mr-3"
                      color="success"
                      type="submit"
                      v-if="disabled"
                      @click.prevent="disabled = !disabled"
                    >
                      <v-icon left> mdi-pencil </v-icon>
                      {{ $t('buttons.edit') }}
                    </v-btn>
                    <div v-else>
                      <v-btn
                        small
                        class="mr-3"
                        color="primary"
                        type="submit"
                        :disabled="$v.$invalid || disabled || loading"
                        @click.prevent="updateStudent"
                      >
                        {{ $t('buttons.save') }}
                      </v-btn>

                      <v-btn
                        small
                        class="mr-3 white--text"
                        color="blue-grey"
                        type="submit"
                        @click.prevent="disabled = !disabled"
                      >
                        {{ $t('buttons.cancel') }}
                      </v-btn>
                    </div>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col md="2" class="text-right">
                    <v-btn
                      small
                      color="error"
                      type="submit"
                      :disabled="!disabled || loading"
                      @click.prevent="deleteDialogConfirm = !deleteDialogConfirm"
                    >
                      {{ $t('buttons.delete') }}
                    </v-btn>
                  </v-col>
                </v-row>
              </form>
            </v-card-text>
          </v-card>
          <!-- Dialog confirm -->
          <v-dialog v-model="deleteDialogConfirm" persistent max-width="500">
            <v-card>
              <v-card-title class="text-h6">
                {{ $t('dialog.heading.delete.default') }} {{ student.name }} {{ student.surname }}?
              </v-card-title>
              <v-card-text>
                <v-alert type="error">
                  <strong>{{ $t('dialog.warning.title') }}</strong
                  >: {{ $t('dialog.warning.description') }}
                </v-alert>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary darken-1" text @click="deleteDialogConfirm = false">
                  {{ $t('buttons.cancel') }}
                </v-btn>
                <v-btn color="error darken-1" text @click="deleteStudent">
                  {{ $t('buttons.approve') }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-tab-item>
        <v-tab-item>
          <v-card>
            <h3>{{ $t('student.visit.title') }}</h3>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">{{ $t('table.header.came') }}</th>
                    <th class="text-left">{{ $t('table.header.left') }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="visit in student.visits" :key="visit.id">
                    <td>
                      <v-chip :color="getTimeData(visit, 'came_at').color" dark small>
                        {{ getTimeData(visit, 'came_at').text }}
                      </v-chip>
                      <span v-if="conditionBySomebody(visit, 'brought')" class="ml-1"
                        >{{ $t('general.who') }}:
                        {{ getBySomebody(visit, 'brought') | relativesFilter }}</span
                      >
                    </td>
                    <td>
                      <v-chip :color="getTimeData(visit, 'left_at').color" dark small>
                        {{ getTimeData(visit, 'left_at').text }}
                      </v-chip>
                      <span v-if="conditionBySomebody(visit, 'took')" class="ml-1"
                        >{{ $t('general.who') }}:
                        {{ getBySomebody(visit, 'took') | relativesFilter }}</span
                      >
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
      <!--  End Tabs  -->
    </v-card>
  </v-container>
</template>

<script>
import { StudentsService } from '@/services/students.service';
import { GroupsService } from '@/services/groups.service';
import { required, email } from 'vuelidate/lib/validators';
import { nameSurnameValidate, allMobilesValidate } from '@/mixins/validators';

export default {
  name: 'StudentProfile',
  data: () => ({
    studentId: '',
    student: '',
    name: '',
    surname: '',
    selectGroup: {},
    groupsList: [],
    mobilePhone: '',
    birthday: null,
    modal: false,
    disabled: true,
    loading: false,
    gender: null,
    email: '',
    deleteDialogConfirm: false,
    avatar: '',
    dialogAvatar: false,
    rules: [
      (v) => !!v || 'File is required',
      (v) => (v && v.size > 0) || 'File is required',
      (v) => !v || v.size < 2000000 || 'Avatar size should be less than 2 MB!',
    ],
    tab: null,
  }),
  validations: {
    name: { required, nameSurnameValidate },
    surname: { required, nameSurnameValidate },
    mobilePhone: { required, allMobilesValidate },
    birthday: { required },
    email: { email },
    selectGroup: { required },
  },
  created() {
    // Start method getting domain data by id
    this.studentId = this.$route.params?.id;
    this.getStudentData(this.studentId);
  },
  watch: {},
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push(this.$t('validationErrors.name.required'));
      !this.$v.name.nameSurnameValidate && errors.push(this.$t('validationErrors.name.invalid'));
      return errors;
    },
    surnameErrors() {
      const errors = [];
      if (!this.$v.surname.$dirty) return errors;
      !this.$v.surname.required && errors.push(this.$t('validationErrors.surname.required'));
      !this.$v.surname.nameSurnameValidate &&
        errors.push(this.$t('validationErrors.surname.invalid'));
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push(this.$t('validationErrors.email.invalid'));
      return errors;
    },
    mobilePhoneErrors() {
      const errors = [];
      if (!this.$v.mobilePhone.$dirty) return errors;
      !this.$v.mobilePhone.required &&
        errors.push(this.$t('validationErrors.mobilePhone.required'));
      !this.$v.mobilePhone.allMobilesValidate &&
        errors.push(this.$t('validationErrors.mobilePhone.invalid'));
      return errors;
    },
    groupErrors() {
      const errors = [];
      if (!this.$v.selectGroup.$dirty) return errors;
      !this.$v.selectGroup.required && errors.push(this.$t('validationErrors.group.required'));
      return errors;
    },
  },
  methods: {
    conditionBySomebody(value, by) {
      const getValue = this.getBySomebody(value, by);
      return getValue === 0 ? true : Boolean(getValue);
    },
    getTimeData(value, movement) {
      if ((value || value[movement]) === undefined || value[movement] === null) {
        return {
          color: 'red',
          text: `${this.$t('general.set.time.not')}`,
        };
      } else {
        const parseDate = Date.parse(value[movement]);
        return {
          color: 'green',
          text: new Date(parseDate).toLocaleString(),
        };
      }
    },
    async updateAvatar() {
      this.disabled = true;
      this.dialogAvatar = false;
      this.beforeLoading();
      const avatarData = this.getDataFromInput();
      await StudentsService.studentAvatarChange(this.studentId, avatarData)
        .then(() => {
          this.$toast.success(this.$t('success.student.update'));
          this.getStudentData(this.studentId);
        })
        .catch((error) => {
          this.$toast.error(`${this.$t('error.general.oops')} ${error.message}`);
        });
      this.afterLoading();
    },
    getDataFromInput() {
      const getFileCSV = document.getElementById('avatar').files;
      let formData = new FormData();

      // formData.append(
      //   'avatar_path',
      //   new File([this.studentId + getFileCSV[0].name], `${getFileCSV[0].name}`, {
      //     type: getFileCSV[0].type,
      //     lastModified: getFileCSV[0].lastModified,
      //   }),
      // );

      formData.append('avatar_path', getFileCSV[0]);

      return formData;
    },
    async loadGroups() {
      await GroupsService.getAllGroupsOnly()
        .then((response) => {
          this.groupsList = response.data;
        })
        .catch((error) => console.log(error));
    },
    async getStudentData(id) {
      if (!id) return;
      this.loading = true;
      await StudentsService.findOneStudent(id)
        .then((response) => {
          this.student = response.data;
          this.setDataStudent(response.data);
        })
        .catch((error) => {
          this.$toast.error(`${this.$t('error.general.oops')} ${error.message}`);
        });
      this.loading = false;
    },
    setDataStudent(student) {
      this.name = student.name;
      this.surname = student.surname;
      this.birthday = this.birthdayFormatter(student.birthday);
      this.mobilePhone = student.mobilePhone;
      this.gender = student.gender;
      this.selectGroup = student.group;
      this.email = student.email;
      this.avatar = student.avatar_path
        ? `http://localhost:5000/profileImages/${student.avatar_path}`
        : `https://lux-admin-pro.indielayer.com/images/avatars/avatar1.svg`;
    },
    birthdayFormatter(birthday) {
      const date = new Date(birthday);
      let day = (date.getDate() < 10 ? '0' : '') + date.getDate();
      let month = (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1);
      let year = date.getFullYear();
      return `${year}-${month}-${day}`;
    },
    async updateStudent() {
      this.$v.$touch();
      if (this.$v.$invalid) return;
      this.beforeLoading();
      const preparedData = {
        name: this.name,
        surname: this.surname,
        mobilePhone: this.mobilePhone,
        birthday: this.birthday,
        group_id: typeof this.selectGroup === 'object' ? this.selectGroup.id : this.selectGroup,
        gender: this.gender,
        email: this.email,
      };
      await StudentsService.updateStudent(this.studentId, preparedData)
        .then(() => {
          this.$toast.success(this.$t('success.student.update'));
          this.getStudentData(this.studentId);
        })
        .catch((error) => {
          this.$toast.error(`${this.$t('error.general.oops')} ${error.message}`);
        });
      this.afterLoading();
    },
    async deleteStudent() {
      this.deleteDialogConfirm = false;
      this.beforeLoading();
      await StudentsService.deleteStudent(this.studentId)
        .then(() => {
          return this.$router.push(`/list-students`);
        })
        .catch((error) => {
          this.$toast.error(`${this.$t('error.general.oops')} ${error.message}`);
        });
      this.afterLoading();
    },
    beforeLoading() {
      this.loading = true;
      this.disabled = true;
    },
    afterLoading() {
      this.loading = false;
    },
  },
  mounted() {
    this.loadGroups();
  },
};
</script>
