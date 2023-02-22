<template>
  <v-container fluid>
    <h1 v-if="pupil.gender">
      {{ $t('pupil.title.profile.' + gender) }}: {{ pupil.name }} {{ pupil.surname }}
    </h1>
    <v-card>
      <!--  Tabs  -->
      <v-tabs v-model="tab" color="deep-purple accent-4" left>
        <v-tab>
          {{ $t('general.detail.title') }}
        </v-tab>
        <v-tab>
          {{ $t('pupil.visit.title') }}
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
                  <v-col sm="12" md="4" lg="4" class="flex-xs-basis">
                    <div class="d-flex flex-column" style="max-width: 120px">
                      <v-avatar class="profile" color="blue-grey lighten-4" size="120" rounded>
                        <v-img
                          lazy-src="https://lux-admin-pro.indielayer.com/images/avatars/avatar1.svg"
                          max-height="150"
                          max-width="120"
                          :src="`${avatar}`"
                          :alt="`${pupil.name} ${pupil.surname}`"
                        ></v-img>
                      </v-avatar>
                      <v-btn
                        elevation="1"
                        small
                        class="mt-2"
                        @click.prevent="dialogAvatar = true"
                        >{{ $t('buttons.edit') }}</v-btn
                      >
                      <v-btn
                        elevation="1"
                        small
                        class="mt-2"
                        color="error"
                        @click.prevent="removeAvatar()"
                        :disabled="!avatarExist"
                        >{{ $t('buttons.delete') }}</v-btn
                      >
                    </div>
                  </v-col>
                  <v-col sm="12" md="8" lg="8">
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
                      <v-icon class="d-sm-none d-md-none d-lg-none" dark> mdi-pencil </v-icon>
                      <span class="d-none d-sm-flex">{{ $t('buttons.edit') }}</span>
                    </v-btn>
                    <div v-else>
                      <v-btn
                        small
                        class="mr-3"
                        color="primary"
                        type="submit"
                        :disabled="$v.$invalid || disabled || loading"
                        @click.prevent="updatePupil"
                      >
                        <v-icon class="d-sm-none d-md-none d-lg-none" dark> mdi-content-save-outline </v-icon>
                        <span class="d-none d-sm-flex">{{ $t('buttons.save') }}</span>
                      </v-btn>

                      <v-btn
                        small
                        class="mr-3 white--text"
                        color="blue-grey"
                        type="submit"
                        @click.prevent="disabled = !disabled"
                      >
                        <v-icon class="d-sm-none d-md-none d-lg-none" dark> mdi-close-circle-outline </v-icon>
                        <span class="d-none d-sm-flex">{{ $t('buttons.cancel') }}</span>
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
                      <v-icon class="d-sm-none d-md-none d-lg-none" dark> mdi-delete </v-icon>
                      <span class="d-none d-sm-flex">{{ $t('buttons.delete') }}</span>
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
                {{ $t('dialog.heading.delete.default') }} {{ pupil.name }} {{ pupil.surname }}?
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
                <v-btn color="error darken-1" text @click="deletePupil">
                  {{ $t('buttons.approve') }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-tab-item>
        <v-tab-item>
          <v-card>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr class="v-data-table-header">
                    <th class="text-left">{{ $t('table.header.came') }}</th>
                    <th class="text-left">{{ $t('table.header.left') }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="visit in pupil.visits" :key="visit.id" :class="{'tbody-tr-mobile': isMobile}">
                    <td>
                      <div :class="[isMobile ? 'tbody-header-mobile' : 'tbody-header-desktop']">{{ $t('table.header.came') }}:</div>
                      <v-chip :color="getTimeData(visit, 'came_at').color" dark small>
                        {{ getTimeData(visit, 'came_at').text }}
                      </v-chip>
                      <span v-if="conditionBySomebody(visit, 'brought')" class="ml-1"
                        >{{ $t('general.who') }}:
                        {{ getBySomebody(visit, 'brought') | relativesFilter }}</span
                      >
                    </td>
                    <td>
                      <div :class="[isMobile ? 'tbody-header-mobile' : 'tbody-header-desktop']">{{ $t('table.header.left') }}:</div>
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
import { PupilsService } from '@/services/pupils.service';
import { GroupsService } from '@/services/groups.service';
import { required, email } from 'vuelidate/lib/validators';
import { nameSurnameValidate, allMobilesValidate } from '@/mixins/validators';
import path from 'path';

export default {
  name: 'PupilProfile',
  data: () => ({
    pupilId: '',
    pupil: '',
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
    avatarExist: true,
    dialogAvatar: false,
    rules: [
      (v) => !!v || 'File is required',
      (v) => (v && v.size > 0) || 'File is required',
      (v) => !v || v.size < 2000000 || 'Avatar size should be less than 2 MB!',
    ],
    tab: null,
    isMobile: false,
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
    this.pupilId = this.$route.params?.id;
    this.getPupilData(this.pupilId);
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
      const avatarName = this.getDataFromInput();
        await PupilsService.pupilAvatarChange(this.pupilId, avatarName)
        .then(() => {
          this.$toast.success(this.$t('success.pupil.update'));
          this.getPupilData(this.pupilId);
        })
        .catch((error) => {
          this.$toast.error(`${this.$t('error.general.oops')} ${error.message}`);
        });
      this.afterLoading();
    },
    async removeAvatar() {
      this.beforeLoading();
      await PupilsService.pupilRemoveAvatar(this.pupilId, path.basename(this.avatar))
        .then(() => {
          this.$toast.success(this.$t('success.pupil.update'));
          this.getPupilData(this.pupilId);
        })
        .catch((error) => {
          this.$toast.error(`${this.$t('error.general.oops')} ${error.message}`);
        });
      this.afterLoading();
    },
    getDataFromInput() {
      const getFileCSV = document.getElementById('avatar').files;
      let formData = new FormData();
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
    async getPupilData(id) {
      if (!id) return;
      this.loading = true;
      await PupilsService.findOnePupil(id)
        .then((response) => {
          this.pupil = response.data;
          this.setDataPupil(response.data);
        })
        .catch((error) => {
          this.$toast.error(`${this.$t('error.general.oops')} ${error.message}`);
        });
      this.loading = false;
    },
    setDataPupil(pupil) {
      this.name = pupil.name;
      this.surname = pupil.surname;
      this.birthday = this.birthdayFormatter(pupil.birthday);
      this.mobilePhone = pupil.mobilePhone;
      this.gender = pupil.gender;
      this.selectGroup = pupil.group;
      this.email = pupil.email;
      this.avatar = pupil.avatar_path
        ? `http://localhost:5000/profiles/${pupil.company_id}/${pupil.avatar_path}`
        : `https://lux-admin-pro.indielayer.com/images/avatars/avatar1.svg`;
      this.avatarExist = !!pupil.avatar_path;
    },
    birthdayFormatter(birthday) {
      const date = new Date(birthday);
      let day = (date.getDate() < 10 ? '0' : '') + date.getDate();
      let month = (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1);
      let year = date.getFullYear();
      return `${year}-${month}-${day}`;
    },
    async updatePupil() {
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
      await PupilsService.updatePupil(this.pupilId, preparedData)
        .then(() => {
          this.$toast.success(this.$t('success.pupil.update'));
          this.getPupilData(this.pupilId);
        })
        .catch((error) => {
          this.$toast.error(`${this.$t('error.general.oops')} ${error.message}`);
        });
      this.afterLoading();
    },
    async deletePupil() {
      this.deleteDialogConfirm = false;
      this.beforeLoading();
      await PupilsService.deletePupil(this.pupilId)
        .then(() => {
          return this.$router.push(`/list-pupils`);
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
    onResize () {
      this.isMobile = window.innerWidth < 600;
    },
  },
  beforeDestroy () {
    if (typeof window === 'undefined') return;

    window.removeEventListener('resize', this.onResize, { passive: true });
  },
  mounted() {
    this.loadGroups();
    this.onResize();

    window.addEventListener('resize', this.onResize, { passive: true });
  },
};
</script>
