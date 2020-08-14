import 'firebase/auth';

import * as f from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBxBIsFsxJM25WgT8feHsVoBDhHHUfBGb8",
    authDomain: "ikitraq.firebaseapp.com",
    databaseURL: "https://ikitraq.firebaseio.com",
    projectId: "ikitraq",
    storageBucket: "ikitraq.appspot.com",
    messagingSenderId: "518210269276",
    appId: "1:518210269276:web:ae17f3c2849e3202b37699",
    measurementId: "G-9RGRCTD3B2"
  };

class Fire {
  static instance: Fire;
  app!: f.app.App;
  constructor(){
   if(! Fire.instance){
     this.app = f.initializeApp( firebaseConfig );
     Fire.instance = this;
   }

   return Fire.instance;
  }

 //rest is the same code as preceding example

}

const fire = new Fire();
Object.freeze(fire);

export default fire;