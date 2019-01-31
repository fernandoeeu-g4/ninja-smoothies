import firebase from 'firebase'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDMBoigTTpyPZJXttqfCYCMTKgjGAOKJSI",
  authDomain: "udemy-ninja-smoothies-62903.firebaseapp.com",
  databaseURL: "https://udemy-ninja-smoothies-62903.firebaseio.com",
  projectId: "udemy-ninja-smoothies-62903",
  storageBucket: "udemy-ninja-smoothies-62903.appspot.com",
  messagingSenderId: "37866640484"
};
const firebaseApp = firebase.initializeApp(config);

// Export firestore database
export default firebaseApp.firestore()
