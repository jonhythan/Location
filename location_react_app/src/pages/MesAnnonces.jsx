import React, { useEffect, useState } from 'react'
import ModificationAnnonce from '../Components/ModificationAnnonce';
import NouvelleAnnonce from '../Components/NouvelleAnnonce';
import Test2 from '../Components/Test2';
import getUserId from '../Fonctions/getUserId';

const MesAnnonces = () => {
  const[displayModifierAnnonce, setDisplayModifierAnnonce]=useState(false)
  const[displayNouvelleAnnonce, setdisplayNouvelleAnnonce]=useState(false)
  const[userId]=useState(getUserId())
  const[loading, setLoading]=useState(true);
  const[listeAnnonces, setListeAnnonces]=useState();
  const[annonceModifier, setAnnonceModifier]=useState();
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

  useEffect(()=>{
    if(loading){
      fetchAnnonces();
    }
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
                  return <li key={a.id} onClick={()=>{
                    setDisplayModifierAnnonce(true);
                    setAnnonceModifier(a.id);
                  }}>{a.titre}</li>
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