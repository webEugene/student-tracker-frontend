<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title class="justify-space-between">
        <span class="headline">{{ $t('auth.register.title') }}</span>
        <v-btn
            icon
            small
            class="ma-2"
            color="blue-grey"
            dark
            @click="$router.push('/')"
        >
          <v-icon>
            mdi-home
          </v-icon>
        </v-btn>
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
            v-model.trim="company"
            :error-messages="companyErrors"
            :label="$t('formFields.company')"
            :disabled="disabled"
            @input="$v.company.$touch()"
            @blur="$v.company.$touch()"
          ></v-text-field>
          <v-select
            v-if="plans.length > 0"
            v-model="selectTariff"
            :error-messages="tariffErrors"
            :items="plans"
            :label="$t('formFields.plan')"
            item-text="plan"
            item-value="id"
            required
            chips
            @change="$v.selectTariff.$touch()"
            @blur="$v.selectTariff.$touch()"
          ></v-select>
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
            class="mr-4 mt-2 login-btn"
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
      <v-divider class="mx-4"></v-divider>
      <v-card-actions class="justify-center">
        <span>{{ $t('auth.account.exist') }}</span>
        <v-btn class="ml-2" color="primary" @click="$router.push('/login')">
          {{ $t('buttons.login') }}
        </v-btn>
      </v-card-actions>
    </v-card>


  </v-dialog>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, email, sameAs } from 'vuelidate/lib/validators';
import { AuthService } from '@/services/auth.service';
import jwt_decode from 'jwt-decode';
import { axiosHandler } from '@/axios.config';
import {companyNameValidate, nameSurnameValidate, passwordValidate} from '@/mixins/validators';
import { PlansService } from "@/services/plans.service";
import planNumberFilter from "@/filters/planNumberFilter";

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
    selectTariff: null,
    submitStatus: null,
    showPassInput: false,
    showConfirmPassInput: false,
    error: null,
    loading: false,
    disabled: false,
    plans: [],
  }),
  validations: {
    name: { required, nameSurnameValidate },
    surname: { required, nameSurnameValidate },
    email: { required, email },
    company: { required, companyNameValidate },
    password: { required, passwordValidate },
    confirmPassword: { required, sameAsPassword: sameAs('password'), passwordValidate },
    selectTariff: { required }
  },
  computed: {
    tariffErrors() {
      const errors = [];
      if (!this.$v.selectTariff.$dirty) return errors;
      !this.$v.selectTariff.required && errors.push(this.$t('validationErrors.tariff.required'));
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
      !this.$v.company.companyNameValidate &&
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
    async loadPlans() {
      await PlansService.getAllPlansForNonLogin()
        .then((response) => {
          const getPlans = response.data;
          const sortedPlans = getPlans.sort((a,b) => a.price - b.price);
          this.plans = sortedPlans.map(item => planNumberFilter(item));

          this.setTariff();
        })
        .catch((error) => console.log(error));
    },
    getTariffFromHost(){
      const regex = /\w+$/gm;
      const tariff = window.location.search;
      const str = `?tariff=${tariff}`;

      return str.match(regex) !== null ? str.match(regex)[0] : null;
    },
    setTariff() {
      const chosenTariff = this.getTariffFromHost();
      this.selectTariff = this.plans.find(item => item.plan === chosenTariff);

    },
    register() {
      this.error = '';
      this.loading = true;
      AuthService.register({
        name: this.name,
        surname: this.surname,
        email: this.email,
        password: this.password,
        company: this.company,
        plan_id: this.selectTariff,
      })
        .then((response) => {
          const userInfo = response.data.userInfo;
          const token = response.data.access_token;
          this.setTokenToLocalStorage(token);
          axiosHandler.defaults.headers.Authorization = 'Bearer ' + token;
          this.serUserInfoToLocalStorage(userInfo);
          this.$router.push(this.$route.query.redirect || `/profile/${userInfo.id}`);
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
          type_tariff: userInfo.type_tariff,
          tariff_permission: userInfo.tariff_permission,
        }),
      );
    },
    setTokenToLocalStorage(token) {
      localStorage.setItem('accessToken', token);
      localStorage.setItem('expireToken', jwt_decode(token).exp.toString());
    },
  },
  mounted() {
    this.loadPlans();
  }
};
</script>
