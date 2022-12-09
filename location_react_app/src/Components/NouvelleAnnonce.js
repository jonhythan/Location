import React from 'react'
import {useState, useEffect, useRef} from 'react';
import logo from '../logo.svg'

const NouvelleAnnonce = () => {
    const [categories, setCategories]= useState([])
    const [etatsOutil, setEtatsOutil]= useState([])
    const [categoriePeriodes, setCategoriePeriodes]= useState([])
    const [choixCategoriePeriode, setChoixCategoriePeriode]= useState(0);
    const [prixCategoriePeriode, setPrixChoixCategoriePeriode]= useState(0.00);
    const [arrayChoixCategoriePeriode, setArrayChoixCategoriePeriode]= useState([]);
    const [imageByte, setImageByte]=useState(null);
    const [formState, setFormState]=useState({
        utilisateurProprietaireId: 1, //changer lorsque l'utilisateur pourra login
        titre : '',
        categorie : '',
        etat: '', 
        description:'',


    })
    const shouldlog = useRef(true);
    const [warning, setWarning] = useState("");
    const [confirmation, setConfirmation] = useState("");
    useEffect(()=>{
        //fetchdata
        if(shouldlog.current){
            shouldlog.current=false;
            
            const requestOptions={
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            }
    
            fetch('http://localhost:8080/categories', requestOptions)
            .then(response => response.json())
            .then(data=>{
                setCategories(data);
                
                fetch('http://localhost:8080/etatsoutils', requestOptions)
                .then(response => response.json())
                .then(data2=>{
                    setEtatsOutil(data2);
                    setFormState({...formState, categorie:data[0].id, etat : data2[0].id})

                    fetch('http://localhost:8080/categorieperiodes', requestOptions)
                    .then(response => response.json())
                    .then(data3=>{
                        setCategoriePeriodes(data3);
                        setChoixCategoriePeriode(data3[0].id)
                    });
                });
            });
            
            
        }
    })

    function imageChange(event){
        if(event.target.files[0]!==null){
          let fileReader = new FileReader();
          fileReader.readAsDataURL(event.target.files[0]);
          fileReader.onload = function(){
              setImageByte(fileReader.result);
          }
        }
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(arrayChoixCategoriePeriode.length===0){
            setWarning("Vous devez choisir au moins une fourchette de prix");
        }else{
            setWarning("");
            const requestOptions={
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    "listeDetail":arrayChoixCategoriePeriode,
                    "annonce":{
                        "utilisateurProprietaireId": formState.utilisateurProprietaireId,
                        "categorieId": formState.categorie,
                        "etatOutilId": formState.etat,
                        "titre": formState.titre,
                        "description":formState.description,
                        "image": imageByte
                    }                
                })
            }
            console.log(requestOptions)
            fetch('http://localhost:8080/annonce/insert', requestOptions)
            .then(response => response.text())
            .then((data)=>{
                if(data==="ENREGISTRÉ"){
                    console.log(data);
                    setConfirmation("Annonce créé avec succès")
                    setTimeout(() => {
                        window.location.replace("/");
                    }, 1000);
                }else{
                    console.log(data);
                    setConfirmation("Une erreur est sourvenue, veuillez réessayer");
                }
                });
        }

    }

  return (
    <div><form onSubmit={handleSubmit}>
        <img src={logo} alt="Logo" style={{marginTop: '3.5rem'}}/>
        <div className=''>
            <div className='div-after-header'>
                <div className='container container-nouvelle-annonce '>
                    <h4 className='text-center text-secondary'>Nouvelle annonce</h4>
                    <div className='row px-5 p-3'>
                        <div className='col-1'>Titre : </div>
                        <input type="text" className='col-11' onChange={e=>setFormState({...formState, titre : e.target.value})} required></input>
                    </div>
                    <div className='row px-5 p-3'>
                        <div className='col-3'>
                            <label >Catégorie : </label>
                            <span className='px-3'>
                                <select onChange={e=>setFormState({...formState, categorie : parseInt(e.target.value)})} required>
                                    {categories.map((c)=>(<option value={c.id} key={c.id}>{c.nom}</option>))}
                                </select>
                            </span>
                        </div>
                        <div className='col-3'>
                            <label>État:</label>
                            <span className='px-3'>
                                <select onChange={e=>setFormState({...formState, etat : parseInt(e.target.value)})} required>
                                    {etatsOutil.map((etat)=>(<option value={etat.id} key={etat.id}>{etat.titre}</option>))}
                                </select>
                            </span>
                        </div>
                    </div>
                    <div className='row px-5 p-3'>
                        <label className='col-1' >Image :</label>
                        <input type="file"  accept="image/PNG" onChange={(e) => {imageChange(e)}} className='col-3' required></input>
                    </div>
                    <div className='row px-5 p-3'>
                        <div className='col-1'></div>
                        <img src={imageByte} className='col-2' alt="choix"></img>
                    </div>
                    <div className='row px-5 p-3'>
                        <label className='col-2'>Description :</label>
                        <textarea className='col' onChange={e=> {setFormState({...formState, description: e.target.value})}} required></textarea>                        
                    </div>
                    <div className='row px-5 p-3'>
                        <label className='col-1'>Prix :</label>
                        <div className='col'>
                            {/* prix */}
                            <input type="number" step="0.01" placeholder='$' min={0} onChange={e=>{setPrixChoixCategoriePeriode(parseFloat(e.target.value))}}/>
                            <span>$&nbsp;\&nbsp;</span>
                            <select onChange={e=>{setChoixCategoriePeriode(parseInt(e.target.value))}}>
                                {categoriePeriodes.map((cp)=>(<option value={cp.id} key={cp.id}>{cp.titre}</option>))}
                            </select>&nbsp;
                            <button className='btn btn-light' onClick={(e)=>{
                                e.preventDefault();
                                setWarning("");
                                setArrayChoixCategoriePeriode([...arrayChoixCategoriePeriode.filter(choix=>choix.id!==choixCategoriePeriode), {id: choixCategoriePeriode, prix: prixCategoriePeriode}])
                                }}>
                                    Ajouter</button> <br/>
                            <span className='text-danger'>{warning}</span>
                        </div>
                        <div className='col'>
                            Mes choix:
                            <ul className="list-group">
                                {arrayChoixCategoriePeriode.map((c)=>
                                    (<li className="list-group-item" key={c.id}>{c.prix.toFixed(2)} $ / {categoriePeriodes.filter(cat=>cat.id===c.id)[0].titre}</li>)
                                )}
                            </ul>
                        </div>
                        

                    </div>
                    <div className="row px-5 p-3 justify-content-center">
                        <input type="submit" value="Sauvegarder" className='col-2 btn btn-primary ' />&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="submit" value="Annuler" className='col-2 btn btn-danger ' onClick={(e)=>{
                            e.preventDefault();
                            window.location.reload();
                        }} />
                    </div>  
                    <div className="row px-5 p-3 justify-content-center">
                        <h4>{confirmation}</h4>
                    </div>
                </div>
            </div>
        </div></form>
    </div>
  )
}

export default NouvelleAnnonce