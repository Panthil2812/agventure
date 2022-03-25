import React from "react";
import { Box, Typography, Backdrop, CircularProgress } from "@mui/material";

const Dashboard = () => {
  return (
    <>
      <Box sx={{ marginTop: 4 }}>
        <Typography
          component="h1"
          variant="h5"
          sx={{
            color: "#325240",
            fontWeight: "bold",
            marginBottom: 4,
            borderBottom: "2px outset #325240",
            textAlign: "center",
          }}
        >
          DASHBORD
        </Typography>
      </Box>
    </>
  );
};
export default Dashboard;
