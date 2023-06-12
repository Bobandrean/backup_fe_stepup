<template >
  <v-row style="min-height: 100vh" class="mt-5">
    <v-col md="6" align="center" v-for="quiz in getQuiz" :key="quiz.id">
      <v-card>
        <v-card-title class="v-card--title justify-center">
          {{ quiz?.module_name }}
        </v-card-title>
        <v-card-text class="justify-center">
          Period : {{ quiz?.start_date }} - {{ quiz?.end_date }}
        </v-card-text>
        <v-btn @click="handlePreview(quiz?.id)" outlined class="mb-5 mt-5 primary-button"
          >See Answer</v-btn
        >
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

const handlePreview = async (id) => {
  router.push(`/admin/quiz/preview/${id}`)
}
</script>

<style scooped>
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
  background-color: #795548 !important;
  border-color: #795548 !important;
  color: #fff !important;
  caret-color: #fff !important;
}

.primary-button {
  background-color: #002469;
  color: white;
}

.primary-button:hover {
  background-color: #002469;
}

.save-button {
  background-color: green;
  color: white;
}

.save-button:hover {
  background-color: darkgreen;
}
</style>