import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, Divider } from "@mui/material";
import { api } from "services/api";

function UserTransactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    api
      .get(
        "transaction/transactionsbyuser", // Adjusted the endpoint
        { withCredentials: true }
      )
      .then((response) => {
        setTransactions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        px: 3,
        py: 5,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Transactions
      </Typography>
      <Divider sx={{ width: "100%", mb: 2 }} />
      {transactions.map((transaction) => (
        <Paper
          key={transaction.transactionId}
          sx={{
            mb: 2,
            p: 2,
            width: "100%",
            maxWidth: 600,
            borderRadius: 2,
            border: "1px solid #000",
          }}
        >
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Transaction ID: {transaction.transactionId}
            </Typography>

            <Typography variant="body2" gutterBottom>
              Product Name: {transaction.productName}
            </Typography>
            <Typography variant="body1">
              Product Price: {transaction.productPrice}
            </Typography>
          </Box>
        </Paper>
      ))}
    </Box>
  );
}

export default UserTransactions;
