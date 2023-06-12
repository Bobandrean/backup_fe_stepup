<template>
  <div>
    <h1 class="separator">
      <span class="separator-line"></span>
      <span class="separator-text">News</span>
      <span class="separator-line"></span>
    </h1>
  </div>

  <div>
    <v-row>
      <v-col cols="12" sm="6" md="4" v-for="news in getDashboardNews?.data" :key="news.id">
        <v-card class="mx-auto" max-width="344">
          <v-img :src="news?.image" height="200px" cover></v-img>

          <v-card-title align="center"> {{ news.title }} </v-card-title>

          <v-card-subtitle> {{ news?.slug }} </v-card-subtitle>

          <v-card-actions>
            <v-btn @click="handlePreview(news?.id)" outlined class="mb-5 mt-5 detail-button"
              >More Details</v-btn
            >

            <v-spacer></v-spacer>

            <v-btn
              :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
              @click="show = !show"
            ></v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>

              <v-card-text> {{ news?.short_content }} </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
  </div>

  <div>
    <h1 class="separator">
      <span class="separator-line"></span>
      <span class="separator-text">Quiz</span>
      <span class="separator-line"></span>
    </h1>
  </div>

  <div>
    <v-row>
      <v-col cols="12" sm="6" md="4" v-for="quiz in getDashboardQuiz" :key="quiz.id">
        <v-card class="mx-auto" max-width="344">
          <div class="d-flex align-center justify-center">
            <v-card-title> {{ quiz.module_name.toUpperCase() }} </v-card-title>
          </div>
          <div class="d-flex align-center justify-center">
            <v-card-subtitle
              ><b>Periode : {{ quiz.start_date }} - {{ quiz.end_date }}</b>
            </v-card-subtitle>
          </div>
          <v-card-actions class="d-flex justify-center">
            <v-btn color="primary" variant="tonal" @click="handleAnswer(quiz.id)">Take Test</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'

import { ref, computed, onMounted, reactive, watchEffect } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'

const dashboardStore = useDashboardStore()
const route = useRoute()
const router = useRouter()

const getDashboardNews = computed(() => dashboardStore.getDashboardNews())
onMounted(() => {
  dashboardStore.fetchDashboardNews()
})

const getDashboardQuiz = computed(() => dashboardStore.getDashboardQuiz())
onMounted(() => {
  dashboardStore.fetchDashboardQuiz()
})

const handlePreview = async (id) => {
  router.push(`/admin/news/preview/${id}`)
}

const handleAnswer = async (id) => {
  router.push(`/admin/quiz/answer/${id}`)
}

const show = ref(false)
</script>

<style scooped>
.separator {
  display: flex;
  align-items: center;
  justify-content: center;
}

.separator-line {
  flex-grow: 1;
  height: 1px;
  background-color: #000; /* Replace with your desired separator color */
}

.separator-text {
  margin: 0 10px;
  font-weight: medium;
}
</style>
