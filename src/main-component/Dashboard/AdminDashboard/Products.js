import React from "react";
import { Box, Typography } from "@mui/material";
const Products = () => {
  return (
    <>
      <Box sx={{ marginTop: 4 }}>
        <Typography
          component="h1"
          variant="h5"
          sx={{
            color: "#325240",
            fontWeight: "bold",
            margin: "0 auto 32px auto",
            width: "fit-content",
            borderBottom: "2px outset #325240",
            textAlign: "center",
          }}
        >
          ALL PRODUCTS
        </Typography>
      </Box>
    </>
  );
};
export default Products;
