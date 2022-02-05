import React, {useEffect, useState} from 'react'
import {Container, Button} from 'react-bootstrap'
import Publicar from '../Componentes/Publicar'
import Publicaciones from '../Componentes/Publicaciones'

//Se importan las credeciales de firebase
import firebaseApp from './Firebase'
import {getAuth, signOut}  from'firebase/auth'
import {getFirestore, doc, getDocs, setDoc, collection} from 'firebase/firestore'
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);


export default function Home({correoUsuario}) {
    const [arrayPubli, setArrayPubli] = useState(null);

    console.log(correoUsuario);
    const fakeData = [
        {id:1, descripcion:'publicacion falsa 1', url: 'https://picsum.photos/420'},
        {id:2, descripcion:'publicacion falsa 2', url: 'https://picsum.photos/420'},
        {id:3, descripcion:'publicacion falsa 3', url: 'https://picsum.photos/420'},
    ];

    async function buscarPubliOrCrearPubli(){
        //se crea una referencia a la collection
        const docuRef = collection(firestore, 'publicaciones');
        const publicacion = [];
        const querySnapshot = await getDocs(docuRef);
        querySnapshot.forEach((doc)=>{
            publicacion.push(doc.data());
        });
        return publicacion;
    };

    useEffect(()=>{
    async function pullCollection(){
        const publiExistentes= await buscarPubliOrCrearPubli();
        setArrayPubli(publiExistentes);
    }
    pullCollection();
    },  []);

    return (
        <Container>
            <h4>Hola, iniciaste sesión</h4>
            <Button onClick={()=>signOut(auth)}>Cerrar Sesión</Button>
            <hr/>
            <Publicar/>
            {arrayPubli ?  <Publicaciones arrayPubli={arrayPubli} setArrayPubli={setArrayPubli} 
            correoUsuario={correoUsuario} /> : null}

        </Container>
    
    );
};
