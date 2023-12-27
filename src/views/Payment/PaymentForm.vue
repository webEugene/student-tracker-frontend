<template>
  <v-container fluid>
    <div v-html="form"></div>
  </v-container>
</template>
<script>
export default {
  name: 'PaymentForm',
  data: () => ({
    form: null,
  }),
  mounted() {
    this.form = '';
  },
};
</script>
