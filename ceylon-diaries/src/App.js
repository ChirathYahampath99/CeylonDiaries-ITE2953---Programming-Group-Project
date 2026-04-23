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


import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

import HomePage from "./components/HomePage";
import PlacesPage from "./components/PlacesPage";
import AdminPage from "./components/AdminPage";
import MyPlanPage from "./components/MyPlanPage";

function AppContent() {
  const navigate = useNavigate();

  const [plan, setPlan] = useState(() => {
    const savedPlan = localStorage.getItem("ceylon-plan");
    return savedPlan ? JSON.parse(savedPlan) : [];
  });

  useEffect(() => {
    localStorage.setItem("ceylon-plan", JSON.stringify(plan));
  }, [plan]);

  const addToPlan = (place) => {
    const exists = plan.some((p) => p.id === place.id);

    if (exists) {
      alert("This place is already added to your plan.");
      return;
    }

    if (plan.length >= 5) {
      alert("You can add only 5 places for one-day plan.");
      return;
    }

    setPlan([...plan, place]);
  };

  const removeFromPlan = (id) => {
    setPlan(plan.filter((p) => p.id !== id));
  };

  const clearPlan = () => {
    setPlan([]);
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            CeylonDiaries
          </Typography>

          <Button color="inherit" onClick={() => navigate("/")}>
            Home
          </Button>

          <Button color="inherit" onClick={() => navigate("/places")}>
            Explore Places
          </Button>

          <Button
            color="inherit"
            disabled={plan.length === 0}
            onClick={() => navigate("/plan")}
          >
            My One-Day Plan
          </Button>

          <Button color="inherit" onClick={() => navigate("/admin")}>
            Admin
          </Button>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route
          path="/"
          element={<HomePage plan={plan} />}
        />

        <Route
          path="/places"
          element={<PlacesPage addToPlan={addToPlan} />}
        />

        <Route
          path="/plan"
          element={
            <MyPlanPage
              plan={plan}
              removeFromPlan={removeFromPlan}
              clearPlan={clearPlan}
            />
          }
        />

        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Box>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;