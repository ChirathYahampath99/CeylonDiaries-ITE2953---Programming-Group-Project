import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

const API_BASE_URL = "https://localhost:7135/api/Places";

function PlacesPage({ addToPlan }) {
  const [places, setPlaces] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setPlaces(response.data);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  const categories = useMemo(() => {
    const allCategories = places.map((p) => p.category).filter(Boolean);
    return [...new Set(allCategories)];
  }, [places]);

  const filteredPlaces = useMemo(() => {
    if (!selectedCategory) return places;
    return places.filter((place) => place.category === selectedCategory);
  }, [places, selectedCategory]);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        CeylonDiaries - Places of Interest
      </Typography>

      <FormControl sx={{ minWidth: 220, mb: 3 }}>
        <InputLabel>Filter by Category</InputLabel>
        <Select
          value={selectedCategory}
          label="Filter by Category"
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          {categories.map((category, index) => (
            <MenuItem key={index} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Grid container spacing={3}>
        {filteredPlaces.map((place) => (
          <Grid item xs={12} key={place.id}>
            <Card
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                mb: 2,
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  width: { xs: "100%", md: 250 },
                  height: 200,
                  objectFit: "cover",
                }}
                image={place.imageUrl || "/images/default.jpg"}
                alt={place.name}
              />

              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6">{place.name}</Typography>

                <Typography variant="body2" color="text.secondary">
                  {place.category}
                </Typography>

                <Typography sx={{ mt: 1 }}>{place.description}</Typography>

                <Typography sx={{ mt: 1 }}>
                  <strong>Opening Hours:</strong> {place.openingHours}
                </Typography>

                <Typography>
                  <strong>Distance:</strong> {place.distance}
                </Typography>

                <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                  <Button
                    variant="contained"
                    onClick={() => addToPlan(place)}
                  >
                    ADD TO PLAN
                  </Button>

                  <Button
                    variant="outlined"
                    href={place.locationUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    VIEW MAP
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default PlacesPage;