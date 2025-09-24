import {CssBaseline} from "@mui/material";
import ResponsiveAppBar from "./component/ResponsiveAppBar.jsx";
import ListeNouvelles from "./component/ListeNouvelles.jsx";
import LoginContext from "./component/LoginContext.jsx";
import {useState} from "react";
import {nouvelles} from "./scripts/nouvelles.js"
import ListeNouvellesContext from "./component/ListeNouvellesContext.jsx";

function App() {
    const [login, setLogin] = useState("Se connecter")
    const [listeNouvelles, setListeNouvelles] = useState(nouvelles)

  return (
    <>
        <LoginContext.Provider value={{login, setLogin}}>
            <CssBaseline/>
            <ListeNouvellesContext value={{listeNouvelles, setListeNouvelles}}>
                <ResponsiveAppBar/>
                <ListeNouvelles/>
            </ListeNouvellesContext>
        </LoginContext.Provider>
    </>
  )
}

export default App
