import React from "react";
import axios from "axios";
import qs from "query-string";
import profile from "../../../assets/Images/profile.png";

import { getCookie } from "../../Validator/CookieFunction";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  useMediaQuery,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  IconButton,
  Dialog,
  Button,
  Grid,
  Chip,
  Card,
  CardMedia,
  Avatar,
  Box,
  Typography,
  Backdrop,
  CircularProgress,
  useTheme,
} from "@mui/material";
const Dashboard = () => {
  return (
    <>
      <Card
        sx={{
          bgcolor: "#f9f9f9",
          margin: "8px",
          padding: "10px",
          alignItem: "center",
          border: "0.5px solid #325240",
          boxShadow: "0 8px 8px 0 rgba(0, 0, 0, 0.2)",
          "&:hover": {
            bgcolor: "#f1f1f1",
          },
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs={1}>
              <Avatar
                alt="Remy Sharp"
                src={profile}
                sx={{ height: "56px", width: "56px" }}
              />
            </Grid>
            <Grid item xs={5}>
              <Typography
                sx={{
                  color: "#325240",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                panthil products
                <br />
                <Typography>price/unit</Typography>
              </Typography>
            </Grid>
            <Grid item xs={2} sx={{ marginTop: "8px" }}>
              {1 ? (
                <Chip label="Vendor" color="warning" sx={{ width: "100px" }} />
              ) : (
                <Chip
                  label="Customer"
                  sx={{
                    width: "100px",
                    bgcolor: "#325240",
                    color: "#fff",
                  }}
                />
              )}
              {/* <Chip label="Vendor" color="warning" />
               */}
            </Grid>
            <Grid item xs={2} sx={{ marginTop: "8px" }}>
              <Chip
                label="Instock"
                sx={{
                  width: "100px",
                  bgcolor: "#325240",
                  color: "#fff",
                }}
              />
            </Grid>
            <Grid item xs={1} sx={{ marginTop: "5px" }}>
              <IconButton
                color="error"
                onClick={() => {
                  // handleClickOpen("q2q2q");
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
            <Grid item xs={1} sx={{ marginTop: "5px" }}>
              <IconButton
                color="error"
                onClick={() => {
                  // handleClickOpen("q2q2q");
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </>
  );
};
export default Dashboard;
