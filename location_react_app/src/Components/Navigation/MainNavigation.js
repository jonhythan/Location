import {NavLink} from "react-router-dom";
import "./MainNavigation.css"
import logo from '../../logo.svg'
// import AuthContext from "../../context/auth-context";

const MainNavigation = (props) => {
    const token = sessionStorage.getItem("token");
    return (
        <header className="main-navigation d-flex justify-content-around">
            <div className="main-navigation__logo">
                <NavLink to="/"><img src={logo} alt="logo vers la page accueil"/></NavLink>
            </div>
            <nav className="main-navigation__items">
                <ul>
                    {token ? (
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

                                <li>
                                    <NavLink to="" onClick={() => {
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