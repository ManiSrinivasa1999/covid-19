<template>
  <v-container fluid>
    <v-card
      color="primary"
    >
      <v-card-text class="text-h5 text-center titlecolor">
        Deceased Persons
      </v-card-text>
      <v-card-text>
        <v-row>
          <v-col cols="12" xl="6" lg="8" md="12" sm="12">
            <v-container>
              <apexchart
                ref="chart"
                class="bg-color"
                type="line"
                :options="filteredData.options"
                :series="filteredData.series"
              ></apexchart>
            </v-container>
          </v-col>
          <v-col cols="12" xl="6" lg="4" md="12" sm="12">
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
                item-text="text"
                item-value="value"
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
                <v-date-picker
                  :max="endDate"
                  v-model="startDate"
                  no-title @input="menu1 = false"></v-date-picker>
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
                <v-date-picker
                  :min="startDate"
                  v-model="endDate"
                  no-title @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
              <v-btn
                @click="downloadPDF()"
                color="success"
                class="mb-4"
              >
                Download pdf
              </v-btn>
              <v-row>
                <v-col cols="8">
                  <v-text-field
                    solo
                    label="Email"
                    background-color="secondary lighten-5"
                  ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-btn
                    @click="downloadPDF()"
                    color="success"
                    large
                  >
                    Send To
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import * as papa from 'papaparse';
import moment from 'moment';
import { jsPDF } from 'jspdf';
import 'svg2pdf.js';

export default {
  name: 'GraphComp',
  data() {
    return {
      menu1: false,
      menu2: false,
      startDate: '2020-02-19',
      endDate: '2020-04-19',
      selectedState: 'Andhra Pradesh',
      selectedGender: 'Male',
      selectedAge: [0, 150],
      patientData: [],
      states: [],
      ages: [
        {
          text: 'All Ages',
          value: [0, 150],
        },
        {
          text: '0-9',
          value: [0, 9],
        },
        {
          text: '10-19',
          value: [10, 19],
        },
        {
          text: '20-29',
          value: [20, 29],
        },
        {
          text: '30-39',
          value: [30, 39],
        },
        {
          text: '40-49',
          value: [40, 49],
        },
        {
          text: '50-59',
          value: [50, 59],
        },
        {
          text: '60-69',
          value: [60, 69],
        },
        {
          text: '70+',
          value: [70, 150],
        },
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
          const states = new Set([]);
          this.patientData.slice(1).forEach((patientRecord) => {
            states.add(patientRecord[7]);
          });
          this.states = Array.from(states);
        },
      });
    },
    downloadPDF() {
      this.$refs.chart.dataURI().then(({ imgURI }) => {
        // eslint-disable-next-line new-cap
        const pdf = new jsPDF();
        pdf.addImage(imgURI, 'PNG', 0, 0);
        pdf.save('download.pdf');
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
      // Filter Gender
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
      genderFilter.forEach((patientRecord) => {
        if (
          this.selectedAge[0] < Number(patientRecord.ageEstimate)
          && this.selectedAge[1] > Number(patientRecord.ageEstimate)) {
          ageFilter.push(patientRecord);
        }
      });
      // Filter State
      const stateFilter = [];
      const selectedStates = new Set();
      selectedStates.add(this.selectedState);
      ageFilter.forEach((patientRecord) => {
        if (selectedStates.has(patientRecord.state)) {
          stateFilter.push(patientRecord);
        }
      });
      // Filter Date Range
      const dateRangeFilter = [];
      const startDateEpoch = moment(this.startDate).unix();
      const endDateEpoch = moment(this.endDate).unix();
      stateFilter.forEach((patientRecord) => {
        const patientRecordDateEpoch = moment(patientRecord.reportedOn, 'DD/MM/YYYY').unix();
        if (startDateEpoch < patientRecordDateEpoch && endDateEpoch > patientRecordDateEpoch) {
          dateRangeFilter.push(patientRecord);
        }
      });
      const historicalData = {};
      dateRangeFilter.forEach((patientRecord) => {
        if (patientRecord.reportedOn in historicalData) {
          historicalData[patientRecord.reportedOn] += 1;
        } else {
          historicalData[patientRecord.reportedOn] = 1;
        }
      });
      return {
        options: {
          title: {
            text: 'Deceased Persons Chart',
            align: 'center',
            style: {
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#263238',
            },
          },
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

.titlecolor {
  color: #BDBDBD !important;
}

</style>
