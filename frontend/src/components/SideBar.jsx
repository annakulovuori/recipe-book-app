import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link as RouterLink } from "react-router-dom";
import { red } from "@mui/material/colors";

const drawerWidth = 240;

export default function SideBar() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      ></AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight: `5px solid #32161F`,
            backgroundColor: "#81A094",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Typography
          variant="h5"
          component="div"
          sx={{
            paddingBottom: 5,
            color: "#32161F",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Recipebook
        </Typography>
        <Divider sx={{ borderBottomWidth: 5, borderColor: "#32161F" }} />
        <List>
          {/* Profile Link */}
          <ListItem disablePadding>
            <ListItemButton
              component={RouterLink}
              to="/profile"
              sx={{ paddingLeft: 6, marginTop: 4, color: "#32161F" }}
            >
              <ListItemIcon sx={{ color: "#32161F" }}>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>

          {/* Search Link */}
          <ListItem disablePadding>
            <ListItemButton
              component={RouterLink}
              to="/search"
              sx={{ paddingLeft: 6, color: "#32161F" }}
            >
              <ListItemIcon sx={{ color: "#32161F" }}>
                <SearchIcon />
              </ListItemIcon>
              <ListItemText primary="Search" />
            </ListItemButton>
          </ListItem>

          {/* Settings Link */}
          <ListItem disablePadding>
            <ListItemButton
              component={RouterLink}
              to="/settings"
              sx={{ paddingLeft: 6, color: "#32161F" }}
            >
              <ListItemIcon sx={{ color: "#32161F" }}>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
