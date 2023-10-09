import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Container,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { NavBarRefreshContext } from "../../contexts/NavBarRefreshContext";
const Shop = () => {
  const [products, setProducts] = useState([]);
  const { toggleRefresh } = useContext(NavBarRefreshContext);
  const refreshPage = () => {
    window.location.reload();
  };
  useEffect(() => {
    // Fetch products from backend when component mounts
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/product");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); // The empty array means this useEffect runs once when the component mounts

  const handlePurchase = async (productId, price) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/purchase/purchaseItem",
        { productId },
        {
          withCredentials: true, // This is the default
        }
      );

      refreshPage();

      alert(response.data.message || "Purchase successful!");
      // Giving feedback to the user. You can replace this with a more sophisticated notification system if you have one in place.
    } catch (error) {
      console.error("Error purchasing product:", error);
      alert(error.response?.data?.message || "Error purchasing product.");
      // Error handling. This assumes your backend sends meaningful error messages.
    }
  };

  return (
    <Container sx={{ marginTop: "2rem" }}>
      <Typography variant="h4" color="primary" sx={{ marginBottom: "1rem" }}>
        Shop Catalog
      </Typography>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4}>
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
                <Typography
                  variant="h6"
                  color="primary"
                  sx={{ marginTop: "1rem" }}
                >
                  {product.price}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<ShoppingCartIcon />}
                  sx={{ marginTop: "1rem" }}
                  onClick={() => handlePurchase(product._id, product.price)} // Assuming product.price is numerical
                >
                  Buy
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
