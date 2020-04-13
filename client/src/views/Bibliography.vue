<template>
  <v-container fluid>
    <v-card class="pa-3">
      <h1>Fuentes de información</h1>
      <v-card-title class="text-center justify-center py-6">
        <v-row align="center" justify="center" dense>
          <v-col cols="12" sm="9">
            <v-text-field
              v-model="query"
              dense
              hide-details
              placeholder="Ingrese las palabras clave"
              outlined
              @keydown.enter="getResearches(query)"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <v-btn block color="primary" @click="getResearches(query)">Buscar</v-btn>
          </v-col>
        </v-row>
      </v-card-title>

      <v-tabs v-model="tab" background-color="transparent" grow @change="onTabChange">
        <v-tab v-for="item in items" :key="item.id">
          <v-avatar class="mr-2">
            <img :src="item.logoPath" alt="Logo" />
          </v-avatar>
          <b>{{ item.name }}</b>
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item eager>
          <scopus :query="query" ref="scopus"></scopus>
        </v-tab-item>
        <v-tab-item eager>
          <scielo :query="query" ref="scielo"></scielo>
        </v-tab-item>
        <v-tab-item eager>
          <v-card flat>
            <ieee :query="query" ref="ieee"></ieee>
          </v-card>
        </v-tab-item>
        <v-tab-item eager>
          <renati :query="query" ref="renati"></renati>
        </v-tab-item>
        <v-tab-item eager>
          <ebsco :query="query" ref="ebsco"></ebsco>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
import Scopus from "@/components/Bibliography/Scopus.vue";
import Renati from "@/components/Bibliography/Renati.vue";
import Scielo from "@/components/Bibliography/Scielo.vue";
import Ieee from "@/components/Bibliography/IEEEExplore.vue";
import Ebsco from "@/components/Bibliography/EBSCO.vue";
export default {
  components: {
    Scopus,
    Renati,
    Scielo,
    Ieee,
    Ebsco
  },
  data() {
    return {
      tab: null,
      items: [
        { id: 1, name: "Scopus", logoPath: "/Assets/Images/scopus.png" },
        { id: 2, name: "Scielo", logoPath: "/Assets/Images/scielo.png" },
        { id: 3, name: "IEEE", logoPath: "/Assets/Images/ieee.png" },
        { id: 4, name: "Renati", logoPath: "/Assets/Images/sunedu2.png" },
        { id: 5, name: "EBSCO", logoPath: "/Assets/Images/ebsco.png" }
      ],
      query: "",
      researches: []
    };
  },
  methods: {
    getResearches() {
      this.$refs.scopus.getResearches();
      this.$refs.scielo ? this.$refs.scielo.getResearches() : null;
      this.$refs.renati ? this.$refs.renati.getResearches() : null;
      this.$refs.ieee ? this.$refs.ieee.getResearches() : null;
      this.$refs.ebsco ? this.$refs.ebsco.getResearches() : null;
    },
    onTabChange(i) {
      console.log("se cambio el tab: ", i);
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