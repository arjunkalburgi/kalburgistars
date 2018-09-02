import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';
import { HomePage } from '../pages/home/home';

const config = {
  apiKey: "AIzaSyCJj7S8sQz9K2GZwMvGfsLc_7sxuPIafac",
  authDomain: "stars-n-stuff.firebaseapp.com",
  databaseURL: "https://stars-n-stuff.firebaseio.com",
  projectId: "stars-n-stuff",
  storageBucket: "stars-n-stuff.appspot.com",
  messagingSenderId: "242200308130"
};

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    firebase.initializeApp(config);
  }
}

