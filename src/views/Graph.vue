<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="5" sm="10">
        <apexchart
          class="bg-color"
          type="line"
          :options="options"
          :series="series"
        >
        </apexchart>
      </v-col>
      <v-col cols="12" md="7" sm="10">

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as papa from 'papaparse';

export default {
  name: 'Graph',
  data() {
    return {
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
};
</script>

<style lang="scss" scoped>

.bg-color {
  background-color: white !important;
}

</style>
