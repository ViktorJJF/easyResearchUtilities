<template>
  <v-app id="keep">
    <v-app-bar dense app clipped-left color="primary" elevation="0">
      <v-avatar>
        <img src="/Assets/Images/tesisParaInteligentesSinFondo.png" alt="logo" />
      </v-avatar>
      <span class="title ml-3 mr-5">
        <v-btn color="white" text to="/">Investigación para inteligentes</v-btn>
      </span>

      <router-link :to="{name:'bibliography'}" class="white--text links">Fuentes de información</router-link>
      <router-link to="/" class="white--text links">Hola</router-link>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-content class="mb-5">
      <router-view></router-view>
    </v-content>
    <v-footer dark padless fixed>
      <v-card class="flex" flat tile>
        <v-card-text class="py-2 white--text text-center">
          {{ new Date().getFullYear() }} —
          <strong>Jimenez Company ©</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    items: [
      { icon: "lightbulb_outline", text: "Notas bruses", to: "brusesNotes" },
      { icon: "touch_app", text: "Notas bruses 2", to: "brusesNotes2" },
      { divider: true },
      { heading: "Labels", to: "" },
      { icon: "add", text: "Create new label", to: "" },
      { divider: true },
      { icon: "archive", text: "Archive", to: "" },
      { icon: "delete", text: "Trash", to: "" },
      { divider: true },
      { icon: "settings", text: "Settings", to: "" },
      { icon: "chat_bubble", text: "Trash", to: "" },
      { icon: "help", text: "Help", to: "" },
      { icon: "phonelink", text: "App downloads", to: "" },
      { icon: "keyboard", text: "Keyboard shortcuts", to: "" }
    ]
  })
};
</script>

<style>
#keep .v-navigation-drawer__border {
  display: none;
}
</style>