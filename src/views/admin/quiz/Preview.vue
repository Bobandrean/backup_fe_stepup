<template>
  <v-row>
    <v-col md="6" align="center" class="mt-5">
      <button class="text-button" @click="handleBack">
        <v-icon>mdi-chevron-left</v-icon> Quiz History
      </button>
    </v-col>
  </v-row>
  <v-row>
    <v-col md="2"></v-col>
    <v-col md="8">
      <v-card class="mt-5" v-for="question in getDetailQuiz.question" :key="question.id">
        <v-card-item>
          <v-card-title>{{ question.title }}</v-card-title>
          <template v-for="choice in question.choice">
            <template v-if="choice.is_correct === '1'">
              <v-checkbox
                :key="choice.id"
                :label="choice.choice_text"
                :disabled="true"
                v-model="isChecked"
              ></v-checkbox>
            </template>
            <template v-else>
              <v-checkbox
                :key="choice.id"
                :label="choice.choice_text"
                :disabled="true"
              ></v-checkbox>
            </template>
          </template>
        </v-card-item>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import { useQuizStore } from '@/stores/quiz'
import { ref, computed, onMounted, reactive } from 'vue'

const route = useRoute()
const quizStore = useQuizStore()
const getDetailQuiz = computed(() => quizStore.getDetailQuiz)
onMounted(() => {
  quizStore.fetchDetailQuiz(route.params.id)
})

const router = useRouter()
const isChecked = ref(true) // Set it to `true` for checked, or `false` for unchecked

// Initialize selectedChoices for each question

const handleBack = () => {
  // perform logout logic

  // redirect to login page
  router.push('/admin/quiz/manage')
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
</style>