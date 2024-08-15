import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material'
import React, { CSSProperties } from 'react'
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import { NavLink } from 'react-router-dom';

interface SidebarProps {
    drawerWidth: number,
    mobileOpen: boolean,
    handleDrawerToggle: () => void,
}

interface menuItem {
    text: string,
    path: string,
    icon: React.ComponentType,
}

const Sidebar = ({drawerWidth, mobileOpen, handleDrawerToggle}:SidebarProps) => {
    
    const MenuItems:menuItem[]= [
        {text: "Home", path: "/", icon: HomeIcon},
        {text: "Report", path: "/report", icon: SignalCellularAltIcon}

    ]

    const baseLinkStyle:CSSProperties={
        textDecoration:"none",
        color:"inherit",
        display:"block"
    }

    const activeLinkStyle:CSSProperties ={
        backgroundColor:"rgba(0, 0, 0, 0.08)"
    }

    const drawer = (
        <div>
          <Toolbar />
          <Divider />
          <List>
            {MenuItems.map((item, index) => (
              <NavLink key={item.text} to={item.path} style={({isActive }) => {
                console.log("選択されたメニューは",item.text, isActive)
                return {
                    ...baseLinkStyle,
                    ...(isActive ? activeLinkStyle: {})
                }
              }}>
              <ListItem key={index} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {/*index % 2 === 0 ? <InboxIcon  /> : <MailIcon />*/}
                  <item.icon />
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
              </NavLink>
            ))}
          </List>
         
        </div>
      );
  
    return (
    <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
  )
}

export default Sidebar