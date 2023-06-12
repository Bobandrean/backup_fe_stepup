<template>
  <v-row >
    <v-col md="12">
      <button @click="handleCreate()" class="text-button">
        <v-icon>mdi-plus</v-icon>Create Quiz
      </button>
    </v-col>
    <v-col md="4">
      <v-text-field
        v-model="search.searchTitle"
        label="Search"
        variant="outlined"
        append-inner-icon="mdi-magnify"
      ></v-text-field>
    </v-col>
    <v-col md="4">
      <v-row>
        <v-col md="2" no-gutters align="center" class="mt-4"> Sort By : </v-col>
        <v-col md="10" no-gutters align="center">
          <v-select
            v-model="search.orderBy"
            @update:model-value="handleSort()"
            :items="['newest', 'oldest', 'titled']"
            variant="outlined"
          ></v-select>
        </v-col>
      </v-row>
    </v-col>
    <v-col md="4">
      <v-row>
        <v-col md="1" align="center" class="mt-4"> Page </v-col>
        <v-col md="9">
          <v-select :items="['1']" variant="outlined"></v-select>
        </v-col>
        <v-col md="2" align="center" class="mt-4"> Of 1 </v-col>
      </v-row>
    </v-col>
  </v-row>

  <v-row style="min-height: 100vh;">
    <v-col md="12">
      <v-card class="card-news mt-2 mb-2" v-for="quiz in getQuiz" :key="quiz.id">
        <v-row>
          <v-col md="5">
            <v-card-title class="news-title">
              {{ quiz?.module_name }}
            </v-card-title>
            <v-card-subtitle class="news-subtitle">
              Period: {{ quiz?.start_date }} - {{ quiz?.end_date }}
            </v-card-subtitle>
            <v-card-subtitle class="news-subtitle mt-1 mb-2">
              Created Date : {{ quiz?.created_at }}
            </v-card-subtitle>
          </v-col>
          <v-col md="7">
            <div class="px-4 text-right mt-5">
              <button
                class="text-button"
                @click="handlePreview(quiz?.id)"
                style="background-color: #cddc39 !important; border-color: #cddc39 !important"
              >
                Preview
              </button>
              <button
                class="text-button"
                style="background-color: #2196f3 !important; border-color: #2196f3 !important"
              >
                Report
              </button>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>
  
  <script setup>
import { useRouter, useRoute } from 'vue-router'

import { ref, computed, onMounted, reactive, watchEffect } from 'vue'
import { useQuizStore } from '@/stores/quiz'
import { useAuthStore } from '@/stores/auth'
const quizStore = useQuizStore()
const getQuiz = computed(() => quizStore.getQuiz())
const route = useRoute()
const router = useRouter()

const search = reactive({
  searchTitle: '',
  orderBy: ''
})

watchEffect(() => {
  const query = {}
  if (search.searchTitle !== '') {
    query.searchTitle = search.searchTitle
  }
  if (search.searchorderBy !== '') {
    query.orderBy = search.orderBy
  }
  quizStore.fetchQuiz(query)
})

const handleSort = async () => {
  const payload = search.orderBy

  console.log(payload)
}

onMounted(() => {
  quizStore.fetchQuiz('')
})

const authStore = useAuthStore()
const getUsers = computed(() => authStore.getUsers)
onMounted(() => {
  authStore.fetchUsers()
})

const handleCreate = async () => {
  router.push(`/admin/quiz/form`)
}

const handlePreview = async (id) => {
  router.push(`/admin/quiz/preview/${id}`)
}
</script>
  
  <style scoped>
.text-button {
  margin-top: 10px;
  margin-left: 15px;
  height: 36px;
  min-width: 64px;
  padding: 0 16px;
  background-color: #002469 !important;
  border-color: #002469 !important;
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
</style>