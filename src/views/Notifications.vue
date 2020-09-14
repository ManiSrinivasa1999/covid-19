<template>
  <v-container fluid>
    <v-data-iterator
      v-if="$vuetify.breakpoint.smAndDown"
      :items="sanitizedNotifications"
      :search="search"
      :items-per-page.sync="notificationsData.notifications.length"
      :sort-desc="sortDesc"
      light
      hide-default-footer
    >
      <template v-slot:header>
        <v-row align="center" justify="end">
          <v-col cols="12" md="4" sm="12" xs="12">
            <v-toolbar
              color="transparent"
              dense
              flat
              class="mb-3"
            >
              <v-text-field
                v-model="search"
                clearable
                hide-details
                solo
                background-color="secondary lighten-5"
                append-icon="fas fa-search"
                label="Search"
              ></v-text-field>
            </v-toolbar>
          </v-col>
        </v-row>
      </template>
      <template v-slot:default="props">
        <v-card
          color="primary"
        >
          <v-card-text class="white--text text-h6 text-center">
            Notifications & Advisories
          </v-card-text>
          <v-row>
            <v-col cols="12" sm="12"
              v-for="(notification, i) in props.items"
              :key="i"
            >
              <v-container>
                <v-card
                  color="secondary darken-1"
                >
                  <v-card-text class="text-center text-title font-weight-bold titlecolor">
                    {{ notification.date }}
                  </v-card-text>
                  <v-divider light></v-divider>
                  <v-card-text class="text-center text-title font-weight-bold titlecolor">
                    {{ notification.title }}
                  </v-card-text>
                  <v-divider light></v-divider>
                  <v-card-text class="text-center cardtext-color">
                    <a
                      :href="notification.link"
                      target="_blank"
                      class="link-text"
                    >
                      {{ notification.link }}
                    </a>
                  </v-card-text>
                </v-card>
              </v-container>
            </v-col>
          </v-row>
        </v-card>
      </template>
    </v-data-iterator>
    <v-card
      color="primary"
      v-if="$vuetify.breakpoint.mdAndUp"
    >
      <v-card-text class="text-h5 titlecolor text-center">
        Notifications & Advisories
      </v-card-text>
       <v-card-text>
        <v-container>
          <v-data-table
            calculate-widths
            :search="search"
            :dense="dense"
            :headers="headers"
            :items="sanitizedNotifications"
            :sort-by="['date', 'title']"
            :sort-desc="[false, true]"
            dark
            class="st-color"
            loading-text
            loading
          >
          </v-data-table>
        </v-container>
       </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Notifications',
  data() {
    return {
      search: '',
      sortDesc: true,
      sortBy: 'date',
      headers: [
        {
          text: 'Date',
          align: 'start',
          sortable: true,
          value: 'date',
        },
        { text: 'Notification Title', value: 'title' },
        { text: 'Link', value: 'link' },
      ],
      success: true,
      notificationsData: {
        notifications: [],
      },
      lastRefreshed: '2020-09-13T00:30:23.022Z',
      lastOriginUpdate: '2020-09-12T02:30:00.000Z',
    };
  },
  computed: {
    sanitizedNotifications() {
      const notifications = [];
      this.notificationsData.notifications.forEach((notification) => {
        const unformattedDate = notification.title.slice(0, 10);
        let formattedDate = unformattedDate.split('.').reverse().join('-');
        let letterCount = 0;
        for (let position = 0; position < formattedDate.length; position += 1) {
          if (formattedDate.charAt(position) === '-') {
            letterCount += 1;
          }
        }
        let title = '';
        if (letterCount < 2) {
          formattedDate = 'NA';
          title = notification.title;
        } else {
          title = notification.title.slice(10);
        }
        notifications.push({
          date: formattedDate,
          title,
          link: notification.link,
        });
      });
      return notifications;
    },
  },
  mounted() {
    axios.get('https://api.rootnet.in/covid19-in/notifications')
      .then(this.setNotificationData)
      .catch();
  },
  methods: {
    setNotificationData(response) {
      this.notificationsData = response.data.data;
    },
  },
};
</script>

<style lang="scss" scoped>

.link-text {
  color: #E4555B !important;
  text-decoration: none;
}

.titlecolor {
  color: #E0F7FA !important;
}

.st-color {
  background-color: transparent;
}

.cardtext-color {
  color:#E4555B !important;
}

.v-list .v-select-list .v-sheet {
  background: #5851BE !important;
  background-color: #5851BE !important;
}

.v-sheet.v-list:not(.v-sheet--outlined) {
  background-color: #5851BE !important;
}
</style>
