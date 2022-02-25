import React, {useState} from 'react'
import {Modal, Stack, Form, Button} from 'react-bootstrap'
import añadirPubli from '../Componentes/AñadirPubli'

export default function ModalEditar({isModalEditar, setIsModalEditar, actualizarPubli, publiEditar, setPubliEditar}) {

    function editarPubliModal () {
        //obtenemos la información del formulario
        const titulo = document.getElementById('titulo').value;
        const ubicación = document.getElementById('ubicación').value;
        const descripción = document.getElementById('descripción').value;
        const Fecha = document.getElementById('Fecha').value;
        // const id = document.getElementById('id').value;
        //se envia la informaciónn a firebase
        const infoPubli = {titulo, ubicación, descripción, Fecha};
        añadirPubli(infoPubli);
        //cerramos el modal //regresar el estado a {false}
        setPubliEditar(null);
        actualizarPubli();
        setIsModalEditar(false);
    }
    
    const [publiEstado, setPubliEstado] = useState({...publiEditar});

    return (
    <Modal show={isModalEditar} onHide={() => {
        setIsModalEditar(false);
        setPubliEditar(null);
      }}>
        <Modal.Header>
            <Modal.Title>Editar Publicación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Stack>
                    <Form.Control id='titulo' placeholder='Titulo' type='text' className='mb-1'
                    value={publiEstado.titulo} onChange={(e)=> setPubliEstado({...publiEstado, titulo: e.target.value})} />
                    <Form.Control id='ubicación' placeholder='Ubicación' type='text' className='mb-1' 
                    value={publiEstado.ubicación} onChange={(e)=> setPubliEstado({...publiEstado, ubicación: e.target.value})} />
                    <Form.Control id='descripción' placeholder='Descripción' type='text' className='mb-1' 
                    value={publiEstado.descripción} onChange={(e)=> setPubliEstado({...publiEstado, descripción: e.target.value})} />
                    <Form.Control id='Fecha' placeholder='Fecha' type='text' className='mb-1'
                    value={publiEstado.Fecha} onChange={(e)=> setPubliEstado({...publiEstado, Fecha: e.target.value})}  />
                    {/* <Form.Control id='id' placeholder='ID' type='text' className='mb-1' 
                    value={publiEstado.id} onChange={(e)=> setPubliEstado({...publiEstado, id: e.target.value})} /> */}
                </Stack>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button  variant='light' onClick={() => {
            setIsModalEditar(false);
            setPubliEditar(null);
          }}>Cancelar</Button>
            <Button  onClick={editarPubliModal} variant='success'>Editar</Button>
        </Modal.Footer>
    </Modal>
  )
}