<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title class="justify-space-between">
        <span class="headline">{{ $t('auth.forgotPassword.title') }}?</span>
        <v-btn icon small class="ma-2" color="blue-grey" dark @click="$router.push('/')">
          <v-icon> mdi-home </v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-alert type="error" class="error-alert" ismissible dense v-if="serverErrors">
          {{ serverErrors }}
        </v-alert>
        <v-form @submit.prevent>
          <v-text-field
            v-model="email"
            :error-messages="emailErrors"
            :label="$t('formFields.email')"
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
            class="email-input"
          ></v-text-field>
          <v-btn
            class="mr-4 mt-2 login-btn"
            color="success"
            type="submit"
            :disabled="$v.email.$invalid"
            @click.prevent="submit()"
          >
            <v-progress-circular v-if="loading" indeterminate left></v-progress-circular>
            <v-icon v-if="!loading" left>mdi-login-variant</v-icon>
            {{ $t('buttons.send') }}
          </v-btn>
        </v-form>
      </v-card-text>
      <v-divider class="mx-4"></v-divider>
    </v-card>
  </v-dialog>
</template>
<script>
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';
import { AuthService } from '@/services/auth.service';
import { i18n } from '@/plugins/i18n';

export default {
  name: 'ForgotPassword',
  mixins: [validationMixin],
  validations: {
    email: { required, email },
    password: { required },
  },
  data: () => ({
    dialog: true,
    email: '',
    serverErrors: null,
    loading: false,
  }),
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.required && errors.push(this.$t('validationErrors.email.required'));
      !this.$v.email.email && errors.push(this.$t('validationErrors.email.invalid'));
      return errors;
    },
  },
  methods: {
    submit() {
      this.error = '';
      this.loading = true;

      AuthService.forgetPassword(this.email.toLowerCase(), i18n.locale)
        .then(() => {
          this.$router.push(this.$route.query.redirect || `/`);
        })
        .catch((error) => {
          this.loading = false;
          const errorMessage = error?.response?.data?.message ?? error.message;
          this.serverErrors = this.$t(`serverAnswers.${errorMessage}`);
        });
    },
  },
};
</script>
