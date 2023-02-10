<template>
  <v-app class="bg-color">

    <!-- Sizes your content based upon application components -->
    <v-main>
      <v-container
        fluid
        v-if="$vuetify.breakpoint.lgAndUp"
      >
        <v-card
          color="primary"
        >
          <v-container fluid>
            <v-btn
              to="/"
              color="secondary"
              dark
            >
              <v-icon
                small
              >
                fas fa-home
              </v-icon>
              <span class="ml-2">
                COVID-19
              </span>
            </v-btn>
            <v-btn
              to="/contact"
              small
              class="ml-2"
              text
              color="#ACB0C8"
            >
              <v-icon
                small
              >
                fas fa-phone-alt
              </v-icon>
              <span class="ml-2 mr-2">
                contact & helpline info
              </span>
              <v-icon
                small
              >
                fas fa-address-book
              </v-icon>
            </v-btn>
          </v-container>
        </v-card>
      </v-container>
      <v-container
        fluid
        v-if="$vuetify.breakpoint.lgAndUp"
      >
        <v-card
          color="primary"
        >
          <v-container fluid>
            <v-btn
              to="/"
              color="error"
              dark
              class="mb-2 ml-2 mt-1"
            >
              <v-icon
                small
              >
                fab fa-staylinked
              </v-icon>
              <span class="ml-2">
                Stay Home / Stay Safe
              </span>
            </v-btn>
            <br>
            <v-spacer />
            <v-btn-toggle
              color="deep-purple accent-3"
              group
              borderless
              class="mt-2"
            >
              <v-btn value="notifications" to="/notifications" dark>
                Notifications & Advisories
              </v-btn>

              <v-btn value="hospitals" to="/hospital" dark>
                Hospitals & beds
              </v-btn>

              <v-btn value="colleges" to="/medicalcolleges" dark>
                Medical Colleges & beds
              </v-btn>

              <v-btn value="comparison" to="/graph" dark>
                Graph for Deceased person
              </v-btn>

            </v-btn-toggle>
          </v-container>
        </v-card>
      </v-container>
      <v-app-bar
        v-if="$vuetify.breakpoint.mdAndDown"
        color="primary"
      >
        <v-btn
          to="/"
          color="secondary"
          dark
        >
          <v-icon
            small
          >
            fas fa-home
          </v-icon>
          <span class="ml-2">
            COVID-19
          </span>
        </v-btn>
        <v-spacer />
        <v-app-bar-nav-icon @click.stop="drawer = !drawer">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="secondary" icon v-bind="attrs" v-on="on">
                <v-icon>fas fa-bars</v-icon>
              </v-btn>
            </template>
            <v-list
              no-action
              color="secondary"
            >
              <v-list-item
                v-for="button in buttons"
                :key="button.label"
                :to="button.url"
              >
                <v-list-item-content
                  class="white--text"
                >
                  <v-list-item-title>{{ button.label }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-app-bar-nav-icon>
      </v-app-bar>
      <v-container
        fluid
        v-if="$vuetify.breakpoint.mdAndDown"
        class="text-center"
      >
        <v-btn
          to="/"
          color="error"
          dark
          class="mt-2"
        >
          <v-icon
            small
          >
            fab fa-staylinked
          </v-icon>
          <span class="ml-2">
            Stay Home / Stay Safe
          </span>
        </v-btn>
      </v-container>

      <!-- Provides the application the proper gutter -->

      <!-- If using vue-router -->
      <router-view />
    </v-main>

    <!-- <v-footer app>
      <v-col
        class="text-center"
        cols="12"
      >
        Copyright &copy;{{ new Date().getFullYear() }} — <strong>huntFSD</strong>
      </v-col>
    </v-footer> -->
  </v-app>
</template>

<script>
import { dom } from '@fortawesome/fontawesome-svg-core';

export default {
  mounted() {
    dom.watch();
  },
  data() {
    return {
      // text: 'notifications',
      drawer: null,
      buttons: [
        {
          label: 'Contact & Helpline Info',
          url: '/contact',
        },
        {
          label: 'Notifications & Advisories',
          url: '/notifications',
        },
        {
          label: 'Hospitals & Beds',
          url: '/hospital',
        },
        {
          label: 'Medical Colleges & Beds',
          url: '/medicalcolleges',
        },
        {
          label: 'Graph for Deceased Person',
          url: '/graph',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>

.bg-color {
  background-color: #262C49 !important;
}

</style>
