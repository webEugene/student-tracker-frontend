<template>
  <v-footer color="green darken-1" app absolute class="d-flex flex-column">
  <v-container fluid>
    <v-row no-gutters align="center" class="mb-2">
      <v-col sm="12" class="text-center">
        <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4 white--text"
            icon
        >
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row no-gutters align="center" class="mb-2">
      <v-col sm="12" class="text-center">
        <v-btn
            color="white"
            text
        >
          УГОДА КОРИСТУВАЧА
        </v-btn>
        <v-btn
            color="white"
            text
        >
          ПОЛІТИКА КОНФІДЕНЦІЙНОСТІ
        </v-btn>
        <v-btn
            color="white"
            text
        >
          Інструкція
        </v-btn>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col md="6" sm="12">
        <v-chip class="mr-2 white--text" color="pink" label small>BETA</v-chip>
        <span class="white--text">{{ $t('general.version') }}: 1.0.0</span>
      </v-col>
      <v-col md="6" sm="12" class="text-right">
        <span class="white--text">©{{ new Date().getFullYear() }} — Всі права захищені</span></v-col>
    </v-row>
  </v-container>
  </v-footer>
</template>
<script>
export default {
  name: 'Footer',
  data: () => ({
    icons: [
      'mdi-facebook',
      'mdi-twitter',
      'mdi-linkedin',
      'mdi-instagram',
    ],
  }),
}
</script>