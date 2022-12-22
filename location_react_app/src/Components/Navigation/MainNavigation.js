import {NavLink, Route} from "react-router-dom";
import "./MainNavigation.css"
import logo from '../../logo.svg'

const MainNavigation = (props) => {
    const token = sessionStorage.getItem("token");
    const role = sessionStorage.getItem("role");

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
        <header className="main-navigation d-flex justify-content-around">
            <div className="main-navigation__logo">
                <NavLink to="/"><img src={logo} alt="logo vers la page accueil"/></NavLink>
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
                                    <label className={"fs-5"}  htmlFor={"prenom"}
                                           style={{width: '200px', color:'blue'}}>Salut {'\u00A0'}
                                        <span className={"text-capitalize fw-bold"}>
                                            {sessionStorage.getItem("prenom")}
                                        </span>
                                    </label>
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