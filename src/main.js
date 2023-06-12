import {
  createApp
} from 'vue'
import {
  createPinia
} from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'



// add interceptor through side effects
// import './utils/axios'
// Vuetify
import 'vuetify/styles'
import '@/plugins/vuetify.js'
import {
  createVuetify
} from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')