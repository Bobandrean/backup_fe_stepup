<template>
  <div style="margin-top: 15px">
    <v-row>
      <button class="text-button" @click="handleBack">
        <v-icon>mdi-chevron-left</v-icon> Go Back
      </button>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-item>
            <v-card-title>
              {{ getDetailNews.title }}
            </v-card-title>
            <v-card-subtitle>
              Created Date : {{ convertDate(getDetailNews.created_at) }}
            </v-card-subtitle>

            <v-card-text>
              <div v-html="getDetailNews.content"></div>
            </v-card-text>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="getDetailNews.files">
      <v-col cols="10">
        <p>Attachments:</p>
        <v-select
          variant="solo"
          label="Select"
          v-model="selectedFile"
          item-title="filename"
          item-value="file_path"
          :items="getDetailNews.files"
        ></v-select>
      </v-col>
      <v-col cols="2">
        <div class="d-flex align-center">
          <v-btn @click="handleDownloadPdf" color="primary" class="mt-5" block>Download</v-btn>
        </div>
      </v-col>
    </v-row>

    <div class="d-flex justify-center mt-5">
      <iframe :src="selectedFile" width="800px" height="800px" frameborder="1"></iframe>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import { useNewsStore } from '@/stores/news'
import { ref, computed, onMounted } from 'vue'
import { VuePDF, usePDF } from '@tato30/vue-pdf'
import { convertDate } from '@/utils/date'

const route = useRoute()
const newsStore = useNewsStore()
const getDetailNews = computed(() => newsStore.getDetailNews)
const selectedFile = ref(null)

// const { pdf, pages } = usePDF(
//   'https://cse-bob.s3.ap-southeast-1.amazonaws.com/PLOTTING%20DOSBIM%20GENAP.pdf?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA3T42PSWVEYF5DIHI%2F20230615%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20230615T190124Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Signature=d93916dc47bc6e378c1c3e2ad52d1444048faa3afa30b0ad03be947874863b98'
// )

onMounted(() => {
  newsStore.fetchDetailNews(route.params.id)
})

// const page = ref(1)

// const handleNextPdf = () => {
//   if (page.value < pages.value) {
//     page.value++
//   }
// }

// const handlePrevPdf = () => {
//   if (page.value > 1) {
//     page.value--
//   }
// }

const handleDownloadPdf = () => {
  // Download PDF using href with link
  const linkSource = selectedFile.value
  const downloadLink = document.createElement('a')
  const fileName = 'test.pdf'

  downloadLink.href = linkSource
  downloadLink.download = fileName
  downloadLink.target = '_blank'
  downloadLink.click()
}

const router = useRouter()

const handleBack = () => {
  // perform logout logic
  // ...

  // redirect to login page
  router.back()
}
</script>

<style scooped>
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

.d-flex {
  display: flex;
}

.justify-center {
  justify-content: center;
}
</style>
