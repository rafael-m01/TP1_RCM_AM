import {CssBaseline} from "@mui/material";
import ResponsiveAppBar from "./component/ResponsiveAppBar.jsx";
import ListeNouvelles from "./component/ListeNouvelles.jsx";
import LoginContext from "./component/LoginContext.jsx";
import {use, useState} from "react";
import {nouvelles} from "./scripts/nouvelles.js"
import ListeNouvellesContext from "./component/ListeNouvellesContext.jsx";
import * as React from "react";
import CreerNouvelle from "./component/CreerNouvelle.jsx";
import ListeBookmarks from "./component/ListeBookmarks.jsx";

function App() {
    const [login, setLogin] = useState("Se connecter");
    const [listeNouvelles, setListeNouvelles] = useState(nouvelles);
    const [creerNouvelleDrawerOuvert, setCreerNouvelleDrawerOuvert] = React.useState(false);
    const [pageBookmarkOuverte, setPageBookmarkOuverte] = useState(false);

  return (
    <>
        <LoginContext.Provider value={{login, setLogin}}>
            <CssBaseline/>
            <ListeNouvellesContext value={{listeNouvelles, setListeNouvelles}}>
                <ResponsiveAppBar setCreerNouvelleOuvert={setCreerNouvelleDrawerOuvert} setPageBookmarkOuverte={setPageBookmarkOuverte}/>
                {pageBookmarkOuverte?
                    <ListeBookmarks creerNouvelleDrawerOuvert={creerNouvelleDrawerOuvert} setCreerNouvelleDrawerOuvert={setCreerNouvelleDrawerOuvert}/>
                    :<ListeNouvelles creerNouvelleDrawerOuvert={creerNouvelleDrawerOuvert} setCreerNouvelleDrawerOuvert={setCreerNouvelleDrawerOuvert}/>
                }
            </ListeNouvellesContext>
        </LoginContext.Provider>
    </>
  )
}

export default App
