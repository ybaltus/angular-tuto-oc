import { Component } from '@angular/core';
import firebase from "firebase/app";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyDexUBySA84oSIHQEbEV8DS8h_3767p4kA",
      authDomain: "octuto-book-angular.firebaseapp.com",
      projectId: "octuto-book-angular",
      storageBucket: "octuto-book-angular.appspot.com",
      messagingSenderId: "18275137309",
      appId: "1:18275137309:web:f6493d6f491a750e67d3f4"    };

  // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
