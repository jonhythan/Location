import React, { useEffect , useState} from 'react'
import { useSearchParams } from "react-router-dom";
import BarreCategories from "./Navigation/BarreCategories"

const UneAnnonce = () => {
    const [searchParams] = useSearchParams({});
    const [titre, setTitre]= useState("");
    const [image, setImage]= useState();
    const [periodes, setPeriodes]=useState([]);
    const [description, setDescription]=useState("");
    const [adresse, setAdresse]=useState("");
    const [annonce, setAnnonce]= useState(()=>{
      const requestOptions={
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        
        }
        fetch('http://localhost:8080/annonce/'+searchParams.get("id"), requestOptions)
        .then(response => response.json())
        .then(data=>{
            setAnnonce(data);
            setTitre(data["titre"]);
            setImage(data["image"]);
            setPeriodes(data["details"])
            setDescription(data["description"]);
            var utilisateur = data["utilisateurProprietaire"]["utilisateur"];
            setAdresse(utilisateur["numRue"]+" "+utilisateur["nomRue"]+", "+utilisateur["ville"]+", "+utilisateur["province"]+" "+utilisateur["codePostal"]);
          });
    })
    const divStyle = {
      height: "100px",
    };

    useEffect(()=>
    {
      
        
      
      console.log(annonce)
    })
  return (
    <div className='div_after_header d-flex flex-row justify-content-center div_une_annonce'>
      <div className='d-flex flex-row '>
        <BarreCategories/>   
        <div className='div_contenu_annonce container'>
          <div className='row'>
            <div className='col d-flex flex-column justify-content-center align-items-center'>
              <h4>{titre}</h4>
              <img src={image} alt="annonce"/>
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
              <span><i className="bi bi-pin-map"></i> &nbsp;&nbsp;<b>{adresse}</b></span><br></br><br></br>
              <div class="form-floating">
                <textarea className="form-control" placeholder="Leave a comment here" style={{height: "100px"}}></textarea>
                <label for="floatingTextarea2">Mon message</label>
              </div>
              <div className='d-flex justify-content-end'>
                <button type="button" class="btn btn-secondary ">Envoyer</button>
              </div>
              <div className='d-flex flex-row flex-grow-1 justify-content-end' style={{}}>
                <button type="button" class="btn btn-outline-danger align-self-end">
                  <i class="bi bi-flag-fill"></i>
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
      
    </div>
    
  )
}

export default UneAnnonce