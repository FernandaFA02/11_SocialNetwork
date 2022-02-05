import React from 'react'
import {Container, Stack, Row, Col} from 'react-bootstrap'

const Publicaciones = ({arrayPubli}) => {
  return (
    <Container>
        <Stack>
            {arrayPubli.map((objeto)=>{
                return(
                    <>
                    <Row>
                        <Col>{objeto.titulo}</Col>
                        <Col>{objeto.ubicación}</Col>
                        <Col>{objeto.descripción}</Col>
                        <Col>{objeto.Fecha}</Col>
                    </Row>
                    <hr/>
                    </>
                )
            })}
        </Stack>
    </Container>
  )
}

export default Publicaciones;