<template>
      <v-card >
      <v-list>
        <a href="/admin" class="v-list-item ">
          <div class="v-list-item-icon" style="margin-right: 32px">
            <v-icon class="icon-home">mdi-home</v-icon>
          </div>

          <v-list-item-title class="text-home">Home</v-list-item-title>
        </a>
      </v-list>
      <v-list v-model:opened="open">
        <v-list-group value="News">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-newspaper"
              title="News Menu"
            ></v-list-item>
          </template>
          <v-list-item>
            <a href="/admin/news/list" class="v-list-items">
              <div>
                <v-icon>mdi-newspaper</v-icon>
              </div>
              <v-list-item-title>News List</v-list-item-title>
            </a>
          </v-list-item>

          <v-list-item>
            <a href="/admin/news/manage" class="v-list-items">
              <div class="v-list-item-icon">
                <v-icon class="icon-home">mdi-newspaper</v-icon>
              </div>
              <v-list-item-title class="text-home">News Manage</v-list-item-title>
            </a>
          </v-list-item>
        </v-list-group>
      </v-list>
      <v-list v-model:opened="open">
        <v-list-group value="Quiz">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-format-list-checks"
              title="Quiz Menu"
            ></v-list-item>
          </template>
          <v-list-item>
            <a href="/admin/quiz/manage" class="v-list-items">
              <div class="v-list-item-icon">
                <v-icon class="icon-home">mdi-format-list-checks</v-icon>
              </div>
              <v-list-item-title class="text-home">Quiz Management</v-list-item-title>
            </a>
          </v-list-item>

          <v-list-item>
            <a href="/admin/quiz/list" class="v-list-items">
              <div class="v-list-item-icon">
                <v-icon class="icon-home">mdi-history</v-icon>
              </div>
              <v-list-item-title class="text-home">Quiz History</v-list-item-title>
            </a>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-card>
    <v-app-bar>
      <v-app-bar-nav-icon @click="state.drawer = !state.drawer"></v-app-bar-nav-icon>

      <v-toolbar-title style="color: white">Step-Up</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon @click="handleLogOut">
        <v-icon>mdi-power</v-icon>
      </v-btn>
    </v-app-bar>
  </template>
  <script>
  export default {
    data() {
      return {}
    },
    computed: {
      items() {
        return this.$store.state.sidebar.items
      },
    },
  }
  </script>
  <style lang="scss" scoped>
  .v-card {
    border-radius: 0px 20px 20px 0 !important;
  }
  </style>