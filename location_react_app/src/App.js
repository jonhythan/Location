import {Component} from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import NouveauCompte from "./Components/NouveauCompte";
import MainNavigation from "./Components/Navigation/MainNavigation";
import AnnoncesPage from "./pages/Annonces";
import Login from "./pages/Login";
import MesAnnonces from "./pages/MesAnnonces";
import ComptePage from "./pages/Compte";
import ModificationCompte from "./Components/ModificationCompte";
import Messages from "./pages/Messages";
import UneAnnonce from "./Components/UneAnnonce";
import AdminPage from "./pages/Admin";
import AdminPanel from "./pages/AdminPanel"



class App extends Component {



    render() {
        return (
            <BrowserRouter>
                {/*Composant : barre de navigation principale*/}
                    <MainNavigation/>
                    <Routes>
                        <Route path="/" element={<AnnoncesPage/>}/>
                        <Route path="/annonces" element={<AnnoncesPage/>}/> 
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/inscription" element={<NouveauCompte/>}/>
                        {/* <Route path="/test" element={<Test/>}/>
                        <Route path="/test2" element={<Test2/>}/> */}
                        <Route path="/mesannonces" element={<MesAnnonces/>}/>
                        <Route path="/messages" element={<Messages/>}/>
                        <Route path="/compte" element={<ModificationCompte/>}/>
                        <Route path="/annonce" element={<UneAnnonce/>}/>
                        {/*<Route path="/admin" element={<AdminPage/>}/>*/}
                        <Route path="/admin" element={<AdminPanel/>}/>

                    </Routes>
            </BrowserRouter>
        );
    }
}

export default App;