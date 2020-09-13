<template>
  <v-container fluid>
    <v-card
      color="primary"
    >
      <v-card-title class="text-h5 titlecolor">
        Medical Colleges & Beds
      </v-card-title>
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
