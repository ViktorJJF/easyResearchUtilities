<template>
  <div class="mt-3">
    <v-chip class="ma-2" color="primary">Inglés</v-chip>
    <v-progress-linear v-if="!isDataReady" class="my-5" color="primary" buffer-value="0" stream></v-progress-linear>
    <v-simple-table class="table-header">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              <span>#</span>
            </th>
            <th class="text-left">
              <span>Título</span>
            </th>
            <th class="text-left">
              <span>Fecha</span>
            </th>
            <th class="text-left">
              <span>Sci-hub</span>
            </th>
            <th class="text-left">
              <span>DOI</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(research,idx) in researches" :key="idx">
            <td>{{ idx+1 }}</td>
            <td>{{ research.title }}</td>
            <td>{{ research.date }}</td>
            <td>
              <a :href="'https://sci-hub.tw/'+research.doi" target="_blank">Ver</a>
            </td>
            <td>
              <a :href="research.link" target="_blank">{{ research.link }}</a>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-alert type="error" v-show="researches.length===0">Aún no hiciste búsquedas</v-alert>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    query: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      researches: [],
      isDataReady: true
    };
  },
  methods: {
    getResearches() {
      this.isDataReady = false;
      axios
        .get("/api/scopus", { params: { query: this.query } })
        .then(res => {
          console.log("llegaron los datos");
          this.isDataReady = true;
          console.log("ahora data ready es: ", this.isDataReady);
          this.researches = res.data.researches;
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
// $base-color: #122d4a;
.table-header {
  th {
    font-size: 21px;
    // background-color: $base-color;
    font-weight: bold;
    span {
      color: black;
    }
  }
}
</style>