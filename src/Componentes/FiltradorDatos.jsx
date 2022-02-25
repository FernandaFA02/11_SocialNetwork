import {firebaseApp} from './Firebase'
import {getFirestore, collection, query, where, getDocs} from 'firebase/firestore'
const firestore = getFirestore(firebaseApp);

async function filtrarDatos (stringBusqueda) {
    const docusFiltrados = [];

    const collectionRef = collection(firestore, 'publicaciones');
    const queryTitulo = query(collectionRef, where('titulo', '==', stringBusqueda)); 
    const queryId = query(collectionRef, where('id', '==', stringBusqueda));


    const arrySnapshots = await Promise.all([
        getDocs(queryTitulo),
        getDocs(queryId),
    ]);

    arrySnapshots.forEach((snapshot) => {
        snapshot.forEach((doc)=> {
            docusFiltrados.push(doc.data());
        });
    });

    return docusFiltrados;
}

export default filtrarDatos;

