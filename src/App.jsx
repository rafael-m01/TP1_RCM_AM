import {CssBaseline} from "@mui/material";
import ResponsiveAppBar from "./component/ResponsiveAppBar.jsx";
import ListeNouvelles from "./component/ListeNouvelles.jsx";
import LoginContext from "./component/LoginContext.jsx";
import {useState} from "react";
import {nouvelles} from "./scripts/nouvelles.js"

function App() {
    const [login, setLogin] = useState("Login")
    const [listeNouvelles, setListeNouvelles] = useState(nouvelles)

  return (
    <>
        <LoginContext.Provider value={{login, setLogin}}>
            <CssBaseline/>
            <ResponsiveAppBar/>
            <ListeNouvelles listeNouvelles={listeNouvelles} setListeNouvelles={setListeNouvelles}/>
        </LoginContext.Provider>
    </>
  )
}

export default App
