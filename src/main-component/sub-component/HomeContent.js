import React from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import organic1 from "../../assets/Images/homeimg.jpeg";

import { CgMonday } from "react-icons/cg";
const Img = styled.img`
  height: 100%;
  width: 100%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
  border-radius: 30px;
`;
const Title = styled.h1`
  color: #0d4d29;
`;
const Content = styled.p`
  color: #0d4d29;
`;
const HomeContect = () => {
  return (
    <>
      <Box
        sx={{ flexGrow: 1, bgcolor: "#f9f9f9", padding: "50px 70px 40px 70px" }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6} md={5}>
            <Box sx={{ height: "600px" }}>
              <Img src={organic1} alt="organic1" />
            </Box>
          </Grid>
          <Grid item xs={6} md={7}>
            <Box sx={{ height: "600px" }}>
              <Box sx={{ height: "170px", padding: "10px 70px 10px 70px" }}>
                <div>
                  <Title>
                    <CgMonday /> Great value for the money
                  </Title>
                  <Content>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    sagittis nibh sit amet quam hendrerit, in suscipit tellus
                    eleifend.
                  </Content>
                </div>
              </Box>
              <Box
                sx={{
                  height: "170px",
                  padding: "10px 70px 10px 70px",
                  color: "0d4d29",
                }}
              >
                <div>
                  <Title>
                    <CgMonday sx={{ marign: "8px" }} /> Fresh products delivery
                  </Title>
                  <Content>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    sagittis nibh sit amet quam hendrerit, in suscipit tellus
                    eleifend.
                  </Content>
                </div>
              </Box>
              <Box sx={{ height: "170px", padding: "10px 70px 10px 70px" }}>
                <div>
                  <Title>
                    {" "}
                    <CgMonday /> Bio fruits from local farmers
                  </Title>
                  <Content>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    sagittis nibh sit amet quam hendrerit, in suscipit tellus
                    eleifend.
                  </Content>
                </div>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default HomeContect;
