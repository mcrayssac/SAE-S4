<template>
 <v-container>
  <section class="Title">
    <v-row class="mt-10" align="center" no-gutters>
      <v-col class="mb-16" align="center" no-gutters>
        <h1 class="page-title">Home</h1>
      </v-col>
    </v-row>
  </section>

  <Home_Colors />
  </v-container>
</template>

<script>
  import Home_Colors from '../components/Home_Colors'

  export default {
    name: 'Home',

    components: {
      Home_Colors,
    },
  }
</script>

<style scoped>
@import '@/../public/css/Home.css';
</style>
