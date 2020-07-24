import * as firebase from "firebase/app";
import "firebase/firestore";
import { struct } from 'superstruct'

import { initFirestorter, Collection, Document, Mode } from "firestorter";
import { config } from '../fireconfig';
import { DayType, SuperFlo } from "./types";
import moment from "moment";
const firebaseApp = firebase.initializeApp(config);

initFirestorter({ firebase });
const firestore = firebaseApp.firestore();
const db = firebase.firestore();


const ArticleSchema = struct({
  title: 'string',
  is_published: 'boolean?',
  tags: ['string'],
  author: {
    id: 'number',
  },
});
// const store = {
//      Day : new Document<DayType>,
//      Flo : new Document<SuperFlo>,
//      floz : new Collection<Flo>("flo"),
//      days : new Collection<Day>( "days"),
//      day : new Document( "days/g",  { mode: Mode.Auto }),


// }
export type Day = Document<DayType>;
export type Flo = Document<SuperFlo>;
export const floz = new Collection<Flo>("flo");
export const days = new Collection<Day>( "days");
export const day: Day = new Document( "days/g",  { mode: Mode.Auto });
export const dayOfWeek = moment().day()

export { firestore };

// TODO https://docs.expo.io/versions/v37.0.0/sdk/firebase-core/