import React from 'react'
import {Card, Button, Container} from 'react-bootstrap'

//Se importan las credenciales de firebase
import firebaseApp from './Firebase'
import {getFirestore, updateDoc, doc, collection, getDocs, addDoc} from 'firebase/firestore'
const firestore = getFirestore(firebaseApp);

export default function Publicar({correoUsuario, arrayPubli, setArrayPubli}) {
    async function nuevaPubli(e){
        e.preventDefault();
        const ubicación = e.target.header.value;
        const titulo = e.target.titulo.value;
        const descripcion = e.target.titulo.value;
        const docuRef = collection(firestore, 'publicaciones');
        try{
            const ref = await addDoc(docuRef,{
                ubicación, titulo, descripcion, Date: new Date(),
            });
        }catch(error){
            console.log(error.message);
        }
        const publicaciones = [];
        const querySnapshot = await getDocs(docuRef);
        querySnapshot.forEach((doc)=>{
            publicaciones.push(doc.data());
        });
        setArrayPubli(publicaciones);
        e.target.reset();
    }


    return (
    <Container>   
        <Card onSubmit={nuevaPubli}>
            <Card.Header as="h5" id='header'></Card.Header>
            <Card.Body>
            <Card.Title id='titulo'></Card.Title>
            <Card.Text id='descripcion'></Card.Text>
            <Button type='submit' variant="primary" id='btn'>Publicar</Button>
            </Card.Body>
        </Card>
        <hr/>
    </Container>     
    )
}
