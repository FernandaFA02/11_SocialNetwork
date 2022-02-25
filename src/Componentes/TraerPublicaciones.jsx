//Se importan las credeciales de firebase
import {firebaseApp} from './Firebase'
import {getFirestore, getDocs, collection} from 'firebase/firestore'
const firestore = getFirestore(firebaseApp);

const traerData = async () => {
    const publi = [];
    const collectionRef = collection(firestore, 'publicaciones') 
    const snapShot =  await getDocs(collectionRef); 
    snapShot.forEach(doc => {
        publi.push(doc.data());
    });
    return publi;
}

export default traerData;