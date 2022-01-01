import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "database/config";

const firebaseApp = initializeApp(firebaseConfig);
const firebaseStorage = getStorage(firebaseApp);
const firebaseFirestore = getFirestore(firebaseApp);

export {
    firebaseApp,
    firebaseStorage,
    firebaseFirestore
}