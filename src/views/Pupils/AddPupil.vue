<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" xs="12" sm="8" md="6">
        <h1>{{ $t('pupil.title.add') }}</h1>
        <form @submit.prevent>
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
          <div>{{ $t('pupil.chooseGender') }}</div>
          <v-radio-group v-model="gender" row>
            <v-radio :label="$t('formFields.male')" value="male"></v-radio>
            <v-radio :label="$t('formFields.female')" value="female"></v-radio>
          </v-radio-group>
          <v-select
            v-if="groupsList.length > 0"
            v-model="selectGroup"
            :items="groupsList"
            :error-messages="groupErrors"
            :label="$t('formFields.group')"
            item-text="name"
            item-value="id"
            required
            @change="$v.selectGroup.$touch()"
            @blur="$v.selectGroup.$touch()"
          ></v-select>
          <v-alert v-else dense text type="info">
            {{ $t('alerts.noGroups') }}
          </v-alert>
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
              <v-btn text color="primary" @click="modal = false">{{ $t('buttons.cancel') }}</v-btn>
              <v-btn text color="primary" @click="$refs.dialog.save(birthday)">{{
                $t('buttons.ok')
              }}</v-btn>
            </v-date-picker>
          </v-dialog>
          <v-btn
            class="mr-4 login-btn"
            color="success"
            type="submit"
            :disabled="loading || $v.$invalid"
            @click.prevent="savePupil()"
          >
            <v-progress-circular v-if="loading" indeterminate left></v-progress-circular>
            {{ $t('buttons.save') }}
          </v-btn>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import { GroupsService } from '@/services/groups.service';
import { PupilsService } from '@/services/pupils.service';
import { nameSurnameValidate, allMobilesValidate } from '@/mixins/validators';
export default {
  name: 'AddPupil',
  mixins: [validationMixin],
  data: () => ({
    name: '',
    surname: '',
    selectGroup: null,
    groupsList: [],
    mobilePhone: '',
    birthday: null,
    modal: false,
    disabled: false,
    loading: false,
    gender: 'male',
  }),
  validations: {
    name: { required, nameSurnameValidate },
    surname: { required, nameSurnameValidate },
    selectGroup: { required },
    mobilePhone: { required, allMobilesValidate },
    birthday: { required },
  },

  computed: {
    groupErrors() {
      const errors = [];
      if (!this.$v.selectGroup.$dirty) return errors;
      !this.$v.selectGroup.required && errors.push(this.$t('validationErrors.group.required'));
      return errors;
    },
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
    mobilePhoneErrors() {
      const errors = [];
      if (!this.$v.mobilePhone.$dirty) return errors;
      !this.$v.mobilePhone.required &&
        errors.push(this.$t('validationErrors.mobilePhone.required'));
      !this.$v.mobilePhone.allMobilesValidate &&
        errors.push(this.$t('validationErrors.mobilePhone.invalid'));
      return errors;
    },
  },

  methods: {
    async loadGroups() {
      await GroupsService.getAllGroupsOnly()
        .then((response) => {
          this.groupsList = response.data;
        })
        .catch((error) => console.log(error));
    },
    async savePupil() {
      this.$v.$touch();
      if (this.$v.$invalid) return;
      this.beforeLoading();
      const preparedData = {
        name: this.name,
        surname: this.surname,
        mobilePhone: this.mobilePhone,
        birthday: this.birthday,
        group_id: this.selectGroup,
        gender: this.gender,
      };
      await PupilsService.createPupil(preparedData)
        .then(() => {
          this.$toast.success(this.$t('success.pupil.added'));
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
      this.disabled = false;
      this.clear();
    },
    clear() {
      this.$v.$reset();
      this.name = '';
      this.surname = '';
      this.mobilePhone = '';
      this.birthday = null;
      this.selectGroup = null;
      this.gender = null;
    },
  },
  mounted() {
    this.loadGroups();
  },
};
</script>
