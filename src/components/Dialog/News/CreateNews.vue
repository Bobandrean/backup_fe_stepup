<template>
  <BaseDialog ref="refCreateNews">
    <section class="login pa-5 mt-5">
      <v-row class="mb-5 px-3">
        <h1 class="text-left">Create News</h1>
      </v-row>
      <v-form v-model="valid" @submit.prevent="handleSubmit">
        <v-text-field
          v-model="formValues.title"
          label="Title"
          :rules="[rules.required]"
          required
          variant="outlined"
        ></v-text-field>
        <!-- <v-text-field
          v-model="formValues.slug"
          :rules="[rules.required]"
          label="Slug"
          required
          variant="outlined"
        ></v-text-field> -->
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

        <br />
        <!-- <v-textarea
          v-model="formValues.short_content"
          placeholder="Short Content"
          :rules="[rules.required]"
          required
          variant="outlined"
        > -->
        <!-- </v-textarea> -->

        <!-- <v-file-input
          class="mt-5"
          v-model="formValues.image"
          :rules="[rules.required]"
          @change="handleChangePhoto($event)"
          label="Foto"
        ></v-file-input> -->

        <v-row>
          <v-col md="5" align-self="left">
            <v-btn @click="handleAddAttachment" block color="success">Add Attachment</v-btn>
          </v-col>
        </v-row>

        <div v-for="(file, index) in formValues.files" :key="file">
          <v-row class="pa-3">
            <v-col md="10" align-self="center">
              <p>{{ file.name }}</p>
            </v-col>
            <v-col md="2" align-self="center">
              <v-btn @click="handleDeleteFile(index)" block color="error">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </div>

        <v-row class="mt-3">
          <v-col md="6"></v-col>
          <v-col md="3">
            <div class="d-flex justify-end mb-6">
              <v-btn block color="error">Cancel</v-btn>
            </div>
          </v-col>
          <v-col md="3">
            <div class="d-flex justify-end mb-6">
              <v-btn type="submit" block color="success">Submit</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </section>
  </BaseDialog>
</template>

<script setup>
import BaseDialog from '@/components/Base/Dialog.vue'
import { reactive, ref } from 'vue'
import { useNewsStore } from '@/stores/news'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import ImageUploader from 'quill-image-uploader'

import { required, minLength } from '@vuelidate/validators'

const newsStore = useNewsStore()

const formValues = reactive({
  title: '',
  slug: '',
  content: '',
  short_content: '',
  image: '',
  files: []
})

const fileCounter = ref(0)

// const initialValue = ref(
//   '<h2>test</h2><img src="https://cse-bob.s3.ap-southeast-1.amazonaws.com/976604-appliances-cell-phone-cellphone-mobile-mobilephone-phone-smartphone_106569.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA3T42PSWVEYF5DIHI%2F20230616%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20230616T184714Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Signature=d4b41c5f146f80cf23d3bc0a70ce0f6dc3f500c0e7b6212deb7d7d8d59eb8230" alt="Google Logo">'
// )

const modules = {
  name: 'imageUploader',
  module: ImageUploader,
  options: {
    upload: (file) => {
      formValues.image = file
    }
  }
}

// Validation
const rules = {
  title: { required, minLength: minLength(3) },
  slug: { required },
  content: { required },
  short_content: { required }
}

const refCreateNews = ref('')

const handleSubmit = () => {
  newsStore.createNews(formValues).then(() => {
    newsStore.fetchNews('')
    refCreateNews.value.close()
  })
}

const handleContent = (val) => {
  formValues.content = val
}

const handleAddAttachment = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.onchange = (e) => {
    formValues.files.push(e.target.files[0])
  }
  input.click()
}

const handleDeleteFile = (index) => {
  formValues.files.splice(index, 1)
  fileCounter.value--
}
</script>
