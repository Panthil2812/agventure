import * as React from "react";
import Box from "@mui/material/Box";
import styled, { css } from "styled-components";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import organic1 from "../../assets/organic-01.png";
import organic2 from "../../assets/organic-02.png";
import organic3 from "../../assets/organic-03.png";
import organic4 from "../../assets/organic-04.png";
import organic5 from "../../assets/organic-05.png";
import organic6 from "../../assets/organic-06.png";
import organic7 from "../../assets/organic-07.png";
const Img = styled.img`
  width: 140px;
  height: 90px;
  margin: 5px;
`;
const ImageBar = () => {
  return (
    <>
      <Box
        sx={{
          bgcolor: "#0d4d29",
          height: "100px",
          padding: "50px 70px 40px 70px",
          textAlign: "center",
        }}
      >
        <Img src={organic1} alt="organic1" />
        <Img src={organic2} alt="organic2" />
        <Img src={organic3} alt="organic3" />
        <Img src={organic4} alt="organic4" />
        <Img src={organic5} alt="organic5" />
        <Img src={organic6} alt="organic6" />
        <Img src={organic7} alt="organic7" />
      </Box>
    </>
  );
};
export default ImageBar;
