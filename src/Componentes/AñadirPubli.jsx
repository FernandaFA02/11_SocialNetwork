//Se importan las credeciales de firebase
import {firebaseApp} from './Firebase'
import {getFirestore, setDoc, doc, collection} from 'firebase/firestore'
const firestore = getFirestore(firebaseApp);

function añadirPubli (infoPubli) {
    const collectionRef = collection(firestore, 'publicaciones');
    const docuRef = doc(collectionRef, infoPubli.id);
    setDoc(docuRef, infoPubli);
}

export default añadirPubli;