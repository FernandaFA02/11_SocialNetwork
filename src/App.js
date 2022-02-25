import React, {useState} from 'react'
import Home from '../src/Componentes/Home'
import Logueo from '../src/Componentes/Logueo'
import './App.css'

import {firebaseApp} from './Componentes/Firebase';
import {getFirestore, doc, getDoc} from 'firebase/firestore'
import {getAuth, onAuthStateChanged} from 'firebase/auth'; 
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

function App() {
  const [usuarioGlobal, setUsuarioGlobal] = useState(null);

  async function registros (uid){
    const docuRef = doc(firestore, `usuarios/${uid}`);
    const docuCifrada = await getDoc(docuRef);
    const infoFinal = docuCifrada.data().email;
    return infoFinal;
  }

  function setUser (usuarioFirebase){
    registros(usuarioFirebase.uid).then((email)=>{
      const userData = {
        uid: usuarioFirebase.uid,
        correo: usuarioFirebase.correo
      };
      setUsuarioGlobal(userData);
      console.log('userData final', userData)
    });
          //en caso de inicio de sesión
      setUsuarioGlobal(usuarioFirebase);

  }

  onAuthStateChanged(auth, (usuarioFirebase)=>{
    if(usuarioFirebase){

    if(!usuarioGlobal){
      setUser(usuarioFirebase)
    }

    }else{
      //en caso de que no se inicie sesión
      setUsuarioGlobal(null);
    }
  })

  return (
    <>
    {usuarioGlobal ? <Home correoUsuario={usuarioGlobal.email} userName={usuarioGlobal.displayName} photo={usuarioGlobal.photoURL} /> : <Logueo/>}
    </>
  );
}

export default App;
