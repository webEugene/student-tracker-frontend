<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <MenuTabs />
    </v-navigation-drawer>

    <v-app-bar clipped-rightdark app color="green darken-1" dense dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title
        >{{ appName }}
        <v-chip class="ma-2" color="pink" label small> BETA </v-chip></v-toolbar-title
      >
      <v-spacer></v-spacer>
      <LanguageSwitcher />
      <v-tooltip bottom v-if="$can('admin')">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            :value="1"
            router
            :to="`/profile/${getUserInfo.id}`"
            depressed
            v-bind="attrs"
            v-on="on"
          >
            {{ $t('general.welcomeUser') }}, {{ getUserInfo.name }}
          </v-btn>
        </template>
        <span>{{ $t('tooltips.profile') }}</span>
      </v-tooltip>
      <v-btn-toggle v-model="toggle_exclusive" color="primary" dense group>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn :value="2" @click="logOut()" text v-bind="attrs" v-on="on">
              <v-icon>{{ icons.iconLogout }}</v-icon>
            </v-btn>
          </template>
          <span>{{ $t('tooltips.logout') }}</span>
        </v-tooltip>
      </v-btn-toggle>
    </v-app-bar>

    <Main />
    <v-footer color="green darken-1" app class="d-flex justify-space-between">
      <span class="white--text">{{ $t('general.version') }}: 1.0.0</span>
      <span class="white--text">Copyright &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import MenuTabs from '@/components/MenuTabs';
import Main from '@/components/Main';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { AuthService } from '@/services/auth.service';

export default {
  name: 'MainLayout',
  props: {
    source: String,
  },

  data: () => ({
    drawer: null,
    appName: 'Students Management Tracker',
    icons: {
      iconProfile: 'mdi-account-circle-outline',
      iconLogout: 'mdi-logout-variant',
    },
    username: '',
    toggle_exclusive: '',
  }),

  components: {
    MenuTabs,
    Main,
    LanguageSwitcher,
  },
  computed: {
    getUserInfo() {
      if (localStorage.getItem('userInfo')) {
        return JSON.parse(localStorage.getItem('userInfo'));
      }
      return [];
    },
  },
  methods: {
    logOut() {
      AuthService.logout();
    },
  },
};
</script>