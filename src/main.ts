import App from './App.vue';
import {createApp} from 'vue';
import './style.css';
import 'leaflet/dist/leaflet.css'; // Leaflet CSS

// Initialization of app object
const app = createApp(App);

// To mount the object upon
app.mount('#app');