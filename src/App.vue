<template>
  <v-app class="bg-color">

    <!-- Sizes your content based upon application components -->
    <v-main>
      <v-container fluid>
        <v-card
          color="#10163A"
        >
          <v-container fluid>
            <v-btn
              to="/"
              color="#5851BE"
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
            <v-btn
              to="/precaution"
              small
              class="ml-2"
              text
              color="#ACB0C8"
            >
              <v-icon
                small
              >
                fas fa-head-side-mask
              </v-icon>
              <span class="ml-2 mr-2">
                precaution
              </span>
              <v-icon
                small
              >
                fas fa-handshake-slash
              </v-icon>
            </v-btn>
          </v-container>
        </v-card>
      </v-container>
      <v-container fluid>
        <v-card
          color="#10163A"
        >
          <v-container fluid>
            <v-btn
              to="/"
              color="#E4555B"
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
            <v-spacer></v-spacer>
            <v-btn-toggle
              v-model="text"
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

      <!-- Provides the application the proper gutter -->

        <!-- If using vue-router -->
        <router-view></router-view>
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
    };
  },
};
</script>

<style lang="scss" scoped>
.bg-color {
  background-color: #262C49 !important;
}
</style>
