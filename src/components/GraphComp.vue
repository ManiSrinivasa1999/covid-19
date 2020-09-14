<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="6" sm="10">
        <v-container>
          <apexchart
            class="bg-color"
            type="line"
            :options="filteredData.options"
            :series="filteredData.series"
          ></apexchart>
        </v-container>
      </v-col>
      <v-col cols="12" md="3" sm="10">
        <v-container>
          <v-select
            solo
            v-model="selectedState"
            :items="states"
            label="States"
            background-color="secondary lighten-5"
          ></v-select>
          <v-select
            solo
            v-model="selectedGender"
            :items="gender"
            label="Gender"
            background-color="secondary lighten-5"
          ></v-select>
          <v-select
            solo
            v-model="selectedAge"
            :items="ages"
            label="Ages"
            background-color="secondary lighten-5"
          ></v-select>
          <span class="white--text text-h6">
            Date Range
          </span>
          <v-menu
            ref="menu1"
            v-model="menu1"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="startDate"
                solo
                label="Initial Date"
                class="mt-4"
                v-bind="attrs"
                v-on="on"
                background-color="secondary lighten-5"
              ></v-text-field>
            </template>
            <v-date-picker v-model="startDate" no-title @input="menu1 = false"></v-date-picker>
          </v-menu>
          <v-menu
            ref="menu2"
            v-model="menu2"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="endDate"
                solo
                label="End Date"
                v-bind="attrs"
                v-on="on"
                background-color="secondary lighten-5"
              ></v-text-field>
            </template>
            <v-date-picker v-model="endDate" no-title @input="menu2 = false"></v-date-picker>
          </v-menu>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as papa from 'papaparse';

export default {
  name: 'GraphComp',
  data() {
    return {
      menu1: false,
      menu2: false,
      startDate: '',
      endDate: '',
      selectedState: 'Andhra Pradesh',
      selectedGender: 'Male',
      selectedAge: '',
      patientData: [],
      states: [
        'Andaman and Nicobar Islands',
        'Andhra Pradesh',
        'Arunachal Pradesh',
        'Assam',
        'Bihar',
        'Chandigarh',
        'Chhattisgarh',
        'Dadra and Nagar Haveli',
        'Daman and Diu',
        'Delhi',
        'Goa',
        'Gujarat',
        'Haryana',
        'Himachal Pradesh',
        'Jammu and Kashmir',
        'Jharkhand',
        'Karnataka',
        'Kerala',
        'Ladakh',
        'Lakshadweep',
        'Madhya Pradesh',
        'Maharashtra',
        'Manipur',
        'Meghalaya',
        'Mizoram',
        'Nagaland',
        'Odisha',
        'Puducherry',
        'Punjab',
        'Rajasthan',
        'Sikkim',
        'Tamil Nadu',
        'Telangana',
        'Tripura',
        'Uttar Pradesh',
        'Uttarakhand',
        'West Bengal',
      ],
      ages: [
        '0-9',
        '10-19',
        '20-29',
        '30-39',
        '40-49',
        '50-59',
        '60-69',
        '70-79',
      ],
      gender: [
        'Male',
        'Female',
        'Others',
      ],
      options: {
        chart: {
          id: 'vuechart-example',
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      },
      series: [
        {
          name: 'series-1',
          data: [30, 40, 45, 50, 49, 60, 70, 91],
        },
      ],
    };
  },
  mounted() {
    const ref = this.$store.state.storage.child('covid19india.csv');
    ref
      .getDownloadURL()
      .then(this.loadCSV)
      .catch();
  },
  methods: {
    loadCSV(csvURL) {
      papa.parse(csvURL, {
        download: true,
        complete: (data) => {
          this.patientData = data.data;
        },
      });
    },
  },
  computed: {
    filteredData() {
      const header = this.patientData[0];
      const patientData = [];
      this.patientData.slice(1).forEach((patientRecord) => {
        const patientRecordTemp = {};
        for (let i = 0; i <= patientRecord.length; i += 1) {
          patientRecordTemp[header[i]] = patientRecord[i];
        }
        patientData.push(patientRecordTemp);
      });
      // filter Gender
      const genderFilter = [];
      const selectedGenders = new Set();
      selectedGenders.add(this.selectedGender.toLowerCase());
      patientData.forEach((patientRecord) => {
        if (selectedGenders.has(patientRecord.gender)) {
          genderFilter.push(patientRecord);
        }
      });
      // Filter Age
      const ageFilter = [];
      const startAge = this.selectedAge.split('-')[0];
      const endAge = this.selectedAge.split('-')[1];
      console.log(startAge);
      const selectedAges = new Set();
      for (let j = startAge; j <= endAge; j += 1) {
        selectedAges.add(j);
      }
      genderFilter.forEach((patientRecord) => {
        if (selectedAges.has(patientRecord.age)) {
          ageFilter.push(patientRecord);
        }
      });
      // Filter State
      const stateFilter = [];
      const selectedStates = new Set(this.selectedState);
      genderFilter.forEach((patientRecord) => {
        if (selectedStates.has(patientRecord.state)) {
          stateFilter.push(patientRecord);
        }
      });
      // Filter Date Range
      // const dateRangeFilter = [];
      // const selectedDates = new Set();
      const historicalData = {};
      ageFilter.forEach((patientRecord) => {
        if (patientRecord.reportedOn in historicalData) {
          historicalData[patientRecord.reportedOn] += 1;
        } else {
          historicalData[patientRecord.reportedOn] = 1;
        }
      });
      return {
        options: {
          chart: {
            id: 'vuechart-example',
          },
          xaxis: {
            categories: Object.keys(historicalData),
          },
        },
        series: [{
          name: 'No of Deaths',
          data: Object.values(historicalData),
        }],
      };
    },
  },
};
</script>

<style lang="scss" scoped>

.bg-color {
  background-color: white !important;
}

</style>
