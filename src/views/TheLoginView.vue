<template>
<<<<<<< HEAD
  <v-container class="main-container">
    <v-container class="login-container">
      <v-card class="login-card">
        <v-card-title class="text-center roboto-font white--text">Welcome to Step-up</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="handleLogin">
            <span style="color:red" v-if="v$.email.$error">
        {{ v$.email.$errors[0].$message }}
      </span>
            <v-text-field
              v-model="form.email"
              label="Email"
              required
              variant="solo-filled"
            ></v-text-field>
            <span style="color:red" v-if="v$.password.$error">
        {{ v$.password.$errors[0].$message }}
      </span>
            <v-text-field
              v-model="form.password"
              label="Password"
              type="password"
              required
              variant="solo-filled"
            ></v-text-field>

            <v-btn type="submit" class="custom-button" block>Login</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
=======
  <v-container class="login-container">
    <v-card class="login-card">
      <v-card-title class="text-center roboto-font">Welcome to Step-up</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleLogin">
          <v-text-field
            v-model="form.email"
            label="Email"
            required
            variant="solo-filled"
          ></v-text-field>

          <v-btn type="submit" class="custom-button" block>Login</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
>>>>>>> 4d54377585ad8d36b80edde5ccb0d7c75838d9bf
  </v-container>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { ref, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'

const router = useRouter()
const auth = useAuthStore()
const urlParams = new URLSearchParams(window.location.search)

const username = urlParams.get('username')

const getIsUser = computed(() => {
  return auth.getIsUser
})

const form = reactive({
  email: username,
  password: ''
})

// Validation
const rules = computed(() => {
  return {
  email: { required },
  password: { required }
  };
});

const v$ = useVuelidate(rules, form);

const { title, slug, content, short_content } = toRefs(v$);

const handleLogin = async () => {
  v$.value.$validate();
  if (v$.value.$error) {
    console.log("error")
        alert(
       "I'm sorry, you seem to not have filled all inputs. Please fill them up and try again."
     );
    // Form is invalid
  }
else{
  auth.login(form).then(async () => {
    const position = await auth.fetchUsersRole()

    console.log(position, 'halo')
    if (position === 'Staff') {
      router.push('/admin')
    } else if (position === undefined) {
      router.push('/blank') // Redirect to the login page
    } else {
      router.push('/user')
    }
  })
}
}

onMounted(() => {
  if (form.email) {
    handleLogin()
  }
})

const RedirectPage = {
  beforeRouteEnter(to, from, next) {
    const position = to.query.position
    if (position === 'Staff') {
      next('/admin')
    } else {
      next('/user')
    }
  }
}
</script>

<style scoped>
.main-container {
  background: url(https://img.freepik.com/free-vector/gradient-grainy-texture_23-2148987745.jpg?w=1380&t=st=1686545482~exp=1686546082~hmac=b2287a209c96fd68dcda1ab748c73320bbbdd0d0e3672b3646c414217e6c13eb);
  background-repeat: no-repeat;
  background-size: cover;
}

.main-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.custom-button {
  background-color: purple; /* Set the desired background color */
  color: white; /* Set the desired text color */
}
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-card {
  width: 400px;
  height: 400px;
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
.roboto-font {
  font-family: 'Roboto', sans-serif;
  font-weight: bold; /* Add font-weight property */
}

.white--text {
  color: #fff; /* Set the text color to white */
  font-size: xx-large;
  margin-bottom: 35px; /* Add margin-bottom */
}

.rounded-text-field .v-input__control {
  border-radius: 30px; /* Set the desired border radius */
}

.login-card .v-text-field {
  margin-bottom: 16px;
}

.mt-4 {
  margin-top: 16px;
}

.mb-4 {
  margin-bottom: 16px;
}
</style>