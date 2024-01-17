import {v4} from 'uuid'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyA-NV4FuVuA4PupRpGSSt25oWa4gznkVH4",
  authDomain: "room-proyect.firebaseapp.com",
  projectId: "room-proyect",
  storageBucket: "room-proyect.appspot.com",
  messagingSenderId: "278448217919",
  appId: "1:278448217919:web:47c771654d27bd69743d8a",
  measurementId: "G-MZFPK4HPJE"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app); 

export const  uploadFile = async (file) =>{
  const storageRef= ref(storage, v4())
  await uploadBytes(storageRef, file)
  const url = await getDownloadURL(storageRef)
  console.log(url);
  return url
}