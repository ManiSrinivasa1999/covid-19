<template>
  <v-container fluid>
    <v-card
      color="primary"
      v-if="$vuetify.breakpoint.smAndDown"
    >
      <v-card-text class="white--text text-h6 text-center">
        Medical Colleges & Beds
      </v-card-text>
      <v-row>
        <v-col cols="12" sm="12"
          v-for="(medicalCollege, i) in medicalCollegesData.medicalColleges"
          :key="i"
        >
          <v-container fluid>
            <v-card
              color="primary"
            >
              <v-card-text class="text-center text-h6 font-weight-bold titlecolor">
                {{ medicalCollege.state }}
              </v-card-text><v-chip
                large
                color="primary lighten-1"
                label
                class="ma-2 chip-width"
              >
                Institute Name: {{ medicalCollege.name }}
              </v-chip>
              <v-chip
                large
                color="primary lighten-1"
                label
                class="ma-2 chip-width"
              >
                City: {{ medicalCollege.city }}
              </v-chip>
              <v-chip
                large
                color="primary lighten-1"
                label
                class="ma-2 chip-width"
              >
                Type: {{ medicalCollege.ownership }}
              </v-chip>
              <v-chip
                large
                color="primary lighten-1"
                label
                class="ma-2 chip-width"
              >
                Admission Capacity {{ medicalCollege.admissionCapacity }}
              </v-chip>
              <v-chip
                large
                color="primary lighten-1"
                label
                class="ma-2 chip-width"
              >
                Hospital Beds: {{ medicalCollege.hospitalBeds }}
              </v-chip>
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
        Medical Colleges & Beds
      </v-card-text>
       <v-card-text>
        <v-container>
          <v-data-table
            :dense="dense"
            :headers="headers"
            :items="sanitizedColleges"
            :sort-by="[
              'state',
              'name',
              'city',
              'ownership',
              'admissionCapacity',
              'hospitalBeds',
            ]"
            :sort-desc="[
              true,
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
  name: 'MedicalColleges',
  data() {
    return {
      headers: [
        {
          text: 'State Name',
          align: 'start',
          sortable: true,
          value: 'state',
        },
        { value: 'name', text: 'Institute Name' },
        { value: 'city', text: 'City' },
        { value: 'ownership', text: 'Type' },
        { value: 'admissionCapacity', text: 'Admission Capacity' },
        { value: 'hospitalBeds', text: 'Hospital Beds' },
      ],
      success: true,
      medicalCollegesData: {
        medicalColleges: [],
        sources: [],
      },
      lastRefreshed: '2020-04-16T16:54:08.697Z',
      lastOriginUpdate: '2020-04-16T16:54:08.697Z',
    };
  },
  computed: {
    sanitizedColleges() {
      const colleges = [];
      this.medicalCollegesData.medicalColleges.forEach((college) => {
        colleges.push({
          state: college.state,
          name: college.name,
          city: college.city,
          ownership: college.ownership,
          admissionCapacity: college.admissionCapacity,
          hospitalBeds: college.hospitalBeds,
        });
      });
      return colleges;
    },
  },
  mounted() {
    axios.get('https://api.rootnet.in/covid19-in/hospitals/medical-colleges')
      .then(this.setCollegesData)
      .catch();
  },
  methods: {
    setCollegesData(response) {
      this.medicalCollegesData = response.data.data;
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

</style>
