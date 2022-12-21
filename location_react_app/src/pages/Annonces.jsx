import React, { useEffect, useState } from 'react'
import BarreCategories from '../Components/Navigation/BarreCategories'
import { AiFillStar } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Annonces = ({word}) => {
  const [mot, setMot]=useState(word)
  const [listeAnnonces, setListeAnnonces]=useState(()=>{
    const requestOptions={
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
    fetch('http://localhost:8080/annonces/public', requestOptions)
        .then(response => response.json())
        .then(data=> setListeAnnonces(data))

  })  
  const noteFunction=(e)=>{
    let note = 0;
    e?.map(e=>note=note + e.note)
    if(!isNaN(note)&&e.length>0) return (note/e?.length).toFixed(1);
    else return 0;
  }
  

  const searchAnnoncesParMot=(recherche)=>{
    const requestOptions={
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
    fetch('http://localhost:8080/annonce/search?search='+recherche, requestOptions)
        .then(response => response.json())
        .then(data=> {
          setListeAnnonces(data);
        })
  }
  useEffect(()=>{
    setMot(word);
    searchAnnoncesParMot(word);
    console.log(word)

  },[word])
  return (
    <div className='div_after_header d-flex flex-row justify-content-center div_une_annonce'>
      <div style={{backgroundColor:"#D9D9D9", minWidth: "70vw"}}>
        <div className='d-flex flex-row '>
          <BarreCategories setListeAnnonces={setListeAnnonces}/>   
          <div className='container p-4'>
            {word===''?'':"Résultats de la recherche \""+word+"\"..."}
            <div className='row row-cols-4 '>
              {listeAnnonces?.map((e, index)=>(
                <Link key={index} to={"/annonce?id="+e.id} style={{textDecoration:"none", color:"black"}}>
                <div  className="col py-1 boxshadowing2 d-flex flex-column align-items-center justify-content-between barre-navigation-element" style={{height:"100%"}}>
                  <img src={e.image} alt="outil" style={{width:"80%"}}/>
                  <h6>{e.titre}</h6>
                  <div>
                    <AiFillStar style={{marginBottom:"2px", fontSize:"1.5em", color:"black"}}/>
                    {noteFunction(e.evaluations)}
                  </div>
                </div>
                </Link>
              ))}

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Annonces