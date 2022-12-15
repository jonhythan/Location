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


class App extends Component {

    state = {
        token: null,
        userId: null,
    }

    login = (token, userId, tokenExpiration) => {
        this.setState({token: token, userId: userId});
    }

    logout = () => {
        this.setState({token: null, userId: null});
    }

    render() {
        return (
            <BrowserRouter>
                <AuthContext.Provider
                    value={{
                        token: this.state.token,
                        userId: this.state.userId,
                        login: this.login,
                        logout: this.logout,
                    }}>
                    {/*Composant : barre de navigation principale*/}
                    <MainNavigation/>
                    <Routes>
                        {/*Passer automatiquement à la page par défaut.*/}
                        {!this.state.token &&
                            <Route path="/" element={<Navigate to={"/annonces"}/>}/>
                        }
                        {this.state.token &&
                            <Route path="/" element={<Navigate to={"/annonces"}/>}/>
                        }
                        {!this.state.token &&
                            <Route path="/login" element={<Login/>}/>
                        }
                        {this.state.token &&
                            <Route path="/login" element={<Navigate to={"/annonces"}/>}/>
                        }
                        {!this.state.token &&
                            <Route path="/compte" element={<Navigate to={"/login"}/>}/>
                        }
                        {this.state.token &&
                            <Route path="/compte" element={<ComptePage/>}/>
                        }
                        <Route path="/annonces" element={<AnnoncesPage/>}/>
                        <Route path="/annonce" element={<UneAnnonce/>}/>
                        {!this.state.token &&
                            <Route path="/messages" element={<Navigate to={"/login"}/>}/>
                        }
                        {this.state.token &&
                            <Route path="/messages" element={<MessagesPage/>}/>
                        }
                        {!this.state.token &&
                            <Route path="/nouveaucompte" element={<NouveauCompte/>}/>
                        }
                        {this.state.token &&
                            <Route path="/nouveaucompte" element={<ComptePage/>}/>
                        }
                        {!this.state.token &&
                            <Route path="/nouvelleannonce" element={<Navigate to={"/login"}/>}/>
                        }
                        {this.state.token &&
                            <Route path="/nouvelleannonce" element={<NouvelleAnnonce/>}/>
                        }
                        {!this.state.token &&
                            <Route path="/nouveausignalement" element={<Navigate to={"/login"}/>}/>
                        }
                        {this.state.token &&
                            <Route path="/nouveausignalement" element={<NouveauSignalement/>}/>
                        }
                        {!this.state.token &&
                            <Route path="/compte/modifier" element={<Navigate to={"/login"}/>}/>
                        }
                        {this.state.token &&
                            <Route path="/compte/modifier" element={<ModificationCompte/>}/>
                        }
                        <Route path="/test" element={<Test/>}/>
                        <Route path="/test2" element={<Test2/>}/>
                    </Routes>
                </AuthContext.Provider>
            </BrowserRouter>
        );
    }
}

export default App;