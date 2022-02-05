import React, {useState, useEffect} from 'react'
import Home from '../src/Componentes/Home'
import Logueo from '../src/Componentes/Logueo'
import './App.css'

import firebaseApp from './Componentes/Firebase';
import {getAuth, onAuthStateChanged} from 'firebase/auth'; 
const auth = getAuth(firebaseApp);


function App() {
  const [usuarioGlobal, setUsuarioGlobal] = useState(null);

  onAuthStateChanged(auth, (usuarioFirebase)=>{
    if(usuarioFirebase){
      //en caso de inicio de sesión
      setUsuarioGlobal(usuarioFirebase);
    }else{
      //en caso de que no se inicie sesión
      setUsuarioGlobal(null);
    }
  })

  return (
    <>
    {usuarioGlobal ? <Home correoUsuario={usuarioGlobal.email} /> : <Logueo/>}
    </>
  );
}

export default App;
