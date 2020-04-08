<template>
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
            <a :href="'https://sci-hub.tw/'+research.link" target="_blank">Ver</a>
          </td>
          <td>
            <a :href="research.link" target="_blank">{{ research.link }}</a>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>