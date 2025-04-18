import { Box, Toolbar, Typography } from "@mui/material";
import SideBar from "../components/Sidebar";

const drawerWidth = 240; // Match the width from the SideBar

export default function Search() {
  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3, // Padding for the content
          marginLeft: `${drawerWidth}px`, // Adjust content to align next to the sidebar
        }}
      >
        <Toolbar /> {/* Adds spacing for the AppBar */}
        <Typography variant="h4">Search</Typography>
        <Typography variant="body1">Search content.</Typography>
      </Box>
    </Box>
  );
}
