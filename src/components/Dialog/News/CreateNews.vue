<template>
  <BaseDialog ref="refCreateNews">
    <section class="login pa-5 mt-5">
      <v-row class="mb-5" style="height: 50px">
        <h1 class="text-left">Create News</h1>
      </v-row>
      <v-form v-model="valid" @submit.prevent="handleSubmit">
        <v-text-field
          v-model="formValues.title"
          label="Title"
          required
          variant="outlined"
        ></v-text-field>
        <v-text-field
          v-model="formValues.slug"
          label="Slug"
          required
          variant="outlined"
        ></v-text-field>
        <QuillEditor theme="snow" 
        @update:content = "handleContent($event)"
          v-model="formValues.content"
          placeholder="Content"
          required
          variant="outlined"
          />
          <br>
          <v-textarea
          v-model="formValues.short_content"
          placeholder="Short Content"
          required
          variant="outlined"> 
        </v-textarea>
        <v-file-input class="mt-5"
          v-model="formValues.image"
          @change="handleChangePhoto($event)"
          label="Foto"
        ></v-file-input>
        <v-row>
          <v-col md="5" align-self="left">
            <v-btn block color="success">Add Attachment</v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col md="6"></v-col>
          <v-col md="3">
            <div class="d-flex justify-end mb-6">
              <v-btn block color="success">Cancel</v-btn>
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
import { reactive, ref } from '@vue/reactivity'
import { useNewsStore } from '@/stores/news'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const newsStore = useNewsStore()

const formValues = reactive({
  title: '',
  slug: '',
  content: '',
  short_content: '',
  image: ''
})

const refCreateNews = ref('')

const handleSubmit = () => {
  console.log(formValues)
  newsStore.createNews(formValues).then(() => {
    newsStore.fetchNews()
    refCreateNews.value.close()
  })
}

const handleContent = (val) => {
  formValues.content = val.ops[0].insert;
}
</script>