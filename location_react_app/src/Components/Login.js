import {useState} from 'react'

const Login = ()=>{
    const [prenom, setPrenom]=useState("");
    const [nom, setNom]=useState("");
    const [telephone, setTelephone]=useState("");
    const [email, setEmail]=useState("");
    const [mdp, setMdp]=useState("");
    const [cmdp, setCmdp]=useState("");
    const [numRue, setNumRue]=useState("");
    const [nomRue, setNomRue]=useState("");
    const [ville, setVille]=useState("");
    const [province, setProvince]=useState("");
    const [codePostal, setCodePostal]=useState("");
    
    // const [warning, setWarning] = useState("");

    const handleSubmit=(e)=>{
        e.preventDefault();
        const requestOptions={
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: { 
                "nom": "jonathan",
                "prenom" : "jonathan",
                "courriel": "jon@jona2",
                "telephone": "5147972874",
                "password":"abc",
                "numRue": "655",
                "nomRue": "Chritophe-Colomb",
                "ville":"Montréal",
                "province": "Québec",
                "codePostal":"h2s-2h1"
                // "prenom": prenom,
                // "nom":nom,
                // "telephone":telephone,
                // "email":email,
                // "mdp":mdp,
                // "cmdp":cmdp,
                // "numRue":numRue,
                // "nomRue":nomRue,
                // "ville":ville,
                // "province":province,
                // "codePostal":codePostal                
            }
        }

        fetch('http://localhost:8080/utilisateur', requestOptions)
        .then(response => console.log(response));

    }

    return(
        <>
        <h2>Afin d'enregistrer votre compte, veuillez entrer des informations valides</h2>
        <form onSubmit={handleSubmit}>
            {/* <input type="text" value={prenom} onChange={e=>setPrenom(e.target.value)} placeholder="Prénom" required/>
            <input type="text" value={nom} onChange={e=>setNom(e.target.value)} placeholder="Nom" required/>
            <input type="text" value={telephone} onChange={e=>setTelephone(e.target.value)} placeholder="Téléphone" pattern="[1-9]{10}" required/>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Émail" required/>
            <input type="text" value={mdp} onChange={e=>setMdp(e.target.value)} placeholder="Mot de passe" required/>
            <input type="text" value={cmdp} onChange={e=>setCmdp(e.target.value)} placeholder="Confirmation mot de passe" required/>

            <br/>
            <span>Détails de l'adresse</span>
            <br></br>
            <input type="text" value={numRue} onChange={e=>setNumRue(e.target.value)} placeholder="Numéro rue"/>
            <input type="text" value={nomRue} onChange={e=>setNomRue(e.target.value)} placeholder="Nom rue"/>
            <input type="text" value={ville} onChange={e=>setVille(e.target.value)} placeholder="Ville"/>
            <input type="text" value={province} onChange={e=>setProvince(e.target.value)} placeholder="Province"/>
            <input type="text" value={codePostal} onChange={e=>setCodePostal(e.target.value)} placeholder="Code Postal" pattern="[a-zA-z]{3}-[a-zA-z]{3}" required/>

             */}
            <input type="submit" value="Continuer"/>
        </form>
        </>
    )
}

export default Login;