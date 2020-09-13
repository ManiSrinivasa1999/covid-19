<template>
  <v-container fluid>
    <v-card
      color="primary"
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
            class="ma-2 chip-width mx-auto"
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
          <v-simple-table
            :dense="dense"
            dark
            class="st-color"
          >
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">State Name</th>
                  <th class="text-left">
                    Rural Hospitals
                  </th>
                  <th class="text-left">
                    Rural Beds
                  </th>
                  <th class="text-left">
                    Urban Hospitals
                  </th>
                  <th class="text-left">
                    Urban Beds
                  </th>
                  <th class="text-left">
                    Total Hospitals
                  </th>
                  <th class="text-left">
                    Total Beds
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(region, i) in hospitalData.regional"
                  :key="i"
                  :class="i % 2 ? 'primary' : 'primary lighten-1'"
                >
                  <td>{{ region.state }}</td>
                  <td>{{ region.ruralHospitals }}</td>
                  <td>{{ region.ruralBeds }}</td>
                  <td>{{ region.urbanHospitals }}</td>
                  <td>{{ region.urbanBeds }}</td>
                  <td>{{ region.totalHospitals }}</td>
                  <td>{{ region.totalBeds }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-container>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'Hospital',
  data() {
    return {
      success: true,
      hospitalData: {
        summary: {
          ruralHospitals: 39620,
          ruralBeds: 559176,
          urbanHospitals: 7544,
          urbanBeds: 862346,
          totalHospitals: 47164,
          totalBeds: 1421522,
        },
        sources: [
          {
            url: 'https://pib.gov.in/PressReleasePage.aspx?PRID=1539877',
            lastUpdated: '2017-01-01T00:00:00.000Z',
          },
        ],
        regional: [
          {
            state: 'Andhra Pradesh',
            ruralHospitals: 193,
            ruralBeds: 6480,
            urbanHospitals: 65,
            urbanBeds: 16658,
            totalHospitals: 258,
            totalBeds: 23138,
            asOn: '2017-01-01T00:00:00.000Z',
          },
          {
            state: 'Arunachal Pradesh',
            ruralHospitals: 208,
            ruralBeds: 2136,
            urbanHospitals: 10,
            urbanBeds: 268,
            totalHospitals: 218,
            totalBeds: 2404,
            asOn: '2017-12-31T00:00:00.000Z',
          },
          {
            state: 'Assam',
            ruralHospitals: 1176,
            ruralBeds: 10944,
            urbanHospitals: 50,
            urbanBeds: 6198,
            totalHospitals: 1226,
            totalBeds: 17142,
            asOn: '2017-12-31T00:00:00.000Z',
          },
          {
            state: 'Bihar',
            ruralHospitals: 930,
            ruralBeds: 6083,
            urbanHospitals: 103,
            urbanBeds: 5936,
            totalHospitals: 1033,
            totalBeds: 12019,
            asOn: '2016-12-31T00:00:00.000Z',
          },
          {
            state: 'Chhattisgarh',
            ruralHospitals: 169,
            ruralBeds: 5070,
            urbanHospitals: 45,
            urbanBeds: 4342,
            totalHospitals: 214,
            totalBeds: 9412,
            asOn: '2016-01-01T00:00:00.000Z',
          },
          {
            state: 'Goa',
            ruralHospitals: 17,
            ruralBeds: 1405,
            urbanHospitals: 25,
            urbanBeds: 1608,
            totalHospitals: 42,
            totalBeds: 3013,
            asOn: '2017-12-31T00:00:00.000Z',
          },
          {
            state: 'Gujarat',
            ruralHospitals: 364,
            ruralBeds: 11715,
            urbanHospitals: 122,
            urbanBeds: 20565,
            totalHospitals: 486,
            totalBeds: 32280,
            asOn: '2016-12-31T00:00:00.000Z',
          },
          {
            state: 'Haryana',
            ruralHospitals: 609,
            ruralBeds: 6690,
            urbanHospitals: 59,
            urbanBeds: 4550,
            totalHospitals: 668,
            totalBeds: 11240,
            asOn: '2016-12-31T00:00:00.000Z',
          },
          {
            state: 'Himachal Pradesh',
            ruralHospitals: 705,
            ruralBeds: 5665,
            urbanHospitals: 96,
            urbanBeds: 6734,
            totalHospitals: 801,
            totalBeds: 12399,
            asOn: '2017-12-31T00:00:00.000Z',
          },
          {
            state: 'Jammu & Kashmir',
            ruralHospitals: 56,
            ruralBeds: 7234,
            urbanHospitals: 76,
            urbanBeds: 4417,
            totalHospitals: 132,
            totalBeds: 11651,
            asOn: '2016-12-30T00:00:00.000Z',
          },
          {
            state: 'Jharkhand',
            ruralHospitals: 519,
            ruralBeds: 5842,
            urbanHospitals: 36,
            urbanBeds: 4942,
            totalHospitals: 555,
            totalBeds: 10784,
            asOn: '2015-12-31T00:00:00.000Z',
          },
          {
            state: 'Karnataka',
            ruralHospitals: 2471,
            ruralBeds: 21072,
            urbanHospitals: 374,
            urbanBeds: 49093,
            totalHospitals: 2845,
            totalBeds: 70165,
            asOn: '2017-12-31T00:00:00.000Z',
          },
          {
            state: 'Kerala',
            ruralHospitals: 981,
            ruralBeds: 16865,
            urbanHospitals: 299,
            urbanBeds: 21139,
            totalHospitals: 1280,
            totalBeds: 38004,
            asOn: '2017-01-01T00:00:00.000Z',
          },
          {
            state: 'Madhya Pradesh',
            ruralHospitals: 334,
            ruralBeds: 10020,
            urbanHospitals: 117,
            urbanBeds: 18819,
            totalHospitals: 451,
            totalBeds: 28839,
            asOn: '2016-01-01T00:00:00.000Z',
          },
          {
            state: 'Maharashtra',
            ruralHospitals: 273,
            ruralBeds: 12398,
            urbanHospitals: 438,
            urbanBeds: 39048,
            totalHospitals: 711,
            totalBeds: 51446,
            asOn: '2015-12-31T00:00:00.000Z',
          },
          {
            state: 'Manipur',
            ruralHospitals: 23,
            ruralBeds: 730,
            urbanHospitals: 7,
            urbanBeds: 697,
            totalHospitals: 30,
            totalBeds: 1427,
            asOn: '2014-01-01T00:00:00.000Z',
          },
          {
            state: 'Meghalaya',
            ruralHospitals: 143,
            ruralBeds: 1970,
            urbanHospitals: 14,
            urbanBeds: 2487,
            totalHospitals: 157,
            totalBeds: 4457,
            asOn: '2017-12-31T00:00:00.000Z',
          },
          {
            state: 'Mizoram',
            ruralHospitals: 56,
            ruralBeds: 604,
            urbanHospitals: 34,
            urbanBeds: 1393,
            totalHospitals: 90,
            totalBeds: 1997,
            asOn: '2017-12-31T00:00:00.000Z',
          },
          {
            state: 'Nagaland',
            ruralHospitals: 21,
            ruralBeds: 630,
            urbanHospitals: 15,
            urbanBeds: 1250,
            totalHospitals: 36,
            totalBeds: 1880,
            asOn: '2015-12-31T00:00:00.000Z',
          },
          {
            state: 'Odisha',
            ruralHospitals: 1655,
            ruralBeds: 6339,
            urbanHospitals: 149,
            urbanBeds: 12180,
            totalHospitals: 1804,
            totalBeds: 18519,
            asOn: '2017-12-31T00:00:00.000Z',
          },
          {
            state: 'Punjab',
            ruralHospitals: 510,
            ruralBeds: 5805,
            urbanHospitals: 172,
            urbanBeds: 12128,
            totalHospitals: 682,
            totalBeds: 17933,
            asOn: '2017-12-31T00:00:00.000Z',
          },
          {
            state: 'Rajasthan',
            ruralHospitals: 602,
            ruralBeds: 21088,
            urbanHospitals: 150,
            urbanBeds: 10760,
            totalHospitals: 752,
            totalBeds: 31848,
            asOn: '2016-12-31T00:00:00.000Z',
          },
          {
            state: 'Sikkim',
            ruralHospitals: 24,
            ruralBeds: 260,
            urbanHospitals: 9,
            urbanBeds: 1300,
            totalHospitals: 33,
            totalBeds: 1560,
            asOn: '2017-12-31T00:00:00.000Z',
          },
          {
            state: 'Tamil Nadu',
            ruralHospitals: 692,
            ruralBeds: 40179,
            urbanHospitals: 525,
            urbanBeds: 37353,
            totalHospitals: 1217,
            totalBeds: 77532,
            asOn: '2017-12-31T00:00:00.000Z',
          },
          {
            state: 'Telangana',
            ruralHospitals: 802,
            ruralBeds: 7668,
            urbanHospitals: 61,
            urbanBeds: 13315,
            totalHospitals: 863,
            totalBeds: 20983,
            asOn: '2017-12-31T00:00:00.000Z',
          },
          {
            state: 'Tripura',
            ruralHospitals: 99,
            ruralBeds: 1140,
            urbanHospitals: 56,
            urbanBeds: 3277,
            totalHospitals: 155,
            totalBeds: 4417,
            asOn: '2017-12-31T00:00:00.000Z',
          },
          {
            state: 'Uttar Pradesh',
            ruralHospitals: 4442,
            ruralBeds: 39104,
            urbanHospitals: 193,
            urbanBeds: 37156,
            totalHospitals: 4635,
            totalBeds: 76260,
            asOn: '2017-12-31T00:00:00.000Z',
          },
          {
            state: 'Uttarakhand',
            ruralHospitals: 410,
            ruralBeds: 3284,
            urbanHospitals: 50,
            urbanBeds: 5228,
            totalHospitals: 460,
            totalBeds: 8512,
            asOn: '2015-12-31T00:00:00.000Z',
          },
          {
            state: 'West Bengal',
            ruralHospitals: 1272,
            ruralBeds: 19684,
            urbanHospitals: 294,
            urbanBeds: 58882,
            totalHospitals: 1566,
            totalBeds: 78566,
            asOn: '2015-01-01T00:00:00.000Z',
          },
          {
            state: 'Andaman & Nicobar Islands',
            ruralHospitals: 27,
            ruralBeds: 575,
            urbanHospitals: 3,
            urbanBeds: 500,
            totalHospitals: 30,
            totalBeds: 1075,
            asOn: '2016-12-31T00:00:00.000Z',
          },
          {
            state: 'Chandigarh',
            ruralHospitals: 0,
            ruralBeds: 0,
            urbanHospitals: 4,
            urbanBeds: 778,
            totalHospitals: 4,
            totalBeds: 778,
            asOn: '2016-12-31T00:00:00.000Z',
          },
          {
            state: 'Dadra & Nagar Haveli',
            ruralHospitals: 10,
            ruralBeds: 273,
            urbanHospitals: 1,
            urbanBeds: 316,
            totalHospitals: 11,
            totalBeds: 589,
            asOn: '2017-12-31T00:00:00.000Z',
          },
          {
            state: 'Daman & Diu',
            ruralHospitals: 5,
            ruralBeds: 240,
            urbanHospitals: 0,
            urbanBeds: 0,
            totalHospitals: 5,
            totalBeds: 240,
            asOn: '2015-12-31T00:00:00.000Z',
          },
          {
            state: 'Delhi',
            ruralHospitals: 0,
            ruralBeds: 0,
            urbanHospitals: 109,
            urbanBeds: 24383,
            totalHospitals: 109,
            totalBeds: 24383,
            asOn: '2015-01-01T00:00:00.000Z',
          },
          {
            state: 'Lakshadweep',
            ruralHospitals: 9,
            ruralBeds: 300,
            urbanHospitals: 0,
            urbanBeds: 0,
            totalHospitals: 9,
            totalBeds: 300,
            asOn: '2016-01-01T00:00:00.000Z',
          },
          {
            state: 'Puducherry',
            ruralHospitals: 3,
            ruralBeds: 96,
            urbanHospitals: 11,
            urbanBeds: 3473,
            totalHospitals: 14,
            totalBeds: 3569,
            asOn: '2016-01-01T00:00:00.000Z',
          },
          {
            state: 'INDIA',
            ruralHospitals: 19810,
            ruralBeds: 279588,
            urbanHospitals: 3772,
            urbanBeds: 431173,
            totalHospitals: 23582,
            totalBeds: 710761,
            asOn: '2016-01-01T00:00:00.000Z',
          },
        ],
      },
      lastRefreshed: '2020-08-01T07:38:22.389Z',
      lastOriginUpdate: '2017-01-01T00:00:00.000Z',
    };
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

// .chip-width {
//   width: 187px !important;
//   align-self: center !important;
//   justify-self: center !important;
// }

</style>
