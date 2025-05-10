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

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Map Setup
const map = L.map("map").setView([-3.3647, 36.6788], 17);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

// Named Points
const locations = {
  "Ufundi Tower": [-3.363675, 36.677285],
  "Irrigation Building": [-3.365418, 36.678761],
  "High Class": [-3.364119, 36.679867],
  "Ecowater": [-3.365265, 36.678846],
  "Hostel 1": [-3.364799, 36.679811]
};

for (const [name, coords] of Object.entries(locations)) {
  L.marker(coords).addTo(map).bindPopup(name);
}

// Live Marker for the Car
const carMarker = L.marker([-3.3647, 36.6788], { color: "red" }).addTo(map);

// Update Location from Firebase
firebase.database().ref("car/location").on("value", (snapshot) => {
  const loc = snapshot.val();
  if (loc && loc.lat && loc.lon) {
    carMarker.setLatLng([loc.lat, loc.lon]);
    map.setView([loc.lat, loc.lon], 17);
  }
});

// Send Destination to Firebase
function sendDestination(name) {
  const coords = locations[name];
  if (!coords) return;
  firebase.database().ref("car/command").set({
    destination: name,
    lat: coords[0],
    lon: coords[1]
  });
  alert(`Sent destination: ${name}`);
}