<template>
  <v-container>
    <h1>Personal information - {{ getUserInfo.username }}</h1>
    <v-card class="mt-4">
      <v-card-title>Basic information</v-card-title>
      <v-card-text>
        <v-row>
          <v-col sm="2" md="2" lg="2">
            <div>
              <v-avatar class="profile" color="blue-grey lighten-4" size="110" rounded>
                <v-img
                  src="https://lux-admin-pro.indielayer.com/images/avatars/avatar1.svg"
                ></v-img>
              </v-avatar>
              <v-btn elevation="1" small class="mt-2">Edit avatar</v-btn>
            </div>
          </v-col>
          <v-col>
            <div>
              <v-text-field value="Eugene" label="Name" class="ma-2" disabled></v-text-field>
              <v-text-field value="Bilan" label="Surname" class="ma-2" disabled></v-text-field>
              <v-text-field
                value="12/06/2017"
                label="Birthday"
                class="ma-2"
                disabled
              ></v-text-field>
              <v-text-field value="Male" label="Gender" class="ma-2" disabled></v-text-field>
            </div>
          </v-col>
        </v-row>
        <div class="d-flex">
          <div class="ml-2 d-flex flex-row"></div>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'Profile',
  data: () => ({}),
  computed: {
    getUserInfo() {
      if (localStorage.getItem('userInfo')) {
        return JSON.parse(localStorage.getItem('userInfo'));
      }
      return [];
    },
  },
};
</script>
