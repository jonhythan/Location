import {NavLink} from "react-router-dom";
import "./MainNavigation.css"
import logo from '../../logo.svg'

const MainNavigation = (props) => (
    <header className="main-navigation d-flex justify-content-around">
        <div className="main-navigation__logo">
            <NavLink to="/compte" ><img src={logo} alt="logo vers la page accueil"/></NavLink>
        </div>
        <nav className="main-navigation__items">
            <ul>
                
                <li>
                    <NavLink to="/compte" >Mon compte</NavLink>
                </li>
                <li>
                    <NavLink to="/annonces">Mes annonces</NavLink>
                </li>
                <li>
                    <NavLink to="/messages">Messages</NavLink>
                </li>
                <li>
                    <NavLink to="/auth">Se connecter</NavLink>
                </li>
            </ul>
        </nav>
    </header>
);

export default MainNavigation;