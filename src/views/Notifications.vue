<template>
  <v-container fluid>
    <v-row
      v-if="$vuetify.breakpoint.smAndDown"
    >
      <span class="white--text text-center">
        Notifications & Advisories
      </span>
      <v-col cols="12" sm="12"
        v-for="(notification, i) in notificationsData.notifications"
        :key="i"
      >
        <v-card
          color="primary"
        >
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
      </v-col>
    </v-row>
    <v-card
      color="primary"
      v-if="$vuetify.breakpoint.mdAndUp"
    >
      <v-card-title class="text-h5 titlecolor">
        Notifications & Advisories
      </v-card-title>
       <v-card-text>
        <v-container>
          <v-data-table
            :dense="dense"
            :headers="headers"
            :items="sanitizedNotifications"
            :sort-by="['date', 'title']"
            :sort-desc="[false, true]"
            multi-sort
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
        let title = '';
        if (new Date(formattedDate) !== 'Invalid Date') {
          title = notification.title.slice(10);
        } else {
          formattedDate = 'NA';
          title = notification.title;
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
  color: #BDBDBD !important;
}

.st-color {
  background-color: transparent;
}

.cardtext-color {
  color:#E4555B !important;
}

</style>
