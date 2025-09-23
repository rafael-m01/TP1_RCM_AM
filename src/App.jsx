import {CssBaseline} from "@mui/material";
import ResponsiveAppBar from "./component/ResponsiveAppBar.jsx";
import ListeNouvelles from "./component/ListeNouvelles.jsx";
import LoginContext from "./component/LoginContext.jsx";
import {useState} from "react";
import {nouvelles} from "./scripts/nouvelles.js"
import * as React from "react";

function App() {
    const [login, setLogin] = useState("Login")
    const [open, setOpen] = React.useState(false);

    const [listeNouvelles, setListeNouvelles] = useState(nouvelles)


  return (
    <>
        <LoginContext.Provider value={{login, setLogin}}>
            <CssBaseline/>
            <ResponsiveAppBar setOpen = {setOpen}/>
            <ListeNouvelles listeNouvelles={listeNouvelles} open={open}/>
        </LoginContext.Provider>
    </>
  )
}

export default App
