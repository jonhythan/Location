import React, { useEffect, useState } from 'react'
import {groupBy} from "core-js/actual/array/group-by";
import getUserId from '../Fonctions/getUserId';
import {BsPersonCircle} from "react-icons/bs"
const Messages = () => {
  const [usersInteractedWith, setUsersInteractedWith] = useState()
  const [prenomsMessage, setPrenomsMessage]=useState([]);
  const [isLoading]=useState(true);
  const [messagesAfiche, setMessagesAffiche]=useState();
  const [annonceAfficher, setAnnonceAfficher]=useState();
  useState(()=>{
    const requestOptions={
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }}
    fetch('http://localhost:8080/messages/usersinteracted/'+getUserId(), requestOptions) //changer le userapres
      .then(response => {
          if(response.status===200){
              return response.json();
          }else{
              window.alert("Une erreur est sourvenue")
          }
      }).then(data=> {setUsersInteractedWith(data);
        let requestOptions={
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        }
        fetch('http://localhost:8080/utilisateur/prenoms', requestOptions) 
        .then(response => {
          if(response.status===200){
              return response.json();
          }else{
              window.alert("Une erreur est sourvenue")
          }
        }).then(data=>{setPrenomsMessage(data); console.log(data)})
        
      });
  })
  
  const fetchAnnonce=(idAnnonce)=>{
    const requestOptions={
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    
    }
    fetch('http://localhost:8080/annonce/'+idAnnonce, requestOptions)
    .then(response => response.json())
    .then(data=>setAnnonceAfficher(data))
  }

  const fetchMessages=(uId)=>{
    const requestOptions={
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }}
    fetch('http://localhost:8080/messages/interactions/'+getUserId()+'/'+uId, requestOptions) 
      .then(response => {
          if(response.status===200){
              return response.json();
          }else{
              window.alert("Une erreur est sourvenue")
          }
      }).then(data=> {
        setMessagesAffiche(data); 
        console.log(data);
      });
  }
  useEffect(() => {
    let scroll_to_bottom = document.getElementById('msgDiv');
		scroll_to_bottom.scrollTop = scroll_to_bottom.scrollHeight;
    console.log("rendering")
  });

  const getRandomColor=(index)=>{
    const colors = ["DC4444","AD64C5", "A20A0A", "028090", "F69E7B", "393E46", "E45826", "FC5185", "6F38C5"];

    return "#"+colors[colors.length%index];
  }

  if(getUserId()==null){
    alert("Connectez-vous")
    return window.location.replace('/')
  } 
  return (
    <div className='div_after_header d-flex flex-row justify-content-center' style={{height:"85%"}}>
      <div className="" style={{backgroundColor:"#D9D9D9", height:"100%", minWidth: "75%", width: "1400px"}}>
        <div className="row" style={{height:"90%"}}>
          <div className='col-3 boxshadowing1 ' style={{margin:"30px 5px 30px 30px", backgroundColor:"white" ,height:"100%", padding:"0px 5px"}}>
            <h5 className=''>Messages</h5>
            <div className='list-group '>
              {usersInteractedWith?.map((u,index)=>
                {
                  return (
                  <div key={index} className='list-group-item d-flex barre-navigation-element' style={{textTransform:"capitalize"}}
                  onClick={()=>fetchMessages(u)} ><BsPersonCircle style={{marginTop:"4px", color:getRandomColor(index)}}/> {prenomsMessage[index]?.toLowerCase()}</div>
                  )
                }
              )}
            </div>
          </div>
          <div className='col-4 boxshadowing1' style={{margin:"30px 5px 30px 5px", backgroundColor:"white", height:"100%"}}>
            <h5 style={{position:"sticky", top:"0px", zIndex:"3"}}>Info personne</h5>
            <div id='msgDiv' style={{height:"80%", overflowY:"scroll"}}>
              {messagesAfiche?.map((e,index)=>{
                if(e.expediteurId===getUserId()){
                  return <div className="d-flex justify-content-end  " key={index}>
                    <span className='message-box1' key={index}>
                      {e.contenu?.split("&&").length>1?<> <span style={{cursor:"pointer", color:"blue", textDecoration:"underline"}} onClick={
                        ()=>{
                          console.log("clicnkg")
                          fetchAnnonce(e.contenu.split("&&")[0].split("=")[1])
                        }
                      }>Voir annonce</span> {e.contenu.split("&&")[1]} </> : e.contenu}
                    </span></div>
                }else{
                  return <div className="d-flex justify-content-start" style={{marginRight:"auto"}} key={index}>
                    <span className='message-box2'>{e.contenu?.split("&&").length>1?<> <span style={{cursor:"pointer", color:"blue", textDecoration:"underline"}} onClick={
                        ()=>{
                          console.log("clicnkg")
                          fetchAnnonce(e.contenu.split("&&")[0].split("=")[1])
                        }
                      }>Voir annonce</span> {e.contenu.split("&&")[1]} </> : e.contenu}</span></div>
                }
              })}
            </div>
            <div style={{position:"sticky", bottom:"20px", zIndex:"3", marginBottom:"20px"}}>
              Boite de message
            </div>
          </div>
          <div className='col boxshadowing1' style={{margin:"30px 30px 30px 5px", backgroundColor:"white" ,height:"100%"}}>
            <h5 >Annonce</h5>
            <div className='d-flex flex-column align-items-center'>
            {annonceAfficher?
              <>
                <img src={annonceAfficher["image"]} alt="annonce" style={{width:"60%"}} className="boxshadowing2"/>
                <h4>{annonceAfficher["titre"]}</h4>
                <p>{annonceAfficher["description"]}</p>
                <ul className="list-group">
                  {annonceAfficher["details"]?.map((p)=>(
                    <li className="list-group-item" key={p["categoriePeriodeId"]}>{p["prix"].toFixed(2)} $ / {p["categoriePeriodes"]["titre"]}</li>))}
                </ul>
              </>
            :"no"}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Messages