// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCLv_JPPpLeQFI9dFZxNwQXBMEIXCCushA",
  authDomain: "kwegs-delivery-car.firebaseapp.com",
  databaseURL: "https://kwegs-delivery-car-default-rtdb.firebaseio.com",
  projectId: "kwegs-delivery-car",
  storageBucket: "kwegs-delivery-car.appspot.com",
  messagingSenderId: "288377432780",
  appId: "1:288377432780:web:904bb112a587b1393fb069"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Send Destination
function sendDestination(location) {
  db.ref("commands").set({
    destination: location,
    timestamp: Date.now()
  });
}

// Map Setup
const map = L.map('map').setView([-3.3869, 36.68299], 17);  // Centered on Arusha Tech

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap'
}).addTo(map);

// Marker
const carMarker = L.marker([-3.3869, 36.68299]).addTo(map).bindPopup("Delivery Car");

// Realtime Location Update
db.ref("location").on("value", (snapshot) => {
  const data = snapshot.val();
  if (data) {
    const lat = data.lat;
    const lng = data.lng;
    carMarker.setLatLng([lat, lng]);
    carMarker.getPopup().setContent(`Car is here<br>Lat: ${lat}<br>Lng: ${lng}`);
    map.panTo([lat, lng]);
  }
});
