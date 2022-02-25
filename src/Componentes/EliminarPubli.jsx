import {firebaseApp} from "./Firebase";
import {getFirestore, deleteDoc, collection, doc} from 'firebase/firestore'
const firestore = getFirestore(firebaseApp);

export default async function eliminarPubliHome(publicacion){
    const collectionRef = collection(firestore, 'publicaciones'); 
    const docuRef = doc(collectionRef, publicacion.id);
    const eliminado = await deleteDoc(docuRef);
    return eliminado;
}
