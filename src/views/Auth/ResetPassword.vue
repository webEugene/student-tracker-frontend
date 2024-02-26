<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title class="justify-space-between">
        <span class="headline">{{ $t('auth.resetPassword.title') }}</span>
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
        <v-alert type="error" class="error-alert" ismissible dense v-if="serverErrors">
          {{ serverErrors }}
        </v-alert>
        <v-form @submit.prevent>
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
              :disabled="$v.password.$invalid"
              @click.prevent="resetPassword()"
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
import { required, sameAs } from 'vuelidate/lib/validators';
import { passwordValidate } from '@/mixins/validators';
import { AuthService } from "@/services/auth.service";

export default {
  name: "ResetPassword",
  mixins: [validationMixin],
  validations: {
    password: { required, passwordValidate },
    confirmPassword: { required, sameAsPassword: sameAs('password'), passwordValidate },
  },
  data: () => ({
    dialog: true,
    password: '',
    confirmPassword: '',
    serverErrors: null,
    loading: false,
    showPassInput: false,
    showConfirmPassInput: false,
    resetToken: null,
  }),
  mounted() {
    this.resetToken = this.$route.query.resetToken
  },
  computed: {
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
    resetPassword() {
      this.error = '';
      this.loading = true;

      AuthService.resetPassword(this.password, this.resetToken)
        .then((response) => {
          this.$toast.success(`${this.$t('success.auth.reset')} ${response.data.message}`);

          this.$router.push(this.$route.query.redirect || `/login`);
        })
        .catch((error) => {
          this.loading = false;
          this.serverErrors = error?.response?.data?.message ?? error.message;
        });
    }
  }
}
</script>
<style scoped>

</style>