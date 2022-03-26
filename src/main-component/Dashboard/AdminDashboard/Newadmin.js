import React from "react";
import { Typography } from "@mui/material";
const Newadmin = () => {
  return (
    <>
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
        ADD NEW ADMIN
      </Typography>
    </>
  );
};
export default Newadmin;
