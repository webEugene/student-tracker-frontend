<template>
  <v-container fluid>
    <h1>{{ $t('group.title.add') }}</h1>
    <v-row>
      <v-col xs="12" md="6" lg="4">
        <form @submit.prevent>
          <v-text-field
            v-model="name"
            :error-messages="groupErrors"
            :label="$t('formFields.group')"
            :disabled="disabled"
            @input="liveTrimData(name), $v.name.$reset()"
            @blur="liveTrimData(name), $v.name.$touch()"
          ></v-text-field>
          <v-btn
            class="mt-2 mr-4 login-btn"
            color="success"
            type="submit"
            :disabled="loading || $v.$invalid"
            @click.prevent="submit()"
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
import { groupValidate } from '@/mixins/validators';

export default {
  name: 'AddGroup',
  mixins: [validationMixin],
  validations: {
    name: { required, groupValidate },
  },
  data: () => ({
    name: '',
    disabled: false,
    loading: false,
  }),
  computed: {
    groupErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push(this.$t('validationErrors.group.required'));
      !this.$v.name.groupValidate && errors.push(this.$t('validationErrors.group.invalid'));
      return errors;
    },
  },
  methods: {
    liveTrimData(name) {
      this.name = name.replace(/^\s+|\s+$/gm, '');
    },
    async submit() {
      this.$v.$touch();
      if (this.$v.$invalid) return;
      this.beforeLoading();
      await GroupsService.createGroup(this.name)
        .then(() => {
          this.$toast.success(this.$t('success.group.added'));
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
    },
  },
};
</script>
