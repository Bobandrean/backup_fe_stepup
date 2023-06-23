<template>
  <BaseDialog ref="refEditNews">
    <section class="login pa-5 mt-5">
      <v-row class="mb-5" style="height: 50px">
        <h1 class="text-left">Edit News</h1>
      </v-row>
      <v-form v-model="valid" @submit.prevent="handleSubmit">
        <v-text-field
          v-model="formValues.title"
          label="Title"
          required
          variant="outlined"
        ></v-text-field>
        <QuillEditor
          style="height: 300px"
          theme="snow"
          @update:content="handleContent($event)"
          v-model="formValues.content"
          v-model:content="formValues.content"
          placeholder="Content"
          required
          :modules="modules"
          toolbar="full"
          variant="outlined"
          contentType="html"
        />

        <v-row class="mt-3">
          <v-col md="5" align-self="left">
            <v-btn @click="handleAddAttachment" block color="success"> Add Attachment </v-btn>
          </v-col>
        </v-row>

        <div v-for="(file, index) in formValues.files" :key="file">
          <v-row class="pa-3">
            <v-col md="10" align-self="center">
              <p v-if="file.filename">{{ file.filename }}</p>
              <p v-if="file.name">{{ file.name }}</p>
            </v-col>
            <v-col md="2" align-self="center">
              <v-btn @click="handleDeleteFile(index)" block color="error">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </div>

        <v-row>
          <v-col md="6"> </v-col>
          <v-col md="3">
            <div class="d-flex justify-end mb-6">
              <v-btn block color="success"> Cancel </v-btn>
            </div>
          </v-col>
          <v-col md="3">
            <div class="d-flex justify-end mb-6">
              <v-btn type="submit" block color="success"> Submit </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </section>
  </BaseDialog>
</template>

<script setup>
import BaseDialog from '@/components/Base/Dialog.vue'
import { reactive, ref, computed, watch } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useNewsStore } from '@/stores/news'

const newsStore = useNewsStore()

const formValues = reactive({
  title: '',
  slug: '',
  content: '',
  short_content: '',
  files: [],
  image: null
})

const getDetailNews = computed(() => newsStore.getDetailNews)

const id = ref('')
const previewImage = ref('')

watch(getDetailNews, (val) => {
  id.value = val.id
  formValues.title = val.title
  formValues.content = val.content

  formValues.files = val.files
})

const refEditNews = ref('')

const handleAddAttachment = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.onchange = (e) => {
    formValues.files.push(e.target.files[0])
  }
  input.click()
}

const handleSubmit = () => {
  newsStore.updateNews(id.value, formValues).then(() => {
    newsStore.fetchNews('')
    refEditNews.value.close()
  })
}

const handleContent = (val) => {
  formValues.content = val
}

const handleDeleteFile = (index) => {
  formValues.files.splice(index, 1)
  fileCounter.value--
}
</script>
