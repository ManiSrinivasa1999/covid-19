<template>
  <v-container fluid>
    <v-row
      v-if="$vuetify.breakpoint.smAndDown"
    >
      <span class="white--text text-center">
        Hospitals & Beds
      </span>
      <v-container fluid>
        <v-card
        color="primary"
        >
          <div class="text-center">
            <v-chip
              large
              color="primary lighten-1"
              label
              class="ma-2"
            >
              Rural Hospitals: {{ hospitalData.summary.ruralHospitals }}
            </v-chip>
            <v-chip
              large
              color="primary lighten-1"
              label
              class="ma-2"
            >
              Rural Beds: {{ hospitalData.summary.ruralBeds }}
            </v-chip>
            <v-chip
              large
              color="primary lighten-1"
              label
              class="ma-2"
            >
              Urban Hospitals: {{ hospitalData.summary.urbanHospitals }}
            </v-chip>
            <v-chip
              large
              color="primary lighten-1"
              label
              class="ma-2"
            >
              Urban Beds: {{ hospitalData.summary.urbanBeds }}
            </v-chip>
            <v-chip
              large
              color="primary lighten-1"
              label
              class="ma-2"
            >
              Total Hospitals: {{ hospitalData.summary.totalHospitals }}
            </v-chip>
            <v-chip
              large
              color="primary lighten-1"
              label
              class="ma-2"
            >
              Total Beds: {{ hospitalData.summary.totalBeds }}
            </v-chip>
          </div>
        </v-card>
        <v-divider light>
        </v-divider>
        <v-col cols="12" sm="12"
          v-for="(region, i) in hospitalData.regional"
          :key="i"
        >
          <v-card
            color="primary"
          >
            <v-card-text class="text-center text-title font-weight-bold titlecolor">
              {{ region.state }}
            </v-card-text><v-chip
              large
              color="primary lighten-1"
              label
              class="ma-2 chip-width"
            >
              Rural Hospitals: {{ region.ruralHospitals }}
            </v-chip>
            <v-chip
              large
              color="primary lighten-1"
              label
              class="ma-2 chip-width"
            >
              Rural Beds: {{ region.ruralBeds }}
            </v-chip>
            <v-chip
              large
              color="primary lighten-1"
              label
              class="ma-2 chip-width"
            >
              Urban Hospitals: {{ region.urbanHospitals }}
            </v-chip>
            <v-chip
              large
              color="primary lighten-1"
              label
              class="ma-2 chip-width"
            >
              Urban Beds: {{ region.urbanBeds }}
            </v-chip>
            <v-chip
              large
              color="primary lighten-1"
              label
              class="ma-2 chip-width"
            >
              Total Hospitals: {{ region.totalHospitals }}
            </v-chip>
            <v-chip
              large
              color="primary lighten-1"
              label
              class="ma-2 chip-width"
            >
              Total Beds: {{ region.totalBeds }}
            </v-chip>
          </v-card>
        </v-col>
      </v-container>
    </v-row>
    <v-card
      color="primary"
      v-if="$vuetify.breakpoint.mdAndUp"
    >
      <v-card-title class="text-h5 titlecolor">
        Hospitals & Beds
      </v-card-title>
      <v-card-text>
        <div class="text-center">
          <v-chip
            large
            color="primary lighten-1"
            label
            class="ma-2 chip-width"
          >
            Rural Hospitals: {{ hospitalData.summary.ruralHospitals }}
          </v-chip>
          <v-chip
            large
            color="primary lighten-1"
            label
            class="ma-2 chip-width"
          >
            Rural Beds: {{ hospitalData.summary.ruralBeds }}
          </v-chip>
          <v-chip
            large
            color="primary lighten-1"
            label
            class="ma-2 chip-width"
          >
            Urban Hospitals: {{ hospitalData.summary.urbanHospitals }}
          </v-chip>
          <v-chip
            large
            color="primary lighten-1"
            label
            class="ma-2 chip-width"
          >
            Urban Beds: {{ hospitalData.summary.urbanBeds }}
          </v-chip>
          <v-chip
            large
            color="primary lighten-1"
            label
            class="ma-2 chip-width"
          >
            Total Hospitals: {{ hospitalData.summary.totalHospitals }}
          </v-chip>
          <v-chip
            large
            color="primary lighten-1"
            label
            class="ma-2 chip-width"
          >
            Total Beds: {{ hospitalData.summary.totalBeds }}
          </v-chip>
        </div>
        <v-container>
          <v-data-table
            :dense="dense"
            :headers="headers"
            :items="sanitizedHospitals"
            :sort-by="[
              'state',
              'ruralHospitals',
              'ruralBeds',
              'urbanHospitals',
              'urbanBeds',
              'totalHospitals',
              'totalBeds'
            ]"
            :sort-desc="[
              true,
              false,
              false,
              false,
              false,
              false,
              false,
            ]"
            multi-sort
            dark
            class="st-color"
            loading-text
            loading
            v-if="$vuetify.breakpoint.mdAndUp"
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
  name: 'Hospital',
  data() {
    return {
      headers: [
        {
          text: 'State Name',
          align: 'start',
          sortable: true,
          value: 'state',
        },
        { text: 'Rural Hospitals', value: 'ruralHospitals' },
        { text: 'Rural Beds', value: 'ruralBeds' },
        { text: 'Urban Hospitals', value: 'urbanHospitals' },
        { text: 'Urban Beds', value: 'urbanBeds' },
        { text: 'Total Hospitals', value: 'totalHospitals' },
        { text: 'Total Beds', value: 'totalBeds' },
      ],
      success: true,
      hospitalData: {
        summary: {},
        regional: [],
      },
      lastRefreshed: '2020-08-01T07:38:22.389Z',
      lastOriginUpdate: '2017-01-01T00:00:00.000Z',
    };
  },
  computed: {
    sanitizedHospitals() {
      const regions = [];
      this.hospitalData.regional.forEach((region) => {
        regions.push({
          state: region.state,
          ruralHospitals: region.ruralHospitals,
          ruralBeds: region.ruralBeds,
          urbanHospitals: region.urbanHospitals,
          urbanBeds: region.urbanBeds,
          totalHospitals: region.totalHospitals,
          totalBeds: region.totalBeds,
        });
      });
      return regions;
    },
  },
  mounted() {
    axios.get('https://api.rootnet.in/covid19-in/hospitals/beds')
      .then(this.setHospitalsData)
      .catch();
  },
  methods: {
    setHospitalsData(response) {
      this.hospitalData = response.data.data;
    },
  },
};
</script>

<style lang="scss" scoped>

.titlecolor {
  color: #BDBDBD !important;
}

.st-color {
  background-color: transparent;
}

.chip-width {
  width: 162px !important;
}

</style>
