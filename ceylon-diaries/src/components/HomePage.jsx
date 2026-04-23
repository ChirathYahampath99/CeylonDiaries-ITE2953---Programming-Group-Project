import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function HomePage({ plan }) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "90vh",
        backgroundImage: "url('/images/home2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "white",
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(0,0,0,0.55)",
          p: 5,
          borderRadius: 4,
        }}
      >
        <Typography variant="h3" fontWeight="bold">
          Welcome to
        </Typography>

        <Typography variant="h2" fontWeight="bold" sx={{ color: "#FFD700" }}>
          CeylonDiaries
        </Typography>

        <Typography sx={{ mt: 2, mb: 4 }}>
          Discover Sri Lanka and plan your perfect one-day journey.
        </Typography>

        <Button
          variant="contained"
          size="large"
          sx={{ mr: 2 }}
          onClick={() => navigate("/places")}
        >
          Explore Places
        </Button>

        <Button
          variant="outlined"
          size="large"
          sx={{ mr: 2, color: "white", borderColor: "white" }}
          disabled={plan.length === 0}
          onClick={() => navigate("/plan")}
        >
          My One-Day Plan
        </Button>

        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={() => navigate("/admin")}
        >
          Admin
        </Button>
      </Box>
    </Box>
  );
}

export default HomePage;