import React from "react";
//Se importan las credeciales de firebase
import firebaseApp from './Firebase'
import {getFirestore, getDocs, collection} from 'firebase/firestore'
const firestore = getFirestore(firebaseApp);

const traerUsuarios = async () => {
        const usuario = [];
        const collectionRef = collection(firestore, 'usuarios')
        const snapShot = await getDocs(collectionRef)
        snapShot.forEach(doc => {
            usuario.push(doc.data());
        });
        return usuario;
}

export default traerUsuarios;