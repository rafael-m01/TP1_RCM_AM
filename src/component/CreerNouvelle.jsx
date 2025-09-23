import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const drawerWidth = "100%";



const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'relative',
    alignItems: 'center',
    paddingTop: "70px",
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));

export default function CreerNouvelle({creerNouvelleOuvert, setCreerNouvelleOuvert}) {
    const theme = useTheme();

    const handleDrawerClose = () => {
        setCreerNouvelleOuvert(false);
    };

    const Box = styled('div')(() => ({
        backgroundColor:"#1f1f1f"
    }));

    return (
        <Box>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                    },
                    backgroundColor:"#2b2b2b"
                }}
                variant="persistent"
                anchor="top"
                open={creerNouvelleOuvert}
            >
                <DrawerHeader sx={{
                    backgroundColor:"#1f1f1f",
                    justifyContent: "center"
                }}>
                    <IconButton onClick={handleDrawerClose}>
                        <KeyboardArrowUpIcon sx={{color:"white"}}/>
                    </IconButton>
                </DrawerHeader>
                <Divider />

            </Drawer>
        </Box>
    );
}