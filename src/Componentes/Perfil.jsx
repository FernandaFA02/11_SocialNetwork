import React from "react";


export default function Perfil({correoUsuario, infoUsuario}) {
    return (
    <>
        <div key={infoUsuario.email}>
            <h2>{infoUsuario.email}</h2>
            <h3>{infoUsuario.displayName}</h3>
            <img alt='PerfilUsuario'>{infoUsuario.photoURL}</img>
        </div>
    </>
    )
}

