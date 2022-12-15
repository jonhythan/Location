import {useState} from 'react'
import logo from '../logo.svg'


const NouveauCompte = ()=>{
    const [prenom, setPrenom]=useState("");
    const [nom, setNom]=useState("");
    const [telephone, setTelephone]=useState("");
    const [courriel, setCourriel]=useState("");
    const [mdp, setMdp]=useState("");
    const [cmdp, setCmdp]=useState("");
    const [numRue, setNumRue]=useState("");
    const [nomRue, setNomRue]=useState("");
    const [ville, setVille]=useState("");
    const [province, setProvince]=useState("");
    const [codePostal, setCodePostal]=useState("");
    const [confirmation, setConfirmation]= useState("");
    const [match, setMatch]= useState("");
    
    // const [warning, setWarning] = useState("");

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(mdp===cmdp){
            setMatch("");
            const requestOptions={
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    "prenom": prenom,
                    "nom":nom,
                    "telephone":telephone,
                    "courriel":courriel,
                    "password":mdp,
                    "numRue":numRue,
                    "nomRue":nomRue,
                    "ville":ville,
                    "province":province,
                    "codePostal":codePostal                
                })
            }
    
            fetch('http://localhost:8080/utilisateur', requestOptions)
            .then(response => response.text())
            .then(data=>{
                console.log(data)
                if(data==="ENREGISTRÉ"){
                    setConfirmation("Compte créé avec succès")
                    setTimeout(() => {
                        window.location.replace("/");
                    }, 1000);
                }else{
                    setConfirmation("Érreur, courriel déjà associé à un compte. Veuillez réessayer")
                }
            });
        }else{
            setMatch("*Mot de passe ne correspond pas")
        }

    }

    const annuler=(e)=>{
        e.preventDefault();
        window.location.replace("/");
    }

    return(
        <div > 
            <div className='d-flex justify-content-center'>
                <img src={logo} alt="Logo" style={{marginTop: '6.0rem'}}/>
            </div>
            <h2 className="text-center text-white">Créez votre compte</h2>
            <h4 className="text-center text-secondary">Afin d'enregistrer votre compte, veuillez entrer des informations valides</h4>
            <form onSubmit={handleSubmit} className="container container-login">
                <div className="row px-5 p-3">
                    <input type="text" value={prenom} onChange={e=>setPrenom(e.target.value)} placeholder="Prénom" required className='col '/>
                    <input type="text" value={nom} onChange={e=>setNom(e.target.value)} placeholder="Nom" required className='col'/>
                </div>
                <div className="row px-5 p-3">
                    <input type="text" value={telephone} onChange={e=>setTelephone(e.target.value)} placeholder="Téléphone" pattern="[1-9]{10}" required className='col'/>
                    <span className='col'></span>
                </div>
                <div className="row px-5 p-3">
                    <input type="email" value={courriel} onChange={e=>setCourriel(e.target.value)} placeholder="Émail" required className='col'/>
                    <span className='col'></span>
                </div>
                <div className="row px-5 p-3">
                    <input type="password" value={mdp} onChange={e=>setMdp(e.target.value)} placeholder="Mot de passe" required  className='col'/>
                    <input type="password" value={cmdp} onChange={e=>setCmdp(e.target.value)} placeholder="Confirmation mot de passe" required className='col'/>
                </div>
                <div className="row px-5 justify-content-end text-danger">{match}</div>

                <br/>
                <h4 className="text-secondary">Détails de l'adresse</h4>
                
                <div className="row px-5 p-3">
                    <input type="text" value={numRue} onChange={e=>setNumRue(e.target.value)} pattern="[1-9]" placeholder="No" className='col-1' required/>
                    <input type="text" value={nomRue} onChange={e=>setNomRue(e.target.value)} placeholder="Nom rue" className='col-6' required/>
                    <input type="text" value={ville} onChange={e=>setVille(e.target.value)} placeholder="Ville" className='col' required/>

                </div>

                <div className="row px-5 p-3">
                    <input type="text" value={province} onChange={e=>setProvince(e.target.value)} placeholder="Province" className='col-4' required/>
                    
                    <span className='col-3'><input type="text" value={codePostal} onChange={e=>setCodePostal(e.target.value.toLocaleUpperCase())} placeholder="Code Postal" pattern="[a-zA-Z]{1}[1-9]{1}[a-zA-Z]{1}-[1-9]{1}[a-zA-Z]{1}[1-9]{1}" required/>&nbsp;A1A-A1A</span>

                </div>
                <div className="row px-5 p-3 justify-content-center">
                    <input type="submit" value="Continuer" className='col-2 btn btn-primary ' />
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="submit" value="Annuler" className='col-2 btn btn-danger ' onClick={annuler}/>
                </div>
                <div className="row px-5 p-3 justify-content-center">
                    <h4>{confirmation}</h4>
                </div>
            </form>

        </div>
    )
}

export default NouveauCompte;