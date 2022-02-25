<Table>
<thead id='t-head'>
    <tr>
        <th>#</th>
        <th>Titulo</th>
        <th>Ubicación</th>
        <th>Descripción</th>
        <th>Fecha</th>
        {/* <th>ID</th> */}
        <th>Acciones</th>
        
    </tr>
</thead>
<tbody id='t-body'>
    {publicaciones && publicaciones.map((objeto, index) => (
        <tr key={index}>
            <td>{index + 1}</td>
            <td>{objeto.titulo}</td>
            <td>{objeto.ubicación}</td>
            <td>{objeto.descripción}</td>
            <td>{objeto.Fecha}</td>
            {/* <td>{objeto.id}</td> */}
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