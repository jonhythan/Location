import {NavLink, Route} from "react-router-dom";
import "./MainNavigation.css"
import logo from '../../logo.svg'
import {AiOutlineSearch} from 'react-icons/ai'
import { useRef } from "react";

const MainNavigation = ({search,word}) => {
    const token = sessionStorage.getItem("token");
    const role = sessionStorage.getItem("role");
    const searchRef = useRef();
    const loupeRef = useRef();
    // Renvoie "NavBar" selon l'utilisateur "Rôle"
    function renderNavBar() {
        // Si l'utilisateur est "admin", accédez à l'administrateur "NavBar".
        if (role == "admin") {
            return (
                <>
                    <li>
                        <NavLink to="/admin">Admin Panel</NavLink>
                    </li>
                </>
            )
        } else {
            // Si l'utilisateur est "membre", accédez à l'utilisateur "NavBar".
            return (
                <>
                    <li>
                        <NavLink to="/compte">Mon compte</NavLink>
                    </li>
                    <li>
                        <NavLink to="/mesannonces">Mes annonces</NavLink>
                    </li>
                    <li>
                        <NavLink to="/messages">Messages</NavLink>
                    </li>
                </>
            )
        }
    }


    return (
        <header className="main-navigation d-flex justify-content-evenly">
            <div className="main-navigation__logo">
                <img src={logo} alt="logo vers la page accueil" onClick={()=>window.location.replace("/")} style={{cursor:"pointer"}}/>
            </div>
            <div className="input-group mb-3" style={{width:"20%", paddingTop:"20px"}}>
                <input ref={searchRef} type="text" defaultValue={word} className="form-control" placeholder="Chercher" aria-label="Chercher" aria-describedby="basic-addon1"
                    onKeyDown={(e)=>{
                        if(e.key==='Enter'){
                            loupeRef.current.click();
                        }
                    }}
                />
                <button ref={loupeRef} className="input-group-text barre-navigation-element" id="basic-addon1" onClick={()=>{
                    search(searchRef.current.value)
                    searchRef.current.value="";
                }}><AiOutlineSearch /></button>
            </div>
            <nav className="main-navigation__items">
                <ul>
                    {token ? (
                            <>
                                {/*Renvoie "NavBar" selon l'utilisateur "Rôle"*/}
                                {renderNavBar()}

                                <li>
                                    <NavLink to="/logout" onClick={() => {
                                        sessionStorage.removeItem("token");
                                        window.location.replace("/")
                                    }}>Se déconnecter</NavLink>
                                </li>
                                <li>
                                    <label htmlFor={"prenom"}
                                           style={{width: '200px'}}>Salut {sessionStorage.getItem("prenom")}</label>
                                </li>
                            </>)
                        : <>
                            <li>
                                <NavLink to="/login">Se connecter</NavLink>
                            </li>
                            ou
                            <li>
                                <NavLink to="/inscription">S'inscrire</NavLink>
                            </li>
                        </>
                    }
                </ul>
            </nav>
            
        </header>
    )
}

export default MainNavigation;