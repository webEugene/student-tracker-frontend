<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-alert
        dense
        type="info"
        class="text-center redirect-info"
        v-if="this.$route.query.redirect"
      >
        You must be logged in to access {{ $route.query.redirect }} page!
      </v-alert>
      <v-card-title>
        <span class="headline">Войти</span>
      </v-card-title>
      <v-card-text>
        <v-alert type="error" class="error-alert" ismissible dense v-if="error">
          {{ error }}
        </v-alert>
        <v-form @submit.prevent="submit">
          <v-text-field
            v-model.trim="email"
            :error-messages="emailErrors"
            label="Введите email"
            required
            class="email-input"
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :error-messages="passErrors"
            label="Введите пароль"
            required
            class="password-input"
            :append-icon="showPassInput ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassInput ? 'text' : 'password'"
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
            @click:append="showPassInput = !showPassInput"
          ></v-text-field>
          <v-btn
            class="mr-4 login-btn"
            color="success"
            type="submit"
            :disabled="loading || $v.$invalid"
            @click.prevent="login()"
          >
            <v-progress-circular v-if="loading" indeterminate left></v-progress-circular>
            <v-icon v-if="!loading" left>mdi-login-variant</v-icon>
            Войти
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';
import { AuthService } from '@/services/auth.service';
import jwt_decode from 'jwt-decode';
import { axiosHandler } from '@/axios.config';

export default {
  name: 'Login',
  mixins: [validationMixin],

  validations: {
    email: { required, email },
    password: { required },
  },
  data: () => ({
    dialog: true,
    email: '',
    password: '',
    submitStatus: null,
    showPassInput: false,
    error: null,
    loading: false,
  }),

  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.required && errors.push('Почта обьязательна');
      return errors;
    },

    passErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push('Пароль обьязательный');
      return errors;
    },
  },
  methods: {
    login() {
      this.error = '';
      this.loading = true;
      AuthService.login(this.email, this.password)
        .then((response) => {
          const userInfo = response.data.userInfo;
          const token = response.data.access_token;
          this.setTokenToLocalStorage(token);
          axiosHandler.defaults.headers.Authorization = 'Bearer ' + token;
          this.serUserInfoToLocalStorage(userInfo);
          this.$router.push(this.$route.query.redirect || `/user/${userInfo.id}`);
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
          this.error = error?.message;
        });
    },
    serUserInfoToLocalStorage(userInfo) {
      localStorage.setItem(
        'userInfo',
        JSON.stringify({ id: userInfo.id, username: userInfo.username }),
      );
    },
    setTokenToLocalStorage(token) {
      localStorage.setItem('accessToken', token);
      localStorage.setItem('expireToken', jwt_decode(token).exp.toString());
    },
  },
};
</script>
