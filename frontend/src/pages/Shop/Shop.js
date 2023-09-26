import React from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Container,
} from "@mui/material";
import { styled } from "@mui/system";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const products = [
  {
    id: 1,
    name: "Pen",
    description: "A high-quality ballpoint pen for smooth writing.",
    price: "200 Credits",
    image: "pen.jpg", // Replace with your product image
  },
  {
    id: 2,
    name: "Notebook",
    description: "A ruled notebook for all your note-taking needs.",
    price: "$500 Credits",
    image: "notebook.jpg", // Replace with your product image
  },
  {
    id: 3,
    name: "T-shirt",
    description: "A comfortable T-shirt with a modern design.",
    price: "1000 Credits",
    image: "tshirt.jpg", // Replace with your product image
  },
];

const Shop = () => {
  return (
    <Container sx={{ marginTop: "2rem" }}>
      <Typography variant="h4" color="primary" sx={{ marginBottom: "1rem" }}>
        Shop Catalog
      </Typography>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card sx={{ height: "100%" }}>
              <CardMedia
                component="img"
                alt={product.name}
                height="200"
                image={product.image}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ marginTop: "1rem" }}>
                  {product.price}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<ShoppingCartIcon />}
                  sx={{ marginTop: "1rem" }}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Shop;
