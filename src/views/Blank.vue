<template>
  <v-container class="not-found-container" fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="not-found-card">
          <v-card-title>
            <h1 class="not-found-title">
              <v-img
                src="https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg?w=1380&t=st=1686538700~exp=1686539300~hmac=6bfc5d2d63f955ade7ecb263a12e6f507506094ae1c9d6f588141e078346ea72"
                class="bug-image"
              />
            </h1>
            <h2 class="not-found-subtitle">User Not Found</h2>
          </v-card-title>
          <v-card-text>
            <p>Please contact our admin to make sure your account exists or is active.</p>
          </v-card-text>
          <v-card-actions>
            <v-btn block @click="redirectToLogin" style="background-color: green; color: white"
              >Go to Login</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  methods: {
    redirectToLogin() {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.not-found-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.not-found-card {
  max-width: 400px;
  margin: auto;
}

.not-found-title {
  font-size: 48px;
  margin-bottom: 16px;
  text-align: center;
}

.not-found-subtitle {
  font-size: 24px;
  margin-bottom: 16px;
  text-align: center;
}
</style>
