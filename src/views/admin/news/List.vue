<template>
  <v-row class="mt-5">
    <v-col md="4" class="ml-5">
      <v-text-field
        label="Search"
        variant="outlined"
        append-inner-icon="mdi-magnify"
      ></v-text-field>
    </v-col>
    <v-col md="4">
      <v-row>
        <v-col md="2" no-gutters align="center" class="mt-4"> Sort By : </v-col>
        <v-col md="10" no-gutters align="center">
          <v-select :items="['Newest', 'Oldest', 'Titled']" variant="outlined"></v-select>
        </v-col>
      </v-row>
    </v-col>
  </v-row>

  <v-row>
    <v-col
      cols="12"
      sm="6"
      md="4"
      align="center"
      v-for="news in getNews?.data?.data"
      :key="news.id"
    >
      <v-card>
        <v-card>
          <v-card-title class="v-card--title justify-center">
            {{ news?.title }}
          </v-card-title>

          <v-card-text class="v-card--title justify-center">
            <div style="max-height: 250px" v-html="news?.content"></div>
          </v-card-text>
        </v-card>
        <v-btn @click="handlePreview(news?.id)" outlined class="mb-5 mt-5 primary-button"
          >More Details</v-btn
        >
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { useRouter } from 'vue-router'

import { ref, computed, onMounted } from 'vue'
import { useNewsStore } from '@/stores/news'
import { useAuthStore } from '@/stores/auth'

const newsStore = useNewsStore()
const getNews = computed(() => newsStore.getNews)

onMounted(() => {
  newsStore.fetchNews('')
})

const authStore = useAuthStore()
const getUsers = computed(() => authStore.getUsers)
onMounted(() => {
  authStore.fetchUsers()
})

const router = useRouter()

const handlePreview = async (id) => {
  router.push(`/admin/news/preview/${id}`)
}
</script>

<style scoped>
.text-button {
  margin-top: 10px;
  margin-left: 15px;
  height: 36px;
  min-width: 64px;
  padding: 0 16px;
  background-color: #005eb8 !important;
  border-color: #005eb8 !important;
  color: #fff;
}

.card-news {
  display: block;
  max-width: 100%;
  outline: none;
  text-decoration: none;
  transition-property: box-shadow, opacity;
  overflow-wrap: break-word;
  position: relative;
  white-space: normal;
  transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: box-shadow;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.news-title {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: 0.0125em;
  line-height: 2rem;
  word-break: break-all;
}

.news-subtitle {
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.375rem;
  letter-spacing: 0.0071428571em;
}

.button-news {
  align-items: center;
  color: inherit;
  display: flex;
  flex: 1 0 auto;
  justify-content: inherit;
  line-height: normal;
  position: relative;
}

.v-card {
  border-radius: 4px;
  display: block;
  max-width: 100%;
  outline: none;
  text-decoration: none;
  transition-property: box-shadow, opacity;
  overflow-wrap: break-word;
  position: relative;
  white-space: normal;
  transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: box-shadow;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.v-card--title {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: 0.0125em;
  line-height: 2rem;
  word-break: break-all;
}

.detail-button {
  height: 28px;
  min-width: 50px;
  border: thin solid;
  padding: 0 12.4444444444px;
  align-items: center;
  color: inherit;
  display: flex;
  flex: 1 0 auto;
  justify-content: inherit;
  line-height: normal;
  position: relative;
}
.primary-button {
  background-color: #005eb8;
  color: white;
}

.primary-button:hover {
  background-color: #005eb8;
}

.save-button {
  background-color: green;
  color: white;
}

.save-button:hover {
  background-color: darkgreen;
}
</style>
