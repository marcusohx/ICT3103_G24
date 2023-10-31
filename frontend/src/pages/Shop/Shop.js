import React, { useState, useEffect } from "react";
import { api } from "services/api";
import {
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Shop = () => {
  const [pinDialogOpen, setPinDialogOpen] = useState(false);
  const [enteredPin, setEnteredPin] = useState("");
  const [currentProductId, setCurrentProductId] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [products, setProducts] = useState([]);
  const refreshPage = () => {
    window.location.reload();
  };
  useEffect(() => {
    // Fetch products from backend when component mounts
    const fetchProducts = async () => {
      try {
        const response = await api.get("product");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); // The empty array means this useEffect runs once when the component mounts

  const handlePurchase = async (productId, price) => {
    try {
      const response = await api.post(
        "purchase/purchaseItem",
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

  const requestPurchase = (productId, price) => {
    // Store productId and price for later use
    setCurrentProductId(productId);
    setCurrentPrice(price);
    setPinDialogOpen(true); // Open the pin dialog
  };

  const verifyPinAndPurchase = async () => {
    try {
      const response = await api.post(
        "user/verifyPin",
        { pin: enteredPin },
        { withCredentials: true }
      );

      if (response.data.success) {
        setPinDialogOpen(false); // Close the pin dialog
        handlePurchase(currentProductId, currentPrice);
      } else {
        alert(response.data.message || "An error occurred.");
      }
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Error verifying the pin. Please try again."
      );
      console.error("Error verifying pin:", error);
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
                  onClick={() => requestPurchase(product._id, product.price)} // Assuming product.price is numerical
                >
                  Buy
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={pinDialogOpen} onClose={() => setPinDialogOpen(false)}>
        <DialogTitle>Enter Pin</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your pin to continue.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="pin"
            label="Pin"
            type="password" // for obfuscation
            fullWidth
            value={enteredPin}
            onChange={(e) => setEnteredPin(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPinDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={verifyPinAndPurchase} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Shop;
