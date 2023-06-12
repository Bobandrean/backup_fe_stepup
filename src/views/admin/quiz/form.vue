<template>
  <v-row>
    <v-col md="12" class="mt-5">
      <button class="text-button" @click="handleBack">
        <v-icon>mdi-chevron-left</v-icon> Quiz Management
      </button>
    </v-col>
  </v-row>

  <v-row class="ml-5" style="min-height: 100vh">
    <v-col md="12">
      asd
      <v-form v-model="valid" @submit.prevent="handleSubmit">
        <v-text-field
          variant="outlined"
          v-model="state.moduleName"
          label="Module Name"
        ></v-text-field>
        <v-text-field
          v-model="state.published_at"
          variant="outlined"
          label="Published at"
          type="date"
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
        <v-btn class="mt-5 mb-5 primary-button" @click="addQuestion">Add Question</v-btn>

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
              <v-checkbox
                v-model="choice.is_correct"
                label="Right Answer"
                @change="handleCheckboxChange(choice)"
              ></v-checkbox>
            </v-col>
          </v-row>

          <!-- Add Choice button -->
          <v-btn class="mt-5 mb-5 primary-button" @click="addQuestion" variant="tonal"
            >Add Question</v-btn
          >
        </div>

        <!-- Submit button -->
        <v-btn class="mt-5 save-button" type="submit">Save</v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'

import { ref, computed, onMounted, reactive, watchEffect, watch } from 'vue'
import { useQuizStore } from '@/stores/quiz'
import { useAuthStore } from '@/stores/auth'

const quizStore = useQuizStore()
const getQuiz = computed(() => quizStore.getQuiz())

const state = reactive({
  moduleName: '',
  start_date: '',
  end_date: '',
  per_page: '',
  published_at: '',
  questions: [
    {
      title: '',
      choices: [{ text: '', is_correct: 0 }]
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

const handleCheckboxChange = (choice) => {
  nextTick(() => {
    if (choice.is_correct) {
      choice.is_correct = 1
    } else {
      choice.is_correct = 0
    }
  })
}

const deleteQuestion = (questionIndex) => {
  state.questions.splice(questionIndex, 1)
}

const deleteChoice = (questionIndex, choiceIndex) => {
  state.questions[questionIndex].choices.splice(choiceIndex, 1)
}

const handleSubmit = () => {
  quizStore.createQuiz(state).then(() => {
    quizStore.fetchQuiz()

    const router = useRouter()
    router.push('/admin/quiz/manage')
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

const handleBack = () => {
  // perform logout logic

  // redirect to login page
  router.push('/admin/quiz/list')
}
</script>

<style scooped>
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