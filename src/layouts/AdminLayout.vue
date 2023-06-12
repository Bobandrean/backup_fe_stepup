<template>
  <v-layout>
    <v-navigation-drawer color="#002469" v-model="drawer" location="left"
        temporary>
        <v-list nav v-model:opened="open">
          <v-list-item prepend-icon="mdi-home" style="cursor: pointer;" @click="goToHome()"><span class="text-item">Home</span></v-list-item>
          <v-list-group prepend-icon="mdi-newspaper" value="News Menu">
            <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-newspaper"
            title="News Menu"
          ></v-list-item>
        </template>
        <v-list-item prepend-icon="mdi-newspaper" title="News List" style="cursor: pointer;" @click="goToNewsList"></v-list-item>
        <v-list-item prepend-icon="mdi-newspaper" title="News Management" style="cursor: pointer;" @click="goToNewsManage"></v-list-item>
          </v-list-group>
          <v-list-group prepend-icon="mdi-newspaper" value="Quiz Menu">
            <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-format-list-checks"
            title="Quiz Menu"
          ></v-list-item>
        </template>
        <v-list-item prepend-icon="mdi-history" title="Quiz History" style="cursor: pointer;" @click="goToQuizHistory"></v-list-item>
        <v-list-item prepend-icon="mdi-format-list-checks" title="Quiz Management" style="cursor: pointer;" @click="goToQuizManage"></v-list-item>
          </v-list-group>
          
        </v-list>
      </v-navigation-drawer>


    <v-app-bar color="#002469" elevation="0" prominent style="z-index: 1;">
      <template v-slot:prepend>
          <v-app-bar-nav-icon v-model="state.order" style="color:white" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title style="color:white">
          <span>Step-Up</span>
          <h5 v-if="router.currentRoute.value.name == 'admin-home' ">Admin</h5>
          <h5 v-if="router.currentRoute.value.name == 'news-manage' ">News Management</h5>
          <h5 v-if="router.currentRoute.value.name == 'news-list' ">News List</h5>
          <h5 v-if="router.currentRoute.value.name == 'news-preview' ">Preview News</h5>
          <h5 v-if="router.currentRoute.value.name == 'quiz-list' ">Quiz History</h5>
          <h5 v-if="router.currentRoute.value.name == 'user-home' ">User</h5>
          <h5 v-if="router.currentRoute.value.name == 'quiz-manage' ">Quiz Management</h5>
          <h5 v-if="router.currentRoute.value.name == 'quiz-form' ">Create Quiz</h5>
          <h5 v-if="router.currentRoute.value.name == 'quiz-preview' ">Preview Quiz</h5>
        </v-app-bar-title>

        <template v-slot:append>
          <v-btn style="color:white" icon="mdi-power" @click="handleLogOut"></v-btn>
        </template>
    </v-app-bar>

    <v-main>
      <RouterView />
    </v-main>
  </v-layout>
</template>
<script>
export default {
  data: () => ({
    drawer: false,
    open: ['News'],
    admins: [
      ['News List', 'mdi-newspaper'],
      ['News Management', 'mdi-newspaper']
    ]
  })
}
</script>

<script setup>
import { useRouter } from 'vue-router'
import { reactive } from 'vue'
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const router = useRouter()
const state = reactive({
  order: false
})

const goToHome = () => {
  console.log("test");
  router.push('/admin')
}

const goToNewsList = () => {
  console.log("test");
  router.push('/admin/news/list')
}

const goToNewsManage = () => {
  console.log("test");
  router.push('/admin/news/manage')
}

const goToQuizHistory = () => {
  console.log("test");
  router.push('/admin/quiz/list')
}

const goToQuizManage = () => {
  console.log("test");
  router.push('/admin/quiz/manage')
}
const handleLogOut = async () => {
  await authStore.logout();
  router.push('/login')
}
</script>

<style scoped>
#inspire .v-app-bar {
  background-color: #002469;
}

#inspire .v-app-bar .v-navigation-drawer__content {
  color: #002469;
}

.v-navigation-drawer__content{
  color: #002469;
}

#inspire .v-btn {
  color: white;
}

.sidebar-card{
  height: 100vh;
    top: 0px;
    transform: translateX(0%);
    width: 256px;
    box-shadow: 0 8px 10px -5px rgba(0,0,0,.2), 0 16px 24px 2px rgba(0,0,0,.14), 0 6px 30px 5px rgba(0,0,0,.12);
}

.v-list-items {
  align-items: center;
  display: flex;
  flex: 1 1 100%;
  letter-spacing: normal;
  min-height: 48px;
  outline: none;
  padding-right: 45px!important;
  position: relative;
  text-decoration: none;
  color: white;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.v-list-item{
  color:white;
  align-self: center;
    font-size: 16px;
}

.text-item{
  color:white;
  align-self: center;
    font-size: 1rem;
    white-space: nowrap;
}

.icon-home {
  align-items: center;
  display: inline-flex;
  font-feature-settings: 'liga';
  font-size: 24px;
  justify-content: center;
  letter-spacing: normal;
  line-height: 1;
  position: relative;
  text-indent: 0;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), visibility 0s;
  vertical-align: middle;
}

.text-home {
  line-height: 1, 2;
  align-self: center;
  flex: 1 1 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.v-list {
  overflow: auto;
  padding: 0px 0;
  position: relative;
  border-color: rgba(var(--v-border-color), var(--v-border-opacity));
  border-style: solid;
  border-width: 0;
  box-shadow: 0px 0px 0px 0px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)),
    0px 0px 0px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)),
    0px 0px 0px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12));
  border-radius: 0;
  background: rgba(var(--v-theme-surface));
  color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity));
}
</style>