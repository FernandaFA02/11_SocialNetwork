import React, {useEffect, useState} from 'react'
import {Container, Button, Stack, Form, FormGroup, FormControl, Table} from 'react-bootstrap'
import traerData from './TraerPublicaciones'
import '../App.css'
//Se importa el modal
import ModalAñadir from './ModalAñadir'
//Se importan las credeciales de firebase
import firebaseApp from './Firebase'
import {getAuth, signOut}  from'firebase/auth'
import {getFirestore, getDocs, collection} from 'firebase/firestore'
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);




export default function Home({correoUsuario}) {
    const [publicaciones, setPublicaciones] = useState();
    const [isModalAñadir, setIsModalAñadir] = useState(false);
    console.log(correoUsuario);


    function actualizarPubli (){
        traerData().then((publicaciones) =>{
            setPublicaciones(publicaciones);
        });
    }

    function añadirPubliHome () {
        setIsModalAñadir(true);
    }

    useEffect(() => {
        actualizarPubli();
    }, [])

    return (
        <Container fluid>
            <ModalAñadir isModalAñadir={isModalAñadir} setIsModalAñadir={setIsModalAñadir} 
            actualizarPubli={actualizarPubli}/>
            <Stack direction='horizontal' className='justify-content-between'>
            <h4>Hola,  {correoUsuario}, iniciaste sesión</h4>
            <Button variant="outline-warning" onClick={()=>signOut(auth)}>Cerrar Sesión</Button>
            </Stack>
            <hr/>
            <Form>
                <Stack direction='horizontal'>
                    <FormGroup controlId='busqueda' className='w-75 m-3'>
                        <FormControl type='text' placeholder='Buscar' />
                    </FormGroup>
                    <Button type='submit' variant='dark'>Buscar</Button>
                    <Button variant='light'>Reset</Button>
                </Stack>
            </Form>
            <hr/>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Titulo</th>
                        <th>Ubicación</th>
                        <th>Descripción</th>
                        <th>Fecha</th>
                        <th>ID</th>
                        <th>Acciones</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {publicaciones && publicaciones.map((objeto, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{objeto.titulo}</td>
                            <td>{objeto.ubicación}</td>
                            <td>{objeto.descripción}</td>
                            <td>{objeto.Fecha}</td>
                            <td>{objeto.id}</td>
                            <td>
                                <Button variant='dark'>Editar</Button>
                                <Button variant='danger'>Eliminar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Button onClick={añadirPubliHome}>Agregar Publicación</Button>


          
        </Container>
    
    );
};
