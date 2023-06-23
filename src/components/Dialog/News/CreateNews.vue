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
          theme="snow"
          @update:content="handleContent($event)"
          v-model="formValues.content"
          placeholder="Content"
          required
          variant="outlined"
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
        <v-file-input
          class="mt-5"
          v-model="formValues.image"
          :rules="[rules.required]"
          @change="handleChangePhoto($event)"
          label="Foto"
        ></v-file-input>

        <v-row>
          <v-col md="5" align-self="left">
            <v-btn @click="handleAddAttachment" block color="success">Add Attachment</v-btn>
          </v-col>
        </v-row>

        <!-- <div v-for="(file, index) in formValues.files" :key="file">
          <v-file-input
            class="mt-5"
            :value="formValues.files[index]"
            @change="handleChangeFile($event, index)"
            :label="`File ${index + 1}`"
          ></v-file-input>
        </div> -->

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
import { reactive, ref, toRefs, computed } from 'vue'
import { useNewsStore } from '@/stores/news'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useVuelidate } from '@vuelidate/core'
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

// Validation
const rules = computed(() => {
  return {
  title: { required, minLength: minLength(3) },
  slug: { required },
  content: { required },
  short_content: { required }
  };
});

const v$ = useVuelidate(rules, formValues);
v$.value.$validate();
const { title, slug, content, short_content } = toRefs(v$);

const handleSubmit = () => {
  v$.value.$validate();
  if (v$.value.$error) {
    console.log("error")
        alert(
       "I'm sorry, you seem to not have filled all inputs. Please fill them up and try again."
     );
    // Form is invalid
    // You can display an error message or perform appropriate actions
  }

  console.log(formValues);
  newsStore.createNews(formValues).then(() => {
    newsStore.fetchNews('');
    refCreateNews.value.close();
  });
};

const refCreateNews = ref('')

const handleContent = (val) => {
  formValues.content = val.ops[0].insert
}

const handleAddAttachment = () => {
  formValues.files.push('')
}

const handleChangeFile = (event, index) => {
  formValues.files[index] = event.target.files[0]
}
</script>