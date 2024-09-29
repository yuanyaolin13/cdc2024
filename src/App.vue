<template>
  <div>
    <h1>MongoDB Ping Test</h1>
    <button @click="pingMongoDB">Ping MongoDB</button>
  </div>
</template>

<script lang ='ts'>
import axios from 'axios';
export default {
  data() {
    return {
      name: 'App',
      data: null,
    };
  },
  methods: {
    pingMongoDB() {
      axios
        .get('http://localhost:3000/api/ping')
        .then((response) => {
          this.data = response.data.json()
        })
        .catch((error) => {
          console.error('Error pinging MongoDB:', error);
        });
    },
  },
};
</script>


<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
