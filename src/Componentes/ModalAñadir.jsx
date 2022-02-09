import React from 'react'
import {Modal, Stack, Form, Button} from 'react-bootstrap'
import añadirPubli from '../Componentes/AñadirPubli'

export default function ModalAñadir({isModalAñadir, setModalAñadir, actualizarPubli}) {

    function añadirPubliModal () {
        //obtenemos la información del formulario
        const titulo = document.getElementById('titulo').value;
        const ubicación = document.getElementById('ubicación').value;
        const descripción = document.getElementById('descripción').value;
        const Fecha = document.getElementById('Fecha').value;
        const id = document.getElementById('id').value;
        //se envia la informaciónn a firebase
        const infoPubli = {titulo, ubicación, descripción, Fecha, id};
        añadirPubli(infoPubli);
        //cerramos el modal
        actualizarPubli();
        setModalAñadir(false);
    }

  return (
    <Modal show={isModalAñadir} onHide={()=>setModalAñadir(false)}>
        <Modal.Header>
            <Modal.Title>Añadir Publicación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Stack>
                    <Form.Control id='titulo' placeholder='Titulo' type='text' className='mb-1'/>
                    <Form.Control id='ubicación' placeholder='Ubicación' type='text' className='mb-1' />
                    <Form.Control id='descripción' placeholder='Descripción' type='text' className='mb-1' />
                    <Form.Control id='Fecha' placeholder='Fecha' type='text' className='mb-1' />
                    <Form.Control id='id' placeholder='ID' type='text' className='mb-1' />
                </Stack>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={()=>setModalAñadir(false)} variant='primary' >Cancelar</Button>
            <Button  onClick={añadirPubliModal} variant='secondary'>Añadir</Button>
        </Modal.Footer>
    </Modal>
  )
}
