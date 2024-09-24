<template>
  <v-footer color="green darken-1" app absolute class="d-flex flex-column">
    <v-container fluid>
      <v-row no-gutters align="center" class="mb-2">
        <v-col sm="12" class="text-center">
          <v-btn v-for="icon in icons" :key="icon" class="mx-4 white--text" icon>
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row no-gutters align="center" class="mb-2">
        <v-col sm="12" class="text-center">
          <v-btn color="white" text :to="{ path: '/user-agreement' }">
            {{ $t('staticPages.userAgreement') }}
          </v-btn>
          <v-btn color="white" text :to="{ path: '/privacy-policy' }">
            {{ $t('staticPages.privacyPolicy') }}
          </v-btn>
          <v-btn color="white" text :to="{ path: '/instructions' }">
            {{ $t('staticPages.instructions') }}
          </v-btn>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col md="12" sm="12" class="text-center">
          <span class="white--text text-sm-subtitle-2"
            >©{{ new Date().getFullYear() }} — {{ $t('general.copyrights') }}</span
          >
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>
<script>
export default {
  name: 'Footer',
  data: () => ({
    icons: ['mdi-facebook', 'mdi-twitter', 'mdi-linkedin', 'mdi-instagram'],
  }),
};
</script>
