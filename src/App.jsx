import {CssBaseline} from "@mui/material";
import ResponsiveAppBar from "./component/ResponsiveAppBar.jsx";
import ListeNouvelles from "./component/ListeNouvelles.jsx";
import LoginContext from "./component/LoginContext.jsx";
import {useState} from "react";
import {nouvelles} from "./scripts/nouvelles.js"
import ListeNouvellesContext from "./component/ListeNouvellesContext.jsx";
import * as React from "react";
import CreerNouvelle from "./component/CreerNouvelle.jsx";

function App() {
    const [login, setLogin] = useState("Se connecter")
    const [listeNouvelles, setListeNouvelles] = useState(nouvelles)
    const [creerNouvelleOuvert, setCreerNouvelleOuvert] = React.useState(false);

  return (
    <>
        <LoginContext.Provider value={{login, setLogin}}>
            <CssBaseline/>
            <ListeNouvellesContext value={{listeNouvelles, setListeNouvelles}}>
                <ResponsiveAppBar setCreerNouvelleOuvert={setCreerNouvelleOuvert}/>
                <ListeNouvelles creerNouvelleOuvert={creerNouvelleOuvert} setCreerNouvelleOuvert={setCreerNouvelleOuvert}/>
            </ListeNouvellesContext>
        </LoginContext.Provider>
    </>
  )
}

export default App
