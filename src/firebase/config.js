import firebase from 'firebase/app'
import 'firebase/firestore'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAHPl-ZBwlmFrUCtddxhN1ZKuLsbw0IjU4",
  authDomain: "book-crud-react-hooks.firebaseapp.com",
  databaseURL: "https://book-crud-react-hooks.firebaseio.com",
  projectId: "book-crud-react-hooks",
  storageBucket: "book-crud-react-hooks.appspot.com",
  messagingSenderId: "84214041322"
}

firebase.initializeApp(config)
firebase.firestore().settings({ timestampsInSnapshots: true })
var db = firebase.firestore()

export default db