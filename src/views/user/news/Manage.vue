<template>
  <!-- Modal Create News -->
  <DialogCreateNews ref="refCreateNews"></DialogCreateNews>
  <!-- End Create news -->

  <!-- Modal Edit News -->
  <DialogEditNews ref="refEditNews"></DialogEditNews>
  <!-- End Edit news -->

  <v-row>
    <v-col cols="12">
      <v-btn class="text-button custom-button mt-2" @click="handleCreateNews">
        <v-icon>mdi-plus</v-icon>Create News
      </v-btn>
    </v-col>
    <v-col cols="12" sm="4">
      <v-text-field
        v-model="search.searchTitle"
        label="Search"
        variant="outlined"
        append-inner-icon="mdi-magnify"
      ></v-text-field>
    </v-col>
    <!-- <v-col cols="12" sm="4">
      <v-select
        v-model="search.orderBy"
        @update:model-value="handleSort()"
        :items="['newest', 'oldest', 'titled']"
        variant="outlined"
        label="Sort By"
      ></v-select>
    </v-col> -->
    <v-col cols="12" sm="4">
      <v-row align="center">
        <v-col cols="4" align="center"> Page </v-col>
        <v-col cols="4">
          <v-select
            item-value="label"
            item-title="label"
            :items="getTotalPages"
            @update:model-value="handlePage($event)"
            variant="outlined"
          ></v-select>
        </v-col>
        <v-col cols="4" align="center"> Of {{ getNews?.data?.last_page }} </v-col>
      </v-row>
    </v-col>
  </v-row>

  <v-row v-if="getNews">
    <v-col cols="12" v-for="news in getNews?.data?.data" :key="news.id">
      <v-card class="pa-3">
        <v-row>
          <v-col cols="6">
            <v-card-title class="news-title">{{ news?.title }}</v-card-title>
            <v-card-title>
              <b>Status : </b>
              <v-chip :color="news?.hidden_flag == 0 ? 'red' : 'green'">
                {{ news?.hidden_flag == 0 ? 'Hidden' : 'Visible' }}
              </v-chip>
            </v-card-title>
            <v-card-subtitle>
              <b>Created Date: {{ convertDate(news?.created_at) }}</b>
            </v-card-subtitle>
            <v-card-subtitle>
              <b>Last Update: {{ convertDate(news?.updated_at) }}</b>
            </v-card-subtitle>
          </v-col>
          <v-col cols="6" class="text-right my-2" align-self="center">
            <v-btn class="mb-2 mr-2 primary-button" @click="handlePreview(news?.id)" color="green"
              >Preview</v-btn
            >
            <v-btn
              v-if="news?.hidden_flag == 0"
              class="mb-2 mr-2 orange-button"
              disabled
              color="grey"
              >Send</v-btn
            >
            <v-btn v-else class="mb-2 mr-2 orange-button">Send</v-btn>
            <v-btn class="mb-2 mr-2 warning-button" @click="handleEditNews(news?.id)">Edit</v-btn>
            <v-btn
              v-if="news?.hidden_flag == 0"
              class="mb-2 mr-2"
              @click="handleShowNews(news?.id)"
              variant="tonal"
              color="green"
              >Show</v-btn
            >
            <v-btn v-else class="mb-2 mr-2 primary-button" @click="handleHideNews(news?.id)"
              >Hide</v-btn
            >
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { useRouter } from 'vue-router'

import { ref, onMounted, reactive, watchEffect, computed } from 'vue'
import { useNewsStore } from '@/stores/news'

import DialogCreateNews from '@/components/Dialog/News/CreateNews.vue'
import DialogEditNews from '@/components/Dialog/News/EditNews.vue'
import { convertDate } from '@/utils/date'

const newsStore = useNewsStore()

const search = reactive({
  searchTitle: '',
  orderBy: ''
})

const getNews = computed(() => {
  return newsStore.getNews
})

const getTotalPages = computed(() => {
  const array = []

  newsStore.getNews?.data?.links.forEach((element) => {
    array.push(element.label)
  })

  array.pop()
  array.shift()

  console.log(array)

  return array
})

watchEffect(() => {
  const query = {}
  if (search.searchTitle !== '') {
    query.searchTitle = search.searchTitle
  }
  if (search.searchorderBy !== '') {
    query.orderBy = search.orderBy
  }
  newsStore.fetchNews(query)
})

const handleSort = async () => {
  const payload = search.orderBy

  console.log(payload)
}

onMounted(() => {
  newsStore.fetchNews('')
})

const refCreateNews = ref('')
const handleCreateNews = () => {
  refCreateNews.value.$refs.refCreateNews.open()
}

const refEditNews = ref('')
const handleEditNews = (id) => {
  refEditNews.value.$refs.refEditNews.open()
  newsStore.fetchDetailNews(id)
}

const handleShowNews = (id) => {
  newsStore.hideNews(id).then(() => {
    newsStore.fetchNews('')
  })
}

const handleHideNews = (id) => {
  newsStore.showNews(id).then(() => {
    newsStore.fetchNews('')
  })
}

const router = useRouter()

const handlePreview = async (id) => {
  router.push(`/admin/news/preview/${id}`)
}

const handlePage = async (page) => {
  console.log(page)

  const payload = {
    page
  }

  newsStore.fetchNews(payload)
}
</script>

<style scoped>
.custom-button {
  background-color: #1ee54c; /* Dark blue background */
  color: #ffffff; /* White text */
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

.text-right {
  padding-right: 16px; /* Adjust the padding value as needed */
}

.my-2 {
  margin-top: 8px; /* Adjust the margin values as needed */
  margin-bottom: 8px;
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
.warning-button {
  background-color: yellow;
  color: black;
}

.warning-button:hover {
  background-color: darkkhaki;
}

/* Red button styles */
.red-button {
  background-color: red;
  color: white;
}

.red-button:hover {
  background-color: darkred;
}

/* Orange button styles */
.orange-button {
  background-color: orange;
  color: white;
}

.orange-button:hover {
  background-color: darkorange;
}
</style>
