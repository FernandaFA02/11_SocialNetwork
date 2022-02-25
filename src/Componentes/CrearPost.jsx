import React, {useState} from "react";
import '../App.css'
import LinkedCameraIcon from '@mui/icons-material/LinkedCamera';
import {Button} from 'react-bootstrap'
import makeId from "./functions";
import {storage, db, firebaseApp} from './Firebase'
import { ref } from "firebase/storage";




export default function CrearPost ({userName}){
    const [caption, setCaption] = useState("");
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);

    //Función para atraer las imagenes al post qque se creará
    const handleChange = (e) => {
        if(e.target.files[0]){
            setImage(e.target.files[0]);
            //Esto proporciona la fuente para cargar la imagen
            var SelectedImageSrc = URL.createObjectURL(e.target.files[0]);

            var imagePreview = document.getElementById('image-prev');
            imagePreview.src =SelectedImageSrc;
            imagePreview.style.display = 'block';
        }
    }

    const handleUpload = () =>{
        if (image) {
            console.log(image)
            const uploadTask = ref(storage,`images/${image.name}`).put(image.name);
            
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                // progress function .....
                const progress = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
              },
              (error) => {
                // Error function...
                console.log(error);
                alert(error.message);
              },
              () => {
                // upload complete function
                storage
                  .ref("images")
                  .child(image.name)
                  .getDownloadURL()
                  .then((url) => {
                    db.collection("posts").add({
                      timestamp: firebaseApp.firestore.FieldValue.serverTimestamp(),
                      caption: caption,
                      postImageUrl: url,
                      userName: userName.displayName.toLowerCase(),
                      
                    });
                  });
      
                setProgress(0);
                setCaption("");
                setImage(null);
                var preview1 = document.getElementById("image-1-preview");
                preview1.style.display = "none";
              }
            );
          }
        };

    return(
        <div className="createPost">
            <div className="createPost_loggedIn">
            <p>Crear Publicación</p>
            <div className="createPost_center">
                <textarea className="createPost_textarea" value={caption} 
                onChange={(e) => setCaption(e.target.value)} rows="3" placeholder="Escribir publicación.....">
                </textarea>
                <div className="createPost_imagePrev">
                    <img id="image-prev" alt="" />
                </div>
            </div>
            <div className="createPost_Bottom">
            <div className="createPost_imageUpload">
                <label htmlFor="fileInput">
                <LinkedCameraIcon style={{cursor:'pointer', fontSize:'20px'}}/>
                </label>
                <input id="fileInput" type="file" accept="image/*" onChange={handleChange} />
                <Button className='createPost_uploadbtn'onClick={handleUpload}
                style={{color:caption ? "#000" : "lightgrey"}}>{`Publicar${progress !== 0 ? progress: ""}`}</Button>
            </div>
            </div>
            </div>
        </div>
    )
}