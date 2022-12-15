import {Component} from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import NouveauCompte from "./Components/NouveauCompte";
import NouvelleAnnonce from "./Components/NouvelleAnnonce";
import NouveauSignalement from "./Components/NouveauSignalement"
import MainNavigation from "./Components/Navigation/MainNavigation";
import Test from "./Components/Test"
import Test2 from "./Components/Test2";
import ComptePage from "./pages/Compte";
import AnnoncesPage from "./pages/Annonces";
import MessagesPage from "./pages/Messages";
import Login from "./pages/Login";
import UneAnnonce from "./Components/UneAnnonce";
import ModificationCompte from "./Components/ModificationCompte";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                {/*Composant : barre de navigation principale*/}
                
                <MainNavigation/>
                <Routes>
                        {/*Passer automatiquement à la page par défaut.*/}
                        <Route path="/" element={<Navigate to={"/nouveaucompte"}/>}/>
                        <Route path="/nouveaucompte" element={<NouveauCompte/>}/>
                        <Route path="/nouvelleannonce" element={<NouvelleAnnonce/>}/>
                        <Route path="/nouveausignalement" element={<NouveauSignalement/>}/>
                        <Route path="/test" element={<Test/>}/>
                        <Route path="/test2" element={<Test2/>}/>
                        <Route path="/compte" element={<ComptePage/>}/>
                        <Route path="/annonces" element={<AnnoncesPage/>}/>
                        <Route path="/messages" element={<MessagesPage/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/annonce" element={<UneAnnonce/>}/>
                        <Route path="/compte/modifier" element={<ModificationCompte/>}/>

                </Routes>
            </BrowserRouter>
            );
        }
    }

export default App;