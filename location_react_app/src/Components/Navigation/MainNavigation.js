import {NavLink} from "react-router-dom";
import "./MainNavigation.css"
import logo from '../../logo.svg'
import AuthContext from "../../context/auth-context";

const MainNavigation = (props) => (
    <AuthContext.Consumer>
        {(context) => {
            return (
                <header className="main-navigation d-flex justify-content-around">
                    <div className="main-navigation__logo">
                        <NavLink to="/"><img src={logo} alt="logo vers la page accueil"/></NavLink>
                    </div>
                    <nav className="main-navigation__items">
                        <ul>
                            {context.token && (
                                <li>
                                    <NavLink to="/compte">Mon compte</NavLink>
                                </li>
                            )}
                            <li>
                                <NavLink to="/annonces">Mes annonces</NavLink>
                            </li>
                            {context.token && (
                                <li>
                                    <NavLink to="/messages">Messages</NavLink>
                                </li>
                            )}
                            {!context.token && (
                                <li>
                                    <NavLink to="/login">Se connecter</NavLink>
                                </li>
                            )}
                            {context.token && (
                                <li>
                                    <NavLink to="/logout">Se déconnecter</NavLink>
                                </li>
                            )}
                        </ul>
                    </nav>
                </header>
            );
        }}
    </AuthContext.Consumer>
);

export default MainNavigation;