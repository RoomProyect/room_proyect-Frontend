import { v4 } from 'uuid';
import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { GoogleAuthProvider } from 'firebase/auth';

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
export const providerGoogle = new GoogleAuthProvider();
export const storage = getStorage(app);

// Modificar la función para subir múltiples archivos
export const uploadFiles = async (files) => {
  const urls = [];

  // Iterar sobre cada archivo y subirlo
  for (const file of files) {
    const storageRef = ref(storage, v4());

    // Subir el archivo al almacenamiento de Firebase
    await uploadBytes(storageRef, file);

    // Obtener la URL de descarga del archivo subido
    const url = await getDownloadURL(storageRef);

    // Agregar la URL al array de URLs
    urls.push(url);
  }

  // Devolver el array de URLs de descarga
  return urls;
};
