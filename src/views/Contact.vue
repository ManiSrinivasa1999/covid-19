<template>
  <v-container fluid>
    <v-card
      color="primary"
    >
      <v-card-text class="white--text text-h5 text-center titlecolor">
        Contacts & Helpline Info
      </v-card-text>
      <v-row>
        <v-col cols="12" xl="2" lg="3" md="3" sm="10"
          v-for="(region, i) in contactData.contacts.regional"
          :key="i"
        >
          <v-container fluid>
            <v-card
              height="177px"
              color="secondary darken-1"
            >
              <v-card-text class="mt-4 text-center text-h6 titlecolor">
                {{ region.loc }}
              </v-card-text>
              <v-divider light></v-divider>
              <v-card-text class="text-h6 mt-4 text-center cardtext-color">
                {{ region.number }}
              </v-card-text>
            </v-card>
          </v-container>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
<script>
import axios from 'axios';

export default {
  name: 'Contact',
  data() {
    return {
      success: true,
      contactData: {
        contacts: {
          primary: {},
          regional: [],
        },
      },
      lastRefreshed: '2020-03-22T12:43:00.000Z',
      lastOriginUpdate: '2020-03-22T06:15:00.000Z',
    };
  },
  mounted() {
    axios.get('https://api.rootnet.in/covid19-in/contacts')
      .then(this.setcontactData)
      .catch();
  },
  methods: {
    setcontactData(response) {
      this.contactData = response.data.data;
    },
  },
};
</script>

<style lang="scss" scoped>

.cardtext-color {
  color: #BDBDBD !important;
}

.titlecolor {
  color: #BDBDBD !important;
}

</style>
