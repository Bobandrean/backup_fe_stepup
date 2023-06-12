<template>
    <BaseDialog ref="refEditNews">
      <section class="login pa-5 mt-5">
        <v-row class="mb-5" style= "height: 50px;">
            <h1 class="text-left">Edit News</h1>
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
                <v-textarea v-model="formValues.content" label="Content" required variant="outlined"></v-textarea>
                <v-textarea v-model="formValues.short_content" label=" Short Content" required variant="outlined"></v-textarea>
                <v-file-input
          v-model="formValues.image"
          @change="handleChangePhoto($event)"
          label="Foto"
        ></v-file-input>
                <v-row>
                    <v-col md="5" align-self="left">
                        <v-btn block color="success">
                            Add Attachment
                        </v-btn>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col md="6">

                    </v-col>
                    <v-col md="3">
                        <div class="d-flex justify-end mb-6">
                            <v-btn block color="success">
                                Cancel
                            </v-btn>
                        </div>
                    </v-col>
                    <v-col md="3">
                        <div class="d-flex justify-end mb-6">
                            <v-btn type="submit" block color="success">
                                Submit
                            </v-btn>
                        </div>
                    </v-col>
                </v-row>

        </v-form>
      </section>
    </BaseDialog>
  </template>

<script setup>
  import BaseDialog from "@/components/Base/Dialog.vue";
  import { reactive, ref, computed, watch } from "vue";
  import { useNewsStore } from "@/stores/news";

  const newsStore = useNewsStore();

  const formValues = reactive({
    title: "",
    slug: "",
    content: "",
    short_content: "",
    image: "",
  });

  const getDetailNews = computed(() => newsStore.getDetailNews );

  const id = ref("");

  watch(getDetailNews, (val) => {
  id.value = val.id;
  formValues.title = val.title;
  formValues.content = val.content;
});

  const refEditNews = ref("");

  const handleSubmit = () => {
    newsStore.updateNews(id.value, formValues).then(() => {
        newsStore.fetchNews();
        refEditNews.value.close();
    });
      
    };
  </script>