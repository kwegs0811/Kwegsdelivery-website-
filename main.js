
const firebaseConfig = {
  apiKey: "AIzaSyCLv_JPPpLeQFI9dFZxNwQXBMEIXCCushA",
  authDomain: "kwegs-delivery-car.firebaseapp.com",
  databaseURL: "https://kwegs-delivery-car-default-rtdb.firebaseio.com",
  projectId: "kwegs-delivery-car",
  storageBucket: "kwegs-delivery-car.appspot.com",
  messagingSenderId: "288377432780",
  appId: "1:288377432780:web:904bb112a587b1393fb069"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

function sendCommand(cmd) {
  db.ref('car/command').set(cmd);
}
