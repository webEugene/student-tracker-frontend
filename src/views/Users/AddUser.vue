<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" xs="12" sm="8" md="6">
        <h1>{{ $t('user.title.add') }}</h1>
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
          <v-text-field
            v-model="email"
            :error-messages="emailErrors"
            :label="$t('formFields.email')"
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
            :disabled="disabled"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :error-messages="passwordErrors"
            :label="$t('formFields.password')"
            :hint="$t('general.password.hint')"
            persistent-hint
            class="password-input"
            :append-icon="showPassInput ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassInput ? 'text' : 'password'"
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
            @click:append="showPassInput = !showPassInput"
          ></v-text-field>
          <v-text-field
            v-model="confirmPassword"
            :error-messages="confirmPasswordErrors"
            :label="$t('formFields.confirmPassword')"
            class="password-input"
            :append-icon="showConfirmPassInput ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showConfirmPassInput ? 'text' : 'password'"
            @input="$v.confirmPassword.$touch()"
            @blur="$v.confirmPassword.$touch()"
            @click:append="showConfirmPassInput = !showConfirmPassInput"
          ></v-text-field>
          <v-btn
            class="mr-4 login-btn"
            color="success"
            type="submit"
            :disabled="loading || $v.$invalid"
            @click.prevent="createUser()"
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
import { email, required, sameAs } from 'vuelidate/lib/validators';
import { UsersService } from '@/services/users.service';
import { nameSurnameValidate, passwordValidate } from '@/mixins/validators';

export default {
  name: 'AddUser',
  mixins: [validationMixin],
  data: () => ({
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
    submitStatus: null,
    showPassInput: false,
    showConfirmPassInput: false,
    modal: false,
    disabled: false,
    loading: false,
  }),
  validations: {
    name: { required, nameSurnameValidate },
    surname: { required, nameSurnameValidate },
    email: { required, email },
    password: { required, passwordValidate },
    confirmPassword: { required, sameAsPassword: sameAs('password'), passwordValidate },
  },
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
      !this.$v.email.required && errors.push(this.$t('validationErrors.email.required'));
      !this.$v.email.email && errors.push(this.$t('validationErrors.email.invalid'));
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push(this.$t('validationErrors.password.required'));
      !this.$v.password.passwordValidate &&
        errors.push(this.$t('validationErrors.password.invalid'));
      return errors;
    },
    confirmPasswordErrors() {
      const errors = [];
      if (!this.$v.confirmPassword.$dirty) return errors;
      !this.$v.confirmPassword.required &&
        errors.push(this.$t('validationErrors.password.required'));
      !this.$v.confirmPassword.passwordValidate &&
        errors.push(this.$t('validationErrors.password.invalid'));
      return errors;
    },
  },
  methods: {
    async createUser() {
      this.$v.$touch();
      if (this.$v.$invalid) return;
      this.beforeLoading();
      const preparedData = {
        name: this.name,
        surname: this.surname,
        email: this.email,
        password: this.password,
      };
      await UsersService.createUser(preparedData)
        .then(() => {
          this.$toast.success(this.$t('success.user.added'));
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
      this.email = '';
      this.password = '';
      this.confirmPassword = '';
    },
  },
};
</script>
