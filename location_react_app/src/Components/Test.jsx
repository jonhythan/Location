import React from 'react'
import { useState ,useEffect, useContext} from 'react'

const Test = () => {
  const [imageFile, setImageFile]=useState(null);
  const [imageByte, setImageByte]=useState(null);
  const [imageFileURL, setImageFileURL]=useState(null);
  
  const submitFile=(e)=>{
    e.preventDefault();
    
    function traitementImage(){
        return new Promise((resolve)=>{
            let fileReader = new FileReader();
            fileReader.readAsDataURL(imageFile);
            fileReader.onload = function(){
                resolve(setImageByte(fileReader.result))
            }
        })
    }

    function envoiRequete(){
        traitementImage().then(console.log(imageByte));
        console.log("imagefile")
        console.log(imageFile);
        //envoyer requete api
    }

    envoiRequete();
    console.log("outside");
    console.log(imageByte);
    // if(imageFile!==null){
    //     //transformons le file en byte[]
    //     let fileReader = new FileReader();
    //     // fileReader.readAsArrayBuffer(imageFile);
    //     // fileReader.onload=function(){
    //     //     setImageByte(fileReader.result);
    //     //     console.log(imageByte);
    //     //     // setImageFileURL(FileReader.readAsDataURL(imageByte));
    //     //     document.getElementById("itemPreview").src = "data:image/png;base64," + imageByte;
    //     // }


    //     fileReader.readAsDataURL(imageFile);
    //     fileReader.onload = async function(){
    //         console.log(fileReader.result);
    //         console.log(imageByte===null);
    //         console.log("1");
    //         setImageByte(fileReader.result);
    //         console.log(imageByte===null);
    //         console.log("2");
    //     }
        
        // setImageFileURL(URL.createObjectURL(imageFile));
        
    // }
  }
  useEffect(()=>{
    console.log(imageFile);
    console.log(imageByte);
  })
  function handleChange(event){
    setImageFile(event.target.files[0])
    if(event.target.files[0]!==null){
      let fileReader = new FileReader();
      fileReader.readAsDataURL(event.target.files[0]);
      fileReader.onload = function(){
          setImageByte(fileReader.result);
      }
    }
  }

 
  return (
    <div>
        <form>
            <input type="file" accept='image/PNG' onChange={(e) => {handleChange(e)}}></input>
            <input type="submit" onClick={submitFile}></input>
        </form>
        <img src={imageByte} alt="copie"/>
    </div>
  )
}

export default Test