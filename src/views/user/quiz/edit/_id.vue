<template>
  <v-row>
    <v-col md="12" class="mt-5">
      <button class="text-button" @click="handleBack">
        <v-icon>mdi-chevron-left</v-icon> Quiz Management
      </button>
    </v-col>
  </v-row>

  <v-row class="ml-5">
    <v-col md="12">
      <v-form v-model="valid" @submit.prevent="handleSubmit">
        <v-text-field
          variant="outlined"
          v-model="state.moduleName"
          label="Module Name"
        ></v-text-field>
        <v-row>
          <v-col md="4">
            <v-text-field
              v-model="state.start_date"
              variant="outlined"
              label="Period Start"
              type="date"
            ></v-text-field>
          </v-col>
          <v-col md="4">
            <v-text-field
              v-model="state.end_date"
              variant="outlined"
              label="Period End"
              type="date"
            ></v-text-field>
          </v-col>
          <v-col md="4">
            <v-text-field
              v-model="state.per_page"
              variant="outlined"
              label="Questions Per Page"
              type="number"
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- Form fields -->
        <v-divider></v-divider>
        <!-- Add Question button -->
        <v-btn class="mt-5 mb-5" @click="addQuestion">Add Question</v-btn>
        <!-- Questions -->
        <div v-for="(question, questionIndex) in state.questions" :key="questionIndex">
          <v-text-field
            variant="outlined"
            v-model="question.title"
            :label="'Question ' + (questionIndex + 1) + ' Title'"
          ></v-text-field>

          <!-- Choices -->
          <span>Choice :</span>
          <v-row v-for="(choice, choiceIndex) in question.choices" :key="choiceIndex">
            <v-col md="10">
              <v-text-field
                @click:append-inner="deleteChoice(questionIndex, choiceIndex)"
                variant="outlined"
                v-model="choice.text"
                append-inner-icon="mdi-delete"
              ></v-text-field>
            </v-col>
            <v-col md="2">
              <v-checkbox v-model="choice.is_correct" label="Right Answer"></v-checkbox>
            </v-col>
          </v-row>

          <!-- Add Choice button -->
          <v-btn class="mb-4" @click="addChoice(questionIndex)">Add Choice</v-btn>
        </div>

        <!-- Submit button -->
        <v-btn class="mt-5" type="submit">Save</v-btn>
      </v-form>
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

const state = reactive({
  moduleName: '',
  start_date: '',
  end_date: '',
  per_page: '',
  questions: [
    {
      title: '',
      choices: [{ text: '', is_correct: false }]
    }
  ]
})

const addQuestion = () => {
  state.questions.push({
    title: '',
    choices: [{ choice_text: '', is_correct: false }]
  })
}

const addChoice = (questionIndex) => {
  state.questions[questionIndex].choices.push({
    choice_text: '',
    is_correct: false
  })
}

const deleteQuestion = (questionIndex) => {
  state.questions.splice(questionIndex, 1)
}

const deleteChoice = (questionIndex, choiceIndex) => {
  state.questions[questionIndex].choices.splice(choiceIndex, 1)
}

const handleSubmit = () => {
  console.log(state)
  quizStore.createQuiz(state).then(() => {
    quizStore.fetchQuiz()
    window.history.back()
  })
}

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

onMounted(() => {
  quizStore.fetchQuiz('')
})

const authStore = useAuthStore()
const getUsers = computed(() => authStore.getUsers)
onMounted(() => {
  authStore.fetchUsers()
})
</script>

<style>
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

.divider-with-text {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.divider-text {
  background-color: #fff;
  padding: 0 10px;
  position: relative;
  z-index: 1;
}
</style>
