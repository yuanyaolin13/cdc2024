<template>
  <div id="map"></div>
</template>

<script lang="ts">
import L from 'leaflet';
import { MongoClient } from 'mongodb';

export default {
  name: 'Map',
  mounted() {
    const uri = "mongodb+srv://yuanyaolin13:alexcadenfrankyuanyao@cluster0.yolp8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    const client = new MongoClient(uri);

    try {
      client.connect();
      const collection = client.db('tourpedia_data').collection('attractions');
      const locations = collection.find({}).toArray();

      // Initialize the map
      const map = L.map('map').setView([51.505, -0.09], 13);

      // Add a tile layer (OpenStreetMap)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
      locations.forEach((location) => {
        L.marker([location.latitude, location.longitude])
            .addTo(map)
            .bindPopup(`<b>${location.name}</b>`);
      });
    } catch (error) {
      console.error(error);
    } finally {
      client.close();
    }
  },
};
</script>

<style scoped>
#map {
  height: 720px;
  width: 1280px;
}
</style>
