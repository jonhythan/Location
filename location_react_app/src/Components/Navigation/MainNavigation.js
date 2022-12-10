import {NavLink} from "react-router-dom";
import "./MainNavigation.css"

const MainNavigation = (props) => (
    <header className="main-navigation">
        <div className="main-navigation__logo">
            <h1>Godin Tools</h1>
        </div>
        <nav className="main-navigation__items">
            <ul>
                <li>
                    <NavLink to="/compte">Mon compte</NavLink>
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