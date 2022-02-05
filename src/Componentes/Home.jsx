import React from 'react'
import {Container, Button} from 'react-bootstrap'

//Se importan las credeciales de firebase
import firebaseApp from './Firebase'
import {getAuth, signOut}  from'firebase/auth'
const auth = getAuth(firebaseApp)


export default function Home() {
    return (
        <Container>
            <h4>Hola, iniciaste sesión</h4>
            <Button onClick={()=>signOut(auth)}>Cerrar Sesión</Button>
        </Container>
    
    )
}
