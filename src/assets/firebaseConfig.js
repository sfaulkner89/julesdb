import { initializeApp } from 'firebase/app'
import { ref, getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBZdblDEPO91uSXIi1ETHwZvqiI07bcWYY',
  authDomain: 'julesdb-e9216.firebaseapp.com',
  projectId: 'julesdb-e9216',
  storageBucket: 'julesdb-e9216.appspot.com',
  messagingSenderId: '96848093806',
  appId: '1:96848093806:web:270de083043f493dba3c7f'
}

export const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
export const storageRef = ref(storage)
export const db = getFirestore(app)
