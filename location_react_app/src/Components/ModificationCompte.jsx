import React, {useEffect, useState, useRef} from 'react'
import { useSearchParams } from "react-router-dom";
import {AiFillHome} from 'react-icons/ai'
import {BsPersonSquare} from 'react-icons/bs'

const ModificationCompte = () => {
    const[url]=useSearchParams({});
    const[divPersonne, setDivPersonne]=useState("block")
    const[divAdresse, setDivAdresse]=useState("none")
    const [state, setState]=useState({});
    let mdp=useRef();
    let nmdp=useRef()
    let cnmdp=useRef()
    useState(()=>{
        const requestOptions={
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }
          fetch('http://localhost:8080/compte/'+url.get("id"), requestOptions)
            .then(response => response.json())
            .then(data=>setState(data)
                // {
                // setState({
                //     "nom": data["nom"],
                //     "prenom": data["prenom"],
                //     "courriel":data["courriel"],
                //     "telephone": data["telephone"],
                //     "password": data["password"], 

                //     "numRue":data["numRue"],
                //     "nomRue":data["nomRue"],
                //     "ville":data["ville"],
                //     "province":data["province"],
                //     "codePostal":data["codePostal"]
                // })
                // }
            )
    })
    // useEffect(()=>console.log(state))

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log("trying to submit");
        console.log(state);
        const requestOptions={
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(state)
        }
        fetch('http://localhost:8080/compte/modifier', requestOptions)
            .then(response => {
                if(response.status===200){
                    window.alert("Succès dans les modifications")
                }else{
                    window.alert("Une erreur est sourvenue")
                }
            })
    }

  return (
    <div className='div_after_header d-flex flex-row justify-content-center'>
        <div className='container d-flex py-5' style={{backgroundColor:"#D9D9D9", height:"100%"}}>
            <div className='BarreCategories p-4 py-5'>
                <ul className='list-group'>
                    <li className='list-group-item d-flex' onClick={()=>{
                            setDivAdresse("none");
                            setDivPersonne("block");
                        }}>
                        <div className='d-flex align-items-center p-2'>
                            <BsPersonSquare style={{fontSize:"2em"}}/>
                        </div>
                        <div className='d-flex align-items-center p-2'>
                            Renseignements personnels
                        </div>
                    </li>
                    <li className='list-group-item d-flex' onClick={()=>{
                            setDivAdresse("block");
                            setDivPersonne("none");
                        }}>
                        <div className='d-flex align-items-center p-2'>
                            <AiFillHome  style={{fontSize:"2em"}}/>
                        </div>
                        <div className='d-flex align-items-center p-2'>
                            Adresse
                        </div>
                    </li>
                </ul>
            </div>
            <div style={{width:"100%", display : divPersonne}}>
                <h4 style={{textAlign:"center"}}>Modification du compte - Renseignements personnels</h4>
                <div className='infoPersonne p-2'>
                    <form onSubmit={handleSubmit}>
                    <div className="form-floating m-3">
                        <input type="text" className="form-control" id="floatingPrenom" placeholder="Prenom" required defaultValue={state["prenom"]} onChange={(e)=>{
                            state.prenom=e.target.value;
                            setState(state);
                        }}/>
                        <label htmlFor="floatingPrenom">Prenom</label>
                    </div>
                    <div className="form-floating m-3">
                        <input type="text" className="form-control" id="floatingNom" placeholder="Nom" required defaultValue={state["nom"]} onChange={(e)=>{
                            state.nom=e.target.value;
                            setState(state);
                        }}/>
                        <label htmlFor="floatingNom">Nom</label>
                    </div>
                    <div className="form-floating m-3">
                        <input type="text" className="form-control" id="floatingTelephone" required pattern="[1-9]{10}" placeholder="Telephone" defaultValue={state["telephone"]} onChange={(e)=>{
                            state.telephone= parseInt(e.target.value);
                            setState(state);
                        }}/>
                        <label htmlFor="floatingTelephone">Telephone</label>
                    </div>
                    <div className="form-floating m-3">
                        <input type="email" className="form-control" id="floatingCourriel" required placeholder="Courriel" defaultValue={state["courriel"]} onChange={(e)=>{
                            state.courriel=e.target.value;
                            setState(state);
                        }}/>
                        <label htmlFor="floatingCourriel">Courriel</label>
                    </div>
                    <div className="form-floating m-3">
                        <input type="password" className="form-control" id="floatingMDP" placeholder="Mot de passe" ref={mdp}/>
                        <label htmlFor="floatingMDP">Mot de passe actuel</label>
                        <span style={{color:"red", display:"none"}} id="mdpSpan">*Mot de passe invalide</span>
                    </div>
                    <div className="form-floating m-3">
                        <input type="password" className="form-control" id="floatingMDPN" placeholder="Mot de passe" ref={nmdp}/>
                        <label htmlFor="floatingMDPN">Nouveau mot de passe</label>
                    </div>
                    <div className="form-floating m-3">
                        <input type="password" className="form-control" id="floatingMDPC" placeholder="Mot de passe" ref={cnmdp} />
                        <label htmlFor="floatingMDPC">Confirmation</label>
                        <span style={{color:"red", display:"none"}} id="cmdpSpan">*Confirmation nouveau mot de passe ne correspond pas</span>
                    </div>
                    <div className='row justify-content-center'>
                        <input type="submit" value="Sauvegarder" className='col-2 btn btn-primary ' onClick={(e)=>{
                            console.log(state)
                            if(mdp.current.value!==""){
                                if(mdp.current.value!==state["password"]){
                                    document.getElementById("mdpSpan").style.display="block";
                                    e.preventDefault();
                                }else{
                                    document.getElementById("mdpSpan").style.display="none";
                                    if(nmdp.current.value!=="" && nmdp.current.value===cnmdp.current.value){
                                        document.getElementById("cmdpSpan").style.display="none";
                                        state.password=nmdp.current.value;
                                        setState(state);
                                        mdp.current.value="";
                                        nmdp.current.value="";
                                        cnmdp.current.value="";

                                    }else{
                                        document.getElementById("cmdpSpan").style.display="block";
                                    }
                                }
                            }
                        }}/>&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="submit" value="Annuler" className='col-2 btn btn-danger ' onClick={(e)=>{
                            e.preventDefault();
                            window.location.reload();
                        }} />
                    </div></form>
                </div>
            </div>
            <div style={{width:"100%", display: divAdresse}}>
                    <h4 style={{textAlign:"center"}}>Modification du compte - Adresse</h4>
                <div className='infoAdresse p-2' >
                    <form onSubmit={handleSubmit}>
                        <div className="form-floating m-3">
                            <input type="text" className="form-control" id="floatingNum" placeholder="Numéro de rue" required pattern='^[0-9]*$' defaultValue={state["numRue"]} onChange={(e)=>{
                                state.numRue= parseInt(e.target.value);
                                setState(state);
                            }}/>
                            <label htmlFor="floatingNum">Numéro de rue</label>
                        </div>
                        <div className="form-floating m-3">
                            <input type="text" className="form-control" id="floatingrue" placeholder="Nom de rue" required defaultValue={state["nomRue"]} onChange={(e)=>{
                                state.nomRue=e.target.value;
                                setState(state);
                            }}/>
                            <label htmlFor="floatingrue">Nom de rue</label>
                        </div>
                        <div className="form-floating m-3">
                            <input type="text" className="form-control" id="floatingville" placeholder="Ville" required defaultValue={state["ville"]} onChange={(e)=>{
                                state.ville=e.target.value;
                                setState(state);
                            }}/>
                            <label htmlFor="floatingville">Ville</label>
                        </div>
                        <div className="form-floating m-3">
                            <input type="text" className="form-control" id="floatingprovince" placeholder="Province" required defaultValue={state["province"]} onChange={(e)=>{
                                state.province=e.target.value;
                                setState(state);
                            }}/>
                            <label htmlFor="floatingprovince">Province</label>
                        </div>
                        <div className="form-floating m-3">
                            <input type="text" className="form-control" id="floatingcodePostal" placeholder="Code Postal" required defaultValue={state["codePostal"]} pattern="[a-zA-Z]{1}[1-9]{1}[a-zA-Z]{1}-[1-9]{1}[a-zA-Z]{1}[1-9]{1}" onChange={(e)=>{
                                state.codePostal=e.target.value;
                                setState(state);
                            }}/>
                            <label htmlFor="floatingcodePostal">Code Postal</label>
                        </div>
                        <div className='row justify-content-center'>
                            <input type="submit" value="Sauvegarder" className='col-2 btn btn-primary ' />&nbsp;&nbsp;&nbsp;&nbsp;
                            <input type="submit" value="Annuler" className='col-2 btn btn-danger ' onClick={(e)=>{
                                e.preventDefault();
                                window.location.reload();
                            }} />
                        </div>
                    </form>
                </div>
            </div>

        </div>
    </div>
  )
}

export default ModificationCompte