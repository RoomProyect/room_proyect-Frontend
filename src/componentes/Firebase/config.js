import { initializeApp } from "firebase/app";
import {getStorage, ref, uploadBytes} from 'firebase/storage'
import { getAuth } from "firebase/auth";
import {v4} from 'uuid'

const firebaseConfig = {
  apiKey: "AIzaSyD3wH8NXcBMJ1xw31srOMDG6qqpTo2f1mg",
  authDomain: "p-room.firebaseapp.com",
  projectId: "p-room",
  storageBucket: "p-room.appspot.com",
  messagingSenderId: "106476533498",
  appId: "1:106476533498:web:97284c94b2d4cf4bfc7b43"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)

export const auth = getAuth(app);


export const  uploadFile = (file) =>{
const storageRef= ref(storage, v4())
uploadBytes(storageRef, file).then(
    snapshot => {console.log(snapshot)}
)
}