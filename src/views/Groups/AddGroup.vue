<template>
  <v-container fluid>
    <h1>Add Group</h1>
    <form>
      <v-text-field
        v-model="name"
        :error-messages="nameErrors"
        :counter="10"
        :disabled="disabled"
        label="Group Name"
        required
        @input="$v.name.$touch()"
        @blur="$v.name.$touch()"
      ></v-text-field>
      <v-btn class="mr-4" @click="submit" :disabled="this.$v.$invalid || disabled"> submit</v-btn>
      <v-btn @click="clear">clear</v-btn>
    </form>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import { GroupsService } from '@/services/groups.service';

export default {
  name: 'AddGroup',
  mixins: [validationMixin],
  validations: {
    name: { required },
  },
  data: () => ({
    name: '',
    disabled: false,
  }),
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push('Group name is required.');
      return errors;
    },
  },
  methods: {
    async submit() {
      this.$v.$touch();
      if (this.$v.$invalid) return;
      await GroupsService.createGroup(this.name)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    },
    clear() {
      this.$v.$reset();
      this.name = '';
    },
  },
};
</script>
