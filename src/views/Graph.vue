<template>
  <v-container></v-container>
</template>

<script>
import * as papa from 'papaparse';

export default {
  name: 'Graph',
  data() {
    return {
    };
  },
  mounted() {
    const ref = this.$store.state.storage.child('covid19india.csv');
    ref.getDownloadURL()
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

</style>
