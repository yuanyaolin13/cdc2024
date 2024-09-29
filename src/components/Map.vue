<template>
  <div id="map" style="height: 500px;"></div>
</template>

<script lang="ts">
import L from 'leaflet';

export default {
  name: 'Map',
  mounted() {
    const map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
  },
};
</script>

<style>
</style>
