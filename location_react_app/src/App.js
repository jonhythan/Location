import {Component} from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import NouveauCompte from "./Components/NouveauCompte";
import NouvelleAnnonce from "./Components/NouvelleAnnonce";
import NouveauSignalement from "./Components/NouveauSignalement";
import MainNavigation from "./Components/Navigation/MainNavigation";
import Test from "./Components/Test"
import Test2 from "./Components/Test2";
import ComptePage from "./pages/Compte";
import AnnoncesPage from "./pages/Annonces";
import MessagesPage from "./pages/Messages";
import Login from "./pages/Login";
import UneAnnonce from "./Components/UneAnnonce";
import AuthContext from "./context/auth-context";
import ModificationCompte from "./Components/ModificationCompte";
import ModificationAnnonce from "./Components/ModificationAnnonce";
import MesAnnonces from "./pages/MesAnnonces";


class App extends Component {



    render() {
        
        return (
            <BrowserRouter>
                {/*Composant : barre de navigation principale*/}
                    <MainNavigation/>
                    <span>{this.state.token==null?"isnull":"notnull"}</span>
                    <Routes>
                        <Route path="/" element={<AnnoncesPage/>}/>
                        <Route path="/annonces" element={<AnnoncesPage/>}/> 
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/inscription" element={<NouveauCompte/>}/>
                        {/* <Route path="/test" element={<Test/>}/>
                        <Route path="/test2" element={<Test2/>}/> */}
                        <Route path="/mesannonces" element={<MesAnnonces/>}/>
                        <Route path="/message" element={<MesAnnonces/>}/>
                        
                    </Routes>
            </BrowserRouter>
        );
    }
}

export default App;