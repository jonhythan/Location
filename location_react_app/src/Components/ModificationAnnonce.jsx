import React, {useState, useRef, useEffect} from 'react'
import { useSearchParams } from "react-router-dom";

const ModificationAnnonce = () => {
    const[url]=useSearchParams({});
    const [membreLoggedIn]=useState(1); //à modifier quand le login sera fait
    const[annonce, setAnnonce]=useState({});
    const[categories, setCategories]=useState([]);
    const[etatsOutil, setEtatsOutil]=useState([]);
    let inputPriceRef=useRef();
    let inputCategorieRef=useRef();
    const [categoriePeriodes, setCategoriePeriodes]= useState([])
    useState(()=>{
        const requestOptions={
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }
        fetch('http://localhost:8080/annonce/'+url.get("id"), requestOptions)
            .then(response => response.json())
            .then(data=>setAnnonce(data))
        fetch('http://localhost:8080/categories', requestOptions)
            .then(response => response.json())
            .then(data=>setCategories(data))
        fetch('http://localhost:8080/etatsoutils', requestOptions)
            .then(response => response.json())
            .then(data=>setEtatsOutil(data));       
        fetch('http://localhost:8080/categorieperiodes', requestOptions)
            .then(response => response.json())
            .then(data=>setCategoriePeriodes(data));         
    })

    const handleSubmit=(e)=>{
        e.preventDefault();
        
        console.log(annonce)
    }

    useEffect(()=>{
        console.log(annonce);
    })
  return (
    <div className='div_after_header'>
        <form onSubmit={handleSubmit}>
            <div className='div_nouvelle_annonce'>
                <div className='container container-nouvelle-annonce boxshadowing1'>
                    <h4 className='text-center'>Modification d'annonce</h4>
                    <div className='row px-5 p-3'>
                        <div className='col-1'>Titre : </div>
                        <input type="text" className='col-11' onChange={(e)=>{
                            annonce.titre=e.target.value;
                            setAnnonce(annonce) ;}} defaultValue={annonce.titre} required></input>
                    </div>
                    <div className='row px-5 p-3'>
                        <div className='col-3'>
                            <label >Catégorie : </label>
                            <span className='px-3'>
                                <select value={annonce.categorieId} onChange={e=>{
                                    annonce.categorieId = parseInt(e.target.value);
                                    setAnnonce(annonce);
                                }} required>
                                    {categories?.map((c)=>(<option value={c.id} key={c.id}>{c.nom}</option>))}
                                </select>
                            </span>
                        </div>
                        <div className='col-3'>
                            <label>État:</label>
                            <span className='px-3'>
                                <select value={annonce.etatOutilId} onChange={e=>{
                                    annonce.etatOutilId=parseInt(e.target.value);
                                    setAnnonce(annonce);
                                }} required>
                                    {etatsOutil.map((etat)=>(<option value={etat.id} key={etat.id}>{etat.titre}</option>))}
                                </select>
                            </span>
                        </div>
                    </div>
                    <div className='row px-5 p-3'>
                        <label className='col-1' >Image :</label>
                        <img src={annonce.image} className='col-2' alt="choix"></img>
                        <label htmlFor="inputChangerImage" className='col-2' style={{cursor:"pointer", color:"blue", textDecoration:"underline"}}>Changer image</label>
                        <input type="file" id='inputChangerImage' accept="image/PNG"  className='col-3' required style={{display:"none"}} onChange={(e)=>{
                            if(e.target.files[0]!==null){
                                let fileReader = new FileReader();
                                fileReader.readAsDataURL(e.target.files[0]);
                                fileReader.onload = function(){
                                    setAnnonce({...annonce, "image":fileReader.result});
                                }
                              }
                        }}></input>
                    </div>
                    <div className='row px-5 p-3'>
                        <label className='col-1' style={{fontSize:"0.85em"}}>Description :</label>
                        <textarea className='col' rows={10} defaultValue={annonce.description} onChange={e=> {setAnnonce({...annonce, description: e.target.value})}} required></textarea>                        
                    </div>
                    <div className='row px-5 p-3'>
                        <label className='col-1'>Prix :</label>
                        
                        <div className='col'>
                            Mes choix : <span style={{cursor:"pointer", color:"blue", textDecoration:"underline"}} onClick={()=>{
                                setAnnonce({...annonce, details:[]})
                            }}>Supprimer tout</span>
                            <ul className="list-group">
                                {annonce.details?.map((c, index)=>
                                    (<li   key={index} className="list-group-item">{c.prix.toFixed(2)} $ / {(categoriePeriodes.filter(x=>x.id===c.categoriePeriodeId)[0])?.titre}</li>)
                                )}
                            </ul>
                        </div>
                        <div className='col'>
                            {/* prix */}
                            <input type="number" step="0.01" placeholder='$' min={0} ref={inputPriceRef} defaultValue={0}/>
                            <span>$&nbsp;\&nbsp;</span>
                            <select ref={inputCategorieRef}>
                                {categoriePeriodes.map((cp)=>(<option value={cp.id} key={cp.id}>{cp.titre}</option>))}
                            </select>&nbsp;
                            <button className='btn btn-light' onClick={(e)=>{
                                e.preventDefault();
                                let prix = parseFloat(inputPriceRef.current.value);
                                let catPeriodeId= parseInt(inputCategorieRef.current.value);
                                setAnnonce({...annonce, details:[...annonce.details.filter(x=>x.categoriePeriodeId!==catPeriodeId), {categoriePeriodeId: catPeriodeId, prix: prix} ]})
                                // setArrayChoixCategoriePeriode([...arrayChoixCategoriePeriode.filter(choix=>choix.id!==choixCategoriePeriode), {id: choixCategoriePeriode, prix: prixCategoriePeriode}])
                                }}>
                                    Ajouter</button> <br/>
                        </div>                     
                    </div>
                    <div className="row px-5 p-3 justify-content-center">
                        <input type="submit" value="Sauvegarder" className='col-2 btn btn-primary ' />&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="submit" value="Annuler" className='col-2 btn btn-danger ' onClick={(e)=>{
                            e.preventDefault();
                            window.location.replace("/");
                        }} />
                    </div>
                </div>
            </div>
        </form>
    </div>
  )
}

export default ModificationAnnonce