import React, { useEffect , useState, useRef} from 'react'
import { useSearchParams } from "react-router-dom";
import BarreCategories from "./Navigation/BarreCategories"
import { AiFillStar } from 'react-icons/ai';
import Evaluation from './Evaluation';
import {IoPersonCircleOutline} from "react-icons/io5"
import NouveauSignalement from './NouveauSignalement';
import getUserId from '../Fonctions/getUserId';


const UneAnnonce = () => {
    const [idMembreLoggedIn]=useState(()=>{
      if(getUserId()===null) return 0;
      return getUserId();
    }) 
    const [peutSignaler]=useState(()=>{
      if(idMembreLoggedIn!==0) return true;
      return false;
    })
    const [searchParams] = useSearchParams({}); //plustard à passer en param
    const [message, setMessage]=useState("");
    const [titre, setTitre]= useState("");
    const [image, setImage]= useState();
    const [periodes, setPeriodes]=useState([]);
    const [description, setDescription]=useState("");
    const [adresse, setAdresse]=useState("");
    const [note, setNote]=useState(0);
    const [peutCommenter, setPeutCommenter]=useState(false);
    const [evaluations, setEvaluations] = useState(()=>{
      const requestOptions={
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
      fetch('http://localhost:8080/evaluation/'+searchParams.get("id"), requestOptions)
        .then(response => response.json())
        .then(data=>{setEvaluations(data)})
    });
    const [divEvaluation, setDivEvaluation]=useState("none");
    const [divSignalement, setDivSignalement]=useState("none");
    const [idAnnonce, setIdAnnonce]=useState(0);
    const [annonce, setAnnonce]= useState(()=>{
      const requestOptions={
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        
        }
        fetch('http://localhost:8080/annonce/'+searchParams.get("id"), requestOptions)
        .then(response => response.json())
        .then(data=>{
            setIdAnnonce(data["id"]);
            setAnnonce(data);
            setTitre(data["titre"]);
            setImage(data["image"]);
            setPeriodes(data["details"])
            setDescription(data["description"]);
            var utilisateur = data["utilisateurProprietaire"]["utilisateur"];
            setAdresse(utilisateur["numRue"]+" "+utilisateur["nomRue"]+", "+utilisateur["ville"]+", "+utilisateur["province"]+" "+utilisateur["codePostal"]);
            setNote(()=>{
              var n=0;
              data["evaluations"].map(e=>n+=e.note)
              if(!isNaN(n)&&data["evaluations"].length>0) return (n/data["evaluations"].length).toFixed(1);
              else return 0;
            })
            setPeutCommenter(()=>{
              var commentateursId =  data["evaluations"].map(e=>e.membreId)
              return (!commentateursId.includes(idMembreLoggedIn))
            })
          });
    })
   
    useEffect(()=>
    {
      // console.log(message);
    })

    //ref pour vider la boite message
    let messageRef = useRef();
    const sendMessage= ()=>{
      if(getUserId()===null) return alert("Vous devez vous connecter pour envoyer un message");
      if(message!==""){
        const requestOptions={
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            "contenu": "idAnnonce="+annonce["id"]+"&&"+message,
            "expediteurId": idMembreLoggedIn,
            "recepteurId": annonce["utilisateurProprietaireId"]
           })
        
        }
        fetch('http://localhost:8080/message/insert', requestOptions)
        .then(response => {if(response.status===200){
              window.alert("message envoyé");
            }else{
              window.alert("Erreur");
            }}
          )
        messageRef.current.value="";
      }else{
        window.alert("Entrez votre message");
      }

    }

  return (
    <div className='div_after_header d-flex flex-row justify-content-center div_une_annonce'>
      <div style={{backgroundColor:"#D9D9D9"}}>
        <div className='d-flex flex-row '>
          <BarreCategories/>   
          <div className='div_contenu_annonce container p-4'>
            <div className='row boxshadowing1'>
              <div className='col d-flex flex-column justify-content-center align-items-center'>
                <h4>{titre}</h4>
                <img src={image} alt="annonce" style={{width:"100%"}}/>
                <div style={{paddingBottom:"20px"}}>
                  <AiFillStar style={{marginBottom:"2px", fontSize:"1.5em", color:"gold"}}/>
                  &nbsp;
                  {note}
                  &nbsp;
                  ({evaluations?.length} reviews)
                  &nbsp;
                  {peutCommenter&&idMembreLoggedIn!==0? <a href='.' onClick={(e)=>{
                    e.preventDefault();
                    setDivEvaluation("flex")}}>Laisser un commentaire</a> : (idMembreLoggedIn!==0? "Vous avez soumis un commentaire" : "Connectez-vous pour laisser un commentaire")}
                </div>
                <ul className="list-group">
                  {periodes?.map((p)=>(
                    <li className="list-group-item" key={p["categoriePeriodeId"]}>{p["prix"].toFixed(2)} $ / {p["categoriePeriodes"]["titre"]}</li>))}
                </ul>
              </div>
              <div className='col d-flex flex-column'>
                Description
                <p>
                  {description}
                </p>
                <br></br>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pin-map" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8l3-4z"/>
                    <path fillRule="evenodd" d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z"/>
                  </svg>
                   &nbsp;&nbsp;<b>{adresse}</b></span><br></br><br></br>
                <div className="form-floating">
                  <textarea ref={messageRef} className="form-control" placeholder="Leave a comment here" style={{height: "100px"}} required onChange={(e)=>setMessage(e.target.value)}></textarea>
                  <label >Mon message</label>
                </div>
                <div className='d-flex justify-content-end'>
                  <button type="button" className="btn btn-secondary" onClick={()=>sendMessage()}>Envoyer</button>
                </div>
                <div className='d-flex flex-row flex-grow-1 justify-content-end' style={{}}>
                  <button type="button" className="btn btn-outline-danger align-self-end" onClick={(e)=>{
                    e.preventDefault();
                    if(!peutSignaler) alert("Connectez-vous");
                    else{
                      setDivSignalement("block");
                    }
                  }}>
                    <i className="bi bi-flag-fill"></i>
                    &nbsp;Signaler
                  </button>
                  
                </div>
              </div>
            </div>
            <div className='row boxshadowing1' style={{marginTop: "20px"}}>
              <h5>Commentaires</h5>
              <div>
                {evaluations?.length>0 ? evaluations?.map((c)=>{
                  return(
                  <div key={c["membreId"]} className="d-flex"  style={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", marginBottom:"10px"}}>
                    <div className='d-flex flex-column align-items-center flex-shrink' style={{width:"150px"}}>
                      <IoPersonCircleOutline style={{fontSize: "3em"}} />
                      <div>{c["nom"]}</div>
                    </div>
                    <div>
                      <div>
                        {new Array(c["note"]).fill(null).map((item, index)=> <AiFillStar key={index}/>)} {c["note"]}/10
                      </div>
                      <div>
                        {c["commentaire"]}
                      </div>
                      <div style={{fontSize:"0.8em"}}>
                        {c["dateEvaluation"]}
                      </div>
                    </div>
                  </div>
                )}):"Aucun commentaire"}
              </div>

            </div>
          </div>

        </div>
      </div>
      <Evaluation d={divEvaluation} membreId={idMembreLoggedIn} annonceId={idAnnonce}/>
      <NouveauSignalement displaying={divSignalement} idAnnonce={searchParams.get("id")}/>
    </div>
    
  )
}

export default UneAnnonce