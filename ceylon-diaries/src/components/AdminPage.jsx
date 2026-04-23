import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
const API_BASE_URL = "https://localhost:7135/api/Places";
const emptyForm = {
  name: "",
  category: "",
  description: "",
  openingHours: "",
  distance: "",
  imageUrl: "",
  locationUrl: "",
};

function AdminPage() {
  const [places, setPlaces] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await axios.put(`${API_BASE_URL}/${editingId}`, formData);
      } else {
        await axios.post(API_BASE_URL, formData);
      }

      setFormData(emptyForm);
      setEditingId(null);
      fetchPlaces();
    } catch (error) {
      console.error("Error saving place:", error);
    }
  };

  const handleEdit = (place) => {
    setFormData({
      name: place.name || "",
      category: place.category || "",
      description: place.description || "",
      openingHours: place.openingHours || "",
      distance: place.distance || "",
      imageUrl: place.imageUrl || "",
      locationUrl: place.locationUrl || "",
    });
    setEditingId(place.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      fetchPlaces();
    } catch (error) {
      console.error("Error deleting place:", error);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Page
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Category" name="category" value={formData.category} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Description" name="description" value={formData.description} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Opening Hours" name="openingHours" value={formData.openingHours} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Distance" name="distance" value={formData.distance} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Image URL" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Location URL" name="locationUrl" value={formData.locationUrl} onChange={handleChange} />
          </Grid>
        </Grid>

        <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
          <Button variant="contained" onClick={handleSubmit}>
            {editingId ? "Update Place" : "Add Place"}
          </Button>

          <Button
            variant="outlined"
            onClick={() => {
              setFormData(emptyForm);
              setEditingId(null);
            }}
          >
            Clear
          </Button>
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Existing Places
        </Typography>

        <List>
          {places.map((place) => (
            <ListItem
              key={place.id}
              secondaryAction={
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button variant="outlined" onClick={() => handleEdit(place)}>
                    Edit
                  </Button>
                  <Button variant="contained" color="error" onClick={() => handleDelete(place.id)}>
                    Delete
                  </Button>
                </Box>
              }
            >
              <ListItemText
                primary={place.name}
                secondary={`${place.category} | ${place.distance}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}

export default AdminPage;