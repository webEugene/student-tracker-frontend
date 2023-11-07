<template>
  <v-container fluid>
    <h1>{{ $t('general.page') }} {{ user.name }} {{ user.surname }}</h1>
    <v-card class="mt-4" max-width="900px">
      <v-card-title>{{ $t('general.detail.title') }}</v-card-title>
      <v-card-text>
        <form @submit.prevent>
          <v-row>
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
                <v-text-field
                  v-model="email"
                  :error-messages="emailErrors"
                  :label="$t('formFields.email')"
                  @input="$v.email.$touch()"
                  @blur="$v.email.$touch()"
                  :disabled="disabled"
                ></v-text-field>
                <v-text-field
                  v-if="company"
                  :label="$t('formFields.companyName')"
                  :disabled="true"
                  :value="company.company"
                ></v-text-field>
                <v-text-field
                  v-if="role"
                  :label="roleLabel"
                  :disabled="true"
                  :value="role.description"
                ></v-text-field>
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
                  @click.prevent="updateUser"
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
          {{ $t('dialog.heading.delete.user') }} {{ user.name }} {{ user.surname }}?
        </v-card-title>
        <v-card-text>
          <strong>{{ $t('dialog.warning.title') }}</strong
          >: {{ $t('dialog.warning.description') }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" text @click="deleteDialogConfirm = false">
            {{ $t('buttons.cancel') }}
          </v-btn>
          <v-btn color="error darken-1" text @click="deleteUser">
            {{ $t('buttons.approve') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { UsersService } from '@/services/users.service';
import { email, required } from 'vuelidate/lib/validators';
import { nameSurnameValidate } from '@/mixins/validators';

export default {
  name: 'UserProfile',
  data: () => ({
    userId: '',
    user: '',
    name: '',
    surname: '',
    email: '',
    modal: false,
    disabled: true,
    loading: false,
    deleteDialogConfirm: false,
    role: null,
    company: null,
  }),
  validations: {
    name: { required, nameSurnameValidate },
    surname: { required, nameSurnameValidate },
    email: { required, email },
  },
  created() {
    // Start method getting domain data by id
    this.userId = this.$route.params?.id;
    this.getUserData(this.userId);
  },
  computed: {
    roleLabel() {
      return this.role ? `${this.$t('formFields.role')}: ${this.role.value}` : '';
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
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.required && errors.push(this.$t('validationErrors.email.required'));
      !this.$v.email.email && errors.push(this.$t('validationErrors.email.invalid'));
      return errors;
    },
  },
  methods: {
    async getUserData(id) {
      if (!id) return;
      this.loading = true;
      await UsersService.findOneUser(id)
        .then((response) => {
          this.user = response.data;
          this.setDataUser(response.data);
        })
        .catch((error) => {
          this.$toast.error(error.message);
        });
      this.loading = false;
    },
    setDataUser(user) {
      this.name = user.name;
      this.surname = user.surname;
      this.email = user.email;
      this.role = user.roles[0];
      this.company = user.company;
    },
    async updateUser() {
      this.$v.$touch();
      if (this.$v.$invalid) return;
      this.beforeLoading();
      const preparedData = {
        name: this.name,
        surname: this.surname,
        email: this.email,
      };
      await UsersService.updateUser(this.userId, preparedData)
        .then(() => {
          this.$toast.success(this.$t('success.user.update'));
          this.getUserData(this.userId);
        })
        .catch((error) => {
          if(error.response.status === 500) {
            this.$toast.error(`${this.$t('error.general.oops')} ${this.$t('toastification.errors.general[0]')}`);
          } else {
            this.$toast.error(`${this.$t('error.general.oops')} ${this.$t('toastification.errors.user[' +error.message+ ']')}`);
          }
        });
      this.afterLoading();
    },
    async deleteUser() {
      this.deleteDialogConfirm = false;
      this.beforeLoading();
      await UsersService.deleteUser(this.userId)
        .then(() => {
          this.$toast.success(this.$t('success.user.delete'));
          return this.$router.push(`/list-users`);
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
};
</script>
