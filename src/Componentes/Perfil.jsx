import React from "react";


export default function Perfil({correoUsuario, infoUsuario, userName, photo}) {
    return (
    <>
        <div key={infoUsuario.email}>
            <h2>{infoUsuario.email}</h2>
            {userName == null ? (
                <div>
                <h3>{infoUsuario.name}</h3>
                <img src={infoUsuario.photo} alt='photoUsuario'/>
                </div>
            ):
            (<div>
                <h2>{userName}</h2>
                <img src={photo} alt='photoUsuario'/>
            </div>
            )};
            
        </div>
    </>
    )
}

