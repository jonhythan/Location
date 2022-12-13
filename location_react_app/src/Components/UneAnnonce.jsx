import React, { useEffect , useState} from 'react'
import { useSearchParams } from "react-router-dom";
import BarreCategories from "./Navigation/BarreCategories"
import { AiFillStar } from 'react-icons/ai';
import Evaluation from './Evaluation';


const UneAnnonce = () => {
    const [idMembreLoggedIn, setIdMembreLoggedIn]=useState(1) //plus tard on va aller le chercher dans la session.
    const [searchParams] = useSearchParams({});
    const [titre, setTitre]= useState("");
    const [image, setImage]= useState();
    const [periodes, setPeriodes]=useState([]);
    const [description, setDescription]=useState("");
    const [adresse, setAdresse]=useState("");
    const [note, setNote]=useState(0);
    const [commentaires, setCommentaires]=useState([]);
    const [peutCommenter, setPeutCommenter]=useState(false);
    const [divEvaluation, setDivEvaluation]=useState("none");
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
              // console.log(data["evaluations"])
              // console.log(n);
              if(!isNaN(n)&&data["evaluations"].length>0) return (n/data["evaluations"].length).toFixed(1);
              else return 0;
            })
            setCommentaires(data["evaluations"]);
            setPeutCommenter(()=>{
              var commentateursId =  data["evaluations"].map(e=>e.membreId)
              console.log(!commentateursId.includes(idMembreLoggedIn))
              return (!commentateursId.includes(idMembreLoggedIn))
            })
          });
    })
   
    useEffect(()=>
    {

    })

  return (
    <div className='div_after_header d-flex flex-row justify-content-center div_une_annonce'>
      <div style={{backgroundColor:"#D9D9D9"}}>
        <div className='d-flex flex-row '>
          <BarreCategories/>   
          <div className='div_contenu_annonce container p-4'>
            <div className='row'>
              <div className='col d-flex flex-column justify-content-center align-items-center'>
                <h4>{titre}</h4>
                <img src={image} alt="annonce"/>
                <div style={{paddingBottom:"20px"}}>
                  <AiFillStar style={{marginBottom:"2px", fontSize:"1.5em", color:"gold"}}/>
                  &nbsp;
                  {note}
                  &nbsp;
                  ({commentaires.length} reviews)
                  &nbsp;
                  {peutCommenter ? <a href='.' onClick={(e)=>{
                    e.preventDefault();
                    setDivEvaluation("flex")}}>Laisser un commentaire</a> : "Vous avez soumis un commentaire"}
                </div>
                <ul className="list-group">
                  {periodes.map((p)=>(
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
                  <textarea className="form-control" placeholder="Leave a comment here" style={{height: "100px"}}></textarea>
                  <label >Mon message</label>
                </div>
                <div className='d-flex justify-content-end'>
                  <button type="button" className="btn btn-secondary ">Envoyer</button>
                </div>
                <div className='d-flex flex-row flex-grow-1 justify-content-end' style={{}}>
                  <button type="button" className="btn btn-outline-danger align-self-end">
                    <i className="bi bi-flag-fill"></i>
                    &nbsp;Signaler
                  </button>
                  
                </div>
              </div>
            </div>
            <div className='row' style={{marginTop: "20px"}}>
              hi
            </div>
          </div>

        </div>
                    {divEvaluation}
      </div>
      <Evaluation d={divEvaluation} membreId={idMembreLoggedIn} annonceId={idAnnonce}/>
      
    </div>
    
  )
}

export default UneAnnonce