import React, { useEffect, useState } from 'react'
import ModificationAnnonce from '../Components/ModificationAnnonce';
import NouvelleAnnonce from '../Components/NouvelleAnnonce';
import Test2 from '../Components/Test2';
import getUserId from '../Fonctions/getUserId';

const MesAnnonces = () => {
  var flag = false;
  const[displayModifierAnnonce, setDisplayModifierAnnonce]=useState(false)
  const[displayNouvelleAnnonce, setdisplayNouvelleAnnonce]=useState(false)
  const[userId]=useState(getUserId())
  const[loading, setLoading]=useState(true);
  const[listeAnnonces, setListeAnnonces]=useState();
  const[annonceModifier, setAnnonceModifier]=useState();
  const [checked, setStatus] = useState(undefined); 
  async function fetchAnnonces(){
      const requestOptions={
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
      setListeAnnonces( await fetch('http://localhost:8080/annonce/getByUser/'+userId, requestOptions)
          .then(response => response.json())
          .then(data=> {return data}))
      
      setLoading(false);
  }
  const changerAnnonceStatus = (event, annonceId,status) => {
    //event.preventDefault();

    const requestOptions = 
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      };
    flag = flag===undefined ? status === 1 : flag;  
    if (!flag) {
      const url = 'http://localhost:8080/annonce/' + annonceId + '/enable';      
      fetch(url, requestOptions)
        .then(response => {
            if(response.status===200){
                setStatus(true);
                window.alert("L'annonce a été activé");
                window.location.reload(false);
            }else{
                setStatus(checked);
                window.alert("Une erreur est sourvenue");
            }
        });      
  }

  if (flag) {
    const url = 'http://localhost:8080/annonce/' + annonceId + '/disable';
    fetch(url, requestOptions)
      .then(response => {
          if(response.status===200){
             setStatus(false);
              window.alert("L'annonce a été desactivé");
              window.location.reload(false);
          }else{
              window.alert("Une erreur est sourvenue")
          }
      });  
  }
  }
  useEffect(()=>{
    if(loading){
      fetchAnnonces();
    }
    flag = checked;
    console.log(listeAnnonces);
  })

    if(sessionStorage.getItem("token")==null){
        return window.location.replace("/login")
    }
  return (
    <div  className='div_after_header d-flex flex-row justify-content-center'>
        {!displayModifierAnnonce && !displayNouvelleAnnonce?
          <>
            <button type="button" className="btn btn-secondary" onClick={()=>{
                setdisplayNouvelleAnnonce(true);
              }}>Nouvelle annonce
            </button>

            {/* liste d'annonces */}
            <div>
              <ul>
                {listeAnnonces?.map(a=>{
                  return <li key={a.id}>{a.titre} <button onClick={()=>{
                    setDisplayModifierAnnonce(true);
                    setAnnonceModifier(a.id);
                  }}>Modifier</button> <input type="checkbox" onChange={(event) => {
                    setAnnonceModifier(a.id);
                    changerAnnonceStatus(event, a.id, a.status);}} checked={checked===undefined ? a.status===1 : checked} data-toggle="toggle" ></input></li>
                  
                })}
              </ul>
            </div>
          </> 
          : displayModifierAnnonce?
          <>
            <ModificationAnnonce idAnnonce={annonceModifier} setDisplayModifierAnnonce={setDisplayModifierAnnonce}/>
          </>
          :
          <>
            <NouvelleAnnonce setdisplayNouvelleAnnonce={setdisplayNouvelleAnnonce} userId={userId}/>
          </>
        }

    </div>
  )
}

export default MesAnnonces