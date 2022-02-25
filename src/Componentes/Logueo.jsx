import React, {useState} from 'react'
import { Stack, Container, Form, Button } from 'react-bootstrap'
import logo from '../Assets/L1.jpg'
import '../App.css'
import {firebaseApp} from './Firebase';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithRedirect,
GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from 'firebase/auth';
import {getFirestore, doc, setDoc} from 'firebase/firestore'
const firestore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();


export default function Logueo() {
    const [estaRegistrandose, setEstaRegistrandose] = useState(false);

    async function submitHandler(e){
        e.preventDefault();
        const correo = e.target.formBasicEmail.value;
        const contraseña = e.target.formBasicPassword.value;
        console.log(correo, contraseña);

        if(estaRegistrandose){
            //si el usuario se registra
            const usuario = await createUserWithEmailAndPassword(auth, correo, contraseña).then((usuarioFirebase) =>{
                return(usuarioFirebase);
            });
            console.log(usuario.user.uid);
            const docuRef = doc(firestore, `usuarios/${usuario.user.uid}`)
            setDoc(docuRef, {correo: correo})
        }else{
            //si el usuario está iniciando sesión
            signInWithEmailAndPassword(auth, correo, contraseña)
        }
    }

    const signInWithFacebook = () => {
        const faceProvider = new FacebookAuthProvider();
        signInWithPopup(auth, faceProvider)
        .then((result)=>{
            console.log(result);
        }).catch((error)=>{
            console.log(error.message);
        })
    }

    // const traerUsuarios = async () =>{
    //     const users = [];
    //     const collectionRef = collection(firestore, 'usuarios');
    //     const snapShot = await getDocs(collectionRef)
    //     snapShot.forEach((doc)=>{
    //         users.push(doc.data())
    //     });
    //     console.log(users)
    // };

    return (
    <Container>
    <Stack gap={3}>
    <img src={logo} alt='Logo' id='logo'/>
    <h1 id='iniReg'>{estaRegistrandose ? 'Registrate' : 'Inicia Sesión'}</h1>
    <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button variant="dark" type="submit" >
            {estaRegistrandose ? 'Registrate' : 'Inicia Sesión'}
        </Button>
    </Form>

        <Button variant="danger" type="submit" style={{ width: "300px" }} onClick={()=>signInWithRedirect(auth, googleProvider)}>
            Acceder con Google
        </Button>

        <Button onClick={signInWithFacebook} style={{ width: "300px" }}>
            Acceder con Facebook
        </Button>

        <Button
          style={{ width: "300px" }}
          variant="light" 
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
