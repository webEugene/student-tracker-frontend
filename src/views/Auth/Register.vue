<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ $t('auth.register.title') }}</span>
      </v-card-title>
      <v-card-text>
        <v-alert type="error" class="error-alert" ismissible dense v-if="error">
          {{ error }}
        </v-alert>
        <v-form @submit.prevent="submit">
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
            v-model="company"
            :error-messages="companyErrors"
            :label="$t('formFields.company')"
            :disabled="disabled"
            @input="$v.company.$touch()"
            @blur="$v.company.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :error-messages="passwordErrors"
            :label="$t('formFields.password')"
            :hint="$t('general.password.hint')"
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
            @click.prevent="register()"
          >
            <v-progress-circular v-if="loading" indeterminate left></v-progress-circular>
            <v-icon v-if="!loading" left>mdi-login-variant</v-icon>
            {{ $t('buttons.register') }}
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, email, sameAs } from 'vuelidate/lib/validators';
import { AuthService } from '@/services/auth.service';
import jwt_decode from 'jwt-decode';
import { axiosHandler } from '@/axios.config';
import { nameSurnameValidate, passwordValidate } from '@/mixins/validators';

export default {
  name: 'Register',
  mixins: [validationMixin],
  data: () => ({
    dialog: true,
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    submitStatus: null,
    showPassInput: false,
    showConfirmPassInput: false,
    error: null,
    loading: false,
    disabled: false,
  }),
  validations: {
    name: { required, nameSurnameValidate },
    surname: { required, nameSurnameValidate },
    email: { required, email },
    company: { required, nameSurnameValidate },
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
    companyErrors() {
      const errors = [];
      if (!this.$v.company.$dirty) return errors;
      !this.$v.company.required && errors.push(this.$t('validationErrors.company.required'));
      !this.$v.company.nameSurnameValidate &&
        errors.push(this.$t('validationErrors.company.invalid'));
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
    register() {
      this.error = '';
      this.loading = true;
      AuthService.register({
        name: this.name,
        surname: this.surname,
        email: this.email,
        password: this.password,
        company: this.company,
      })
        .then((response) => {
          const userInfo = response.data.userInfo;
          const token = response.data.access_token;
          this.setTokenToLocalStorage(token);
          axiosHandler.defaults.headers.Authorization = 'Bearer ' + token;
          this.serUserInfoToLocalStorage(userInfo);
          this.$router.push(this.$route.query.redirect || `/homepage`);
        })
        .catch((error) => {
          this.loading = false;
          this.error = error?.response?.data?.message ?? error.message;
        });
    },
    serUserInfoToLocalStorage(userInfo) {
      localStorage.setItem(
        'userInfo',
        JSON.stringify({
          id: userInfo.id,
          name: userInfo.name,
          surname: userInfo.surname,
          roles: userInfo.roles,
          company_id: userInfo.company_id,
        }),
      );
    },
    setTokenToLocalStorage(token) {
      localStorage.setItem('accessToken', token);
      localStorage.setItem('expireToken', jwt_decode(token).exp.toString());
    },
  },
};
</script>

<style scoped></style>
