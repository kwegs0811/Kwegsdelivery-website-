import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCLv_JPPpLeQFI9dFZxNwQXBMEIXCCushA",
  authDomain: "kwegs-delivery-car.firebaseapp.com",
  databaseURL: "https://kwegs-delivery-car-default-rtdb.firebaseio.com",
  projectId: "kwegs-delivery-car",
  storageBucket: "kwegs-delivery-car.appspot.com",
  messagingSenderId: "288377432780",
  appId: "1:288377432780:web:904bb112a587b1393fb069"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function sendDestination() {
  const dest = document.getElementById("destination").value;
  set(ref(db, "command"), dest);
}