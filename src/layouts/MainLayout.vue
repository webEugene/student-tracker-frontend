<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <MenuTabs />
    </v-navigation-drawer>

    <v-app-bar clipped-rightdark app color="green darken-1" dense dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ appName }}</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            :value="1"
            router
            :to="`/user/${getUserInfo.id}`"
            depressed
            v-bind="attrs"
            v-on="on"
          >
            <v-icon left> mdi-account-circle-outline </v-icon>
            {{ getUserInfo.username }}
          </v-btn>
        </template>
        <span>profile</span>
      </v-tooltip>
      <v-btn-toggle v-model="toggle_exclusive" color="primary" dense group>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn :value="1" router :to="links.url" text v-bind="attrs" v-on="on">
              <v-icon>{{ icons.iconAccount }}</v-icon>
            </v-btn>
          </template>
          <span>Users</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn :value="2" @click="logOut()" text v-bind="attrs" v-on="on">
              <v-icon>{{ icons.iconLogout }}</v-icon>
            </v-btn>
          </template>
          <span>logout</span>
        </v-tooltip>
      </v-btn-toggle>
    </v-app-bar>

    <Main />
    <v-footer color="green darken-1" app>
      <span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import MenuTabs from '@/components/MenuTabs';
import Main from '@/components/Main';

export default {
  name: 'MainLayout',
  props: {
    source: String,
  },

  data: () => ({
    drawer: null,
    appName: 'Student tracker',
    currentUser: 'Eugene',
    links: {
      url: '/users',
    },
    icons: {
      iconProfile: 'mdi-account-circle-outline',
      iconAccount: 'mdi-account-group',
      iconLogout: 'mdi-logout-variant',
    },
    username: '',
    toggle_exclusive: '',
  }),

  components: {
    MenuTabs,
    Main,
  },
  computed: {
    userMenuLinks() {
      return this.adminMenuLinks();
    },
    getUserInfo() {
      if (localStorage.getItem('userInfo')) {
        return JSON.parse(localStorage.getItem('userInfo'));
      }
      return [];
    },
  },
  methods: {
    logOut() {
      console.log('logout');
    },
    adminMenuLinks() {
      return [{ url: '/users', icon: 'mdi-account-group' }];
    },
  },
};
</script>
