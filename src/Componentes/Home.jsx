import React, {useEffect, useState} from 'react'
import {Container, Button, Stack, Form, FormGroup, FormControl, Table} from 'react-bootstrap'
import traerData from './TraerPublicaciones'
import eliminarPubliHome from './EliminarPubli'
import '../App.css'
import filtrarDatos from './FiltradorDatos'
//Se importan los modales
import ModalAñadir from './ModalAñadir'
import ModalEditar from './ModalEditar'
//Se importan las credeciales de firebase
import firebaseApp from './Firebase'
import {getAuth, signOut}  from'firebase/auth'
const auth = getAuth(firebaseApp);




export default function Home({userName}) {
    const [publicaciones, setPublicaciones] = useState();
    const [isModalAñadir, setIsModalAñadir] = useState(false);
    const [isModalEditar, setIsModalEditar] = useState(false);
    const [publiEditar, setPubliEditar] = useState();
    console.log(userName);

    async function busquedaForm (e) {
        e.preventDefault();
        const busqueda = e.target.busqueda.value;
        const nuevosDocus = await filtrarDatos(busqueda);
        setPublicaciones(nuevosDocus)
    }

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

            { publiEditar && (<ModalEditar isModalEditar={isModalEditar} setIsModalEditar={setIsModalEditar} 
            actualizarPubli={actualizarPubli} publiEditar={publiEditar}  setPubliEditar={setPubliEditar} />)}

            <Stack direction='horizontal' className='justify-content-between'>
            <h4>Hola,  {userName}, iniciaste sesión</h4>
            <Button variant="outline-warning" onClick={()=>signOut(auth)}>Cerrar Sesión</Button>
            </Stack>
            <hr/>
            <Form onSubmit={busquedaForm}>
                <Stack direction='horizontal'>
                    <FormGroup controlId='busqueda' className='w-75 m-3'>
                        <FormControl type='text' placeholder='Buscar' />
                    </FormGroup>
                    <Button type='submit' variant='dark'>Buscar</Button>
                    <Button variant='light' onClick={()=>{
                        const input = document.getElementById('busqueda');
                        input.value = '';
                        actualizarPubli();
                    }}>Reset</Button>
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
                                <Button variant='dark' onClick={() => { 
                                    setPubliEditar({...objeto});
                                    setIsModalEditar(true);}}>Editar</Button>
                                <Button onClick={()=> {
                                    eliminarPubliHome(objeto).then(
                                        (confirmacion) => {
                                        actualizarPubli();
                                    }); }} variant='danger' >Eliminar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {/* <>
<Card> {publicaciones && publicaciones.map((objeto, index) => (
<Card.Header as="h5" key={index}>{objeto.titulo}</Card.Header>
<Card.Body>
  <Card.Title>{objeto.ubicación}</Card.Title>
  <Card.Text>
  {objeto.descripción}, {objeto.Fecha}, {objeto.id}
  </Card.Text>
  <Button variant='dark' onClick={() => { 
                                    setPubliEditar({...objeto});
                                    setIsModalEditar(true);}}>Editar</Button>
                                <Button onClick={()=> {
                                    eliminarPubliHome(objeto).then(
                                        (confirmacion) => {
                                        actualizarPubli();
                                    }); }} variant='danger' >Eliminar</Button>
)</Card.Body>
)</Card>
            <Button onClick={añadirPubliHome}>Agregar Publicación</Button>
            </> */}

          
        </Container>
    
    );
};
