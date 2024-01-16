import { initializeApp } from "firebase/app";
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage'
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

export const  uploadFile = async (file) =>{
const storageRef= ref(storage, v4())
 await uploadBytes(storageRef, file)
const url = await getDownloadURL(storageRef)
console.log(url);
return url
}