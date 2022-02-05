import React, {useState} from 'react'
import { Stack, Container, Form, Button } from 'react-bootstrap'
import firebaseApp from './Firebase';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';

const auth = getAuth(firebaseApp);

export default function Logueo() {
    const [estaRegistrandose, setEstaRegistrandose] = useState(false);

    async function submitHandler(e){
        e.preventDefault();
        const correo = e.target.formBasicEmail.value;
        const contraseña = e.target.formBasicPassword.value;
        console.log(correo, contraseña);

        if(estaRegistrandose){
            //si el usuario se registra
            const usuario = await createUserWithEmailAndPassword(auth, correo, contraseña);
            console.log(usuario);
        }else{
            //si el usuario está iniciando sesión
            signInWithEmailAndPassword(auth, correo, contraseña)
        }


        
    }

    return (
    <Container>
    <Stack gap={3}>
    <h1>{estaRegistrandose ? 'Registrate' : 'Inicia Sesión'}</h1>
    <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button variant="dark" type="submit">
            {estaRegistrandose ? 'Registrate' : 'Inicia Sesión'}
        </Button>
    </Form>

    <Button variant="primary" type="submit" style={{ width: "300px" }}>
            Acceder con Google
        </Button>

        <Button
          style={{ width: "300px" }}
          variant="secondary"
          onClick={() => setEstaRegistrandose(!estaRegistrandose)}
        >
          {estaRegistrandose
            ? "¿Ya tienes cuenta? Inicia sesión"
            : "¿No tienes cuenta? Regístrate"}
        </Button>

    </Stack>
</Container>
  )
}
