<template>
  <v-container fluid>
    <v-card
      color="primary"
      v-if="$vuetify.breakpoint.smAndDown"
    >
      <v-card-text class="white--text text-h5 text-center titlecolor">
        Hospitals & Beds
      </v-card-text>
      <v-card
        color="primary"
      >
        <div class="text-center">
          <v-chip
            color="primary lighten-1"
            label
            class="ma-2"
          >
            Rural Hospitals: {{ hospitalData.summary.ruralHospitals }}
          </v-chip>
          <v-chip
            color="primary lighten-1"
            label
            class="ma-2"
          >
            Rural Beds: {{ hospitalData.summary.ruralBeds }}
          </v-chip>
          <v-chip
            color="primary lighten-1"
            label
            class="ma-2"
          >
            Urban Hospitals: {{ hospitalData.summary.urbanHospitals }}
          </v-chip>
          <v-chip
            color="primary lighten-1"
            label
            class="ma-2"
          >
            Urban Beds: {{ hospitalData.summary.urbanBeds }}
          </v-chip>
          <v-chip
            color="primary lighten-1"
            label
            class="ma-2"
          >
            Total Hospitals: {{ hospitalData.summary.totalHospitals }}
          </v-chip>
          <v-chip
            color="primary lighten-1"
            label
            class="ma-2"
          >
            Total Beds: {{ hospitalData.summary.totalBeds }}
          </v-chip>
        </div>
      </v-card>
      <v-row>
        <v-col cols="12" sm="6" xs="12"
          v-for="(region, i) in hospitalData.regional"
          :key="i"
        >
          <v-container>
            <v-card
              color="secondary darken-1"
            >
              <v-card-text class="text-center text-title font-weight-bold titlecolor">
                {{ region.state }}
              </v-card-text>
              <v-row>
                <v-col cols="6" sm="6" xs="6">
                  <v-card-text class="text-center text-title font-weight-bold titlecolor">
                    Rural Hospitals
                    <br> {{ region.ruralHospitals }}
                  </v-card-text>
                  <v-card-text class="text-center text-title font-weight-bold titlecolor">
                    Rural Beds
                    <br> {{ region.ruralBeds }}
                  </v-card-text>
                  <v-card-text class="text-center text-title font-weight-bold titlecolor">
                    Urban Hospitals
                    <br> {{ region.urbanHospitals }}
                  </v-card-text>
                </v-col>
                <v-col cols="6" sm="6" xs="5">
                  <v-card-text class="text-center text-title font-weight-bold titlecolor">
                    Urban Beds
                    <br> {{ region.urbanBeds }}
                  </v-card-text>
                  <v-card-text class="text-center text-title font-weight-bold titlecolor">
                    Total Hospitals
                    <br> {{ region.totalHospitals }}
                  </v-card-text>
                  <v-card-text class="text-center text-title font-weight-bold titlecolor">
                    Total Beds
                    <br> {{ region.totalBeds }}
                  </v-card-text>
                </v-col>
              </v-row>
            </v-card>
          </v-container>
        </v-col>
      </v-row>
    </v-card>
    <v-card
      color="primary"
      v-if="$vuetify.breakpoint.mdAndUp"
    >
      <v-card-text class="text-h5 text-center titlecolor">
        Hospitals & Beds
      </v-card-text>
      <v-card-text>
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
  width: 158px !important;
}

</style>
