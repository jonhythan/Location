import React from 'react'
import { Link } from "react-router-dom";
import logo from '../Logo.svg'
const Accueil = () => {


  return (
    <div className='container h-100 d-flex flex-column align-items-center justify-content-center'>
        <img src={logo} alt="logo"/>
        <Link to="/nouveauCompte">Créer un compte</Link> 
        <Link to="/nouvelleannonce">Créer une annonce</Link>
    </div>
  )
}

export default Accueil