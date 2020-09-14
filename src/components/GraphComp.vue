<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="6" sm="10">
        <v-container>
          <apexchart
            class="bg-color"
            type="line"
            :options="options"
            :series="series"
          ></apexchart>
        </v-container>
      </v-col>
      <v-col cols="12" md="3" sm="10">
        <v-container>
          <v-select
            solo
            :items="items"
            label="States"
          ></v-select>
          <v-select
            solo
            :items="age"
            label="Age Groups"
          ></v-select>
          <v-select
            solo
            :items="gender"
            label="Gender"
          ></v-select>
          <span class="white--text text-h6">
            Date Range
          </span>
          <v-text-field
            v-model="dateRangeText"
            readonly
            solo
            class="mt-2"
          ></v-text-field>
        </v-container>
      </v-col>
      <v-col cols="12" md="3" sm="10">
        <v-container>
          <v-date-picker v-model="dates" range></v-date-picker>
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
      dates: [
        '2019-09-10',
        '2019-09-20',
      ],
      age: [
        '0-9',
        '10-19',
        '20-29',
        '30-39',
        '40-49',
        '50-59',
        '60-69',
        '70+',
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
      });
    },
  },
  computed: {
    dateRangeText() {
      return this.dates.join(' ~ ');
    },
  },
};
</script>

<style lang="scss" scoped>

.bg-color {
  background-color: white !important;
}

</style>
