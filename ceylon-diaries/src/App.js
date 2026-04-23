// import React, { useState } from "react";
// import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
// import PlacesPage from "./components/PlacesPage";
// import AdminPage from "./components/AdminPage";

// function App() {
//   const [page, setPage] = useState("places");

//   return (
//     <Box>
//       <AppBar position="static">
//         <Toolbar>
//           <Typography variant="h6" sx={{ flexGrow: 1 }}>
//             CeylonDiaries
//           </Typography>

//           <Button color="inherit" onClick={() => setPage("places")}>
//             Places
//           </Button>
//           <Button color="inherit" onClick={() => setPage("admin")}>
//             Admin
//           </Button>
//         </Toolbar>
//       </AppBar>

//       {page === "places" ? <PlacesPage /> : <AdminPage />}
//     </Box>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PlacesPage from "./components/PlacesPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/places" element={<PlacesPage />} />
      </Routes>
    </Router>
  );
}

export default App;