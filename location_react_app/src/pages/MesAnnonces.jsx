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

  const deleteAnnonce=(id)=>{
    const requestOptions={
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }
    fetch('http://localhost:8080/annonce/delete/'+id, requestOptions)
    .then(response=>{
      if(response.status===200){
        alert("Supprimé avec succès");
        window.location.reload();
      }else{
        alert("Erreur dans la suppression");
      }})
  }

    if(sessionStorage.getItem("token")==null){
        return window.location.replace("/login")
    }
  return (
    <div  className='div_after_header d-flex flex-row justify-content-center'>
      <div className="" style={{backgroundColor:"#D9D9D9", height:"100%", width: "1200px", padding:"40px"}}>
        {!displayModifierAnnonce && !displayNouvelleAnnonce?
          <>
            <button style={{marginLeft:"40px"}} type="button" className="btn btn-secondary" onClick={()=>{
                setdisplayNouvelleAnnonce(true);
              }}>Nouvelle annonce
            </button>

            {/* liste d'annonces */}
            <div  style={{margin:"40px"}}>
              <table className="table table-striped boxshadowing2">
                <tbody>
                <tr>
                  <th>Titre</th>
                  <th>Date de publication</th>
                  <th>État</th>
                  <th></th>
                </tr>
                {listeAnnonces?.map((a,index)=>(
                  <tr key={index}>
                    <td>{a.titre}</td>
                    <td>{new Date(a.dateCreation).toLocaleDateString()}</td>
                    <td >
                    <div style={{display: "flex", alignContent: "stretch", alignItems: "center" }}>
                      Désactivé
                      <label className="switch">
                        <input type="checkbox" disabled={!(a.administrateurIdDesactivateur===null)}defaultChecked={a.status===1} onChange={(e)=>{
                          console.log(e.target.checked);
                          if(e.target.checked){
                            changerAnnonceStatus(e, a.id, 0)
                          }else{
                            changerAnnonceStatus(e, a.id, 1)
                          }
                        }}/>
                        <span className="slider"></span>
                      </label> Activé &nbsp;&nbsp;&nbsp; {a.administrateurIdDesactivateur===null? "" : <span style={{color:"red", fontSize:"0.7em"}}>Desactivé par administrateur</span>}
                    </div>
                    </td>
                    <td>
                      <button className='btn btn-secondary' style={{marginRight:"20px"}} onClick={()=>{
                        setDisplayModifierAnnonce(true);
                        setAnnonceModifier(a.id);
                      }}>Modifier</button>
                      <button className='btn btn-danger' onClick={()=>{
                        deleteAnnonce(a.id);
                      }}>Supprimer</button>
                      
                    </td>

                  </tr>

                ))
                }
                </tbody>
              </table>

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

    </div>
  )
}

export default MesAnnonces