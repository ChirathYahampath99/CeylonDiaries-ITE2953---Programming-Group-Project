import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        backgroundImage: "url('/images/home2.jpg')", // 👈 your image
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* DARK OVERLAY */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      />

      {/* CONTENT BOX */}
      <Box
        sx={{
          position: "relative",
          textAlign: "center",
          color: "white",
          p: 4,
          borderRadius: 3,
          backdropFilter: "blur(10px)",
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
          Welcome to
        </Typography>

        <Typography
          variant="h2"
          sx={{ fontWeight: "bold", mb: 3, color: "#FFD700" }}
        >
          CeylonDiaries
        </Typography>

        <Typography sx={{ mb: 4 }}>
          Discover the beauty of Sri Lanka 🌴
          <br />
          Plan your perfect one-day journey
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
          sx={{ color: "white", borderColor: "white" }}
          onClick={() => navigate("/plan")}
        >
          My Plan
        </Button>
      </Box>
    </Box>
  );
}

export default HomePage;