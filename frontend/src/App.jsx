import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import { AuthProvider } from "./Hook/AuthProvider";
import Search from "./pages/Search";
import Settings from "./pages/Settings";
import { ThemeProvider } from "@mui/material";
import theme from "./Theme";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthProvider>
          <AppLayout />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

function AppLayout() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<Login />} />
      </Route>
      <Route element={<PublicRoute />}>
        <Route path="/register" element={<Register />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/search" element={<Search />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
