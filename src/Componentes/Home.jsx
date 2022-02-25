import React from 'react'
import CrearPost from './CrearPost'
import {Container, Button, Stack} from 'react-bootstrap'

import '../App.css'
//Se importan las credeciales de firebase
import {firebaseApp} from './Firebase'
import {getAuth, signOut}  from'firebase/auth'
const auth = getAuth(firebaseApp);




export default function Home({userName, correoUsuario, photo, infoUsuario}) {
    // const [publicaciones, setPublicaciones] = useState();
    // const [isModalAñadir, setIsModalAñadir] = useState(false);
    // const [isModalEditar, setIsModalEditar] = useState(false);
    // const [publiEditar, setPubliEditar] = useState();
    // const [usuarios, setUsuarios] = useState();


    // const fakeData = {
    //     name: 'Fernanda',
    //     email: 'fernanda@gmail.com',
    //     photo: 'https://images.pexels.com/photos/3866555/pexels-photo-3866555.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    // };

    // async function busquedaForm (e) {
    //     e.preventDefault();
    //     const busqueda = e.target.busqueda.value;
    //     const nuevosDocus = await filtrarDatos(busqueda);
    //     setPublicaciones(nuevosDocus)
    // }

    // function actualizarPubli (){
    //     traerData().then((publicaciones) =>{
    //         setPublicaciones(publicaciones);
    //     });
    // }

    // function añadirPubliHome () {
    //     setIsModalAñadir(true);
    // }

    // useEffect(() => {
    //     actualizarPubli();
    // }, [])

    // function actualizarUsuarios () {
    //     traerUsuarios().then((usuarios) => {
    //         setUsuarios(usuarios);
    //     });
    // };

    // useEffect(()=>{
    //     actualizarUsuarios();
    // }, [])

    return (
        
        <Container fluid>
            {/* <ModalAñadir isModalAñadir={isModalAñadir} setIsModalAñadir={setIsModalAñadir} 
            actualizarPubli={actualizarPubli}/>

            { publiEditar && (<ModalEditar isModalEditar={isModalEditar} setIsModalEditar={setIsModalEditar} 
            actualizarPubli={actualizarPubli} publiEditar={publiEditar}  setPubliEditar={setPubliEditar} />)} */}

            <Stack direction='horizontal' className='justify-content-between'>
            <h4>Hola,  {userName}, iniciaste sesión</h4>
            <Button variant="outline-secondary" onClick={()=>signOut(auth)}>Cerrar Sesión</Button>
            </Stack>
            <hr />
            <CrearPost/>
            {/* <Form onSubmit={busquedaForm}>
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
            </Form> */}
            {/* Aqui va la tabla */}

{/* <Button onClick={añadirPubliHome} variant="warning">Agregar Publicación</Button> */}
        </Container>
    
    
    );
};
