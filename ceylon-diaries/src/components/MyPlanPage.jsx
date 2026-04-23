import React from "react";
import { Box, Typography, Paper, Chip, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function MyPlanPage({ plan, removeFromPlan, clearPlan }) {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        My One-Day Visit Plan
      </Typography>

      {plan.length === 0 ? (
        <Paper sx={{ p: 3 }}>
          <Typography>No places selected yet.</Typography>
          <Button sx={{ mt: 2 }} variant="contained" onClick={() => navigate("/places")}>
            Explore Places
          </Button>
        </Paper>
      ) : (
        <Paper sx={{ p: 3 }}>
          <Typography sx={{ mb: 2 }}>
            Selected Places: {plan.length}/5
          </Typography>

          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 3 }}>
            {plan.map((place) => (
              <Chip
                key={place.id}
                label={place.name}
                color="primary"
                onDelete={() => removeFromPlan(place.id)}
              />
            ))}
          </Box>

          <Button variant="outlined" color="error" onClick={clearPlan}>
            Clear Plan
          </Button>
        </Paper>
      )}
    </Box>
  );
}

export default MyPlanPage;