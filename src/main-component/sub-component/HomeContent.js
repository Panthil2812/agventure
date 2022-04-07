import React from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import organic from "../../assets/Images/homeimg.png";
import organic1 from "../../assets/Images/homeimg1.png";
import organic2 from "../../assets/Images/homeimg2.png";
import organic3 from "../../assets/Images/homeimg3.png";
import organic4 from "../../assets/Images/homeimg4.png";

import { CgMonday } from "react-icons/cg";
const Img = styled.img`
  height: 100%;
  width: 100%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
  border-radius: 30px;
`;
const Title = styled.h1`
  color: #325240;
`;
const Content = styled.p`
  color: #325240;
`;

const myArray = [
  organic,
  organic1,
  organic2,
  organic3,
  organic4,
  organic,
  organic1,
  organic2,
  organic3,
  organic4,
];
const rand = myArray[(Math.random() * myArray.length) | 0];

const HomeContect = () => {
  return (
    <>
      <Box
        sx={{ flexGrow: 1, bgcolor: "#f9f9f9", padding: "50px 70px 40px 70px" }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6} md={5}>
            <Box sx={{ height: "600px" }}>
              <Img src={rand} alt="organic1" />
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
                    Best value for money is defined as the most advantageous
                    combination of cost, quality and sustainability to meet
                    customer requirements.cost means consideration of the whole
                    life cost.
                  </Content>
                </div>
              </Box>
              <Box
                sx={{
                  height: "170px",
                  padding: "10px 70px 10px 70px",
                  color: "325240",
                }}
              >
                <div>
                  <Title>
                    <CgMonday sx={{ marign: "8px" }} /> Fresh products delivery
                  </Title>
                  <Content>
                    Here, you can find best options at lower prices, right from
                    fresh fruits, spices, dals, seasonings and vegetables to
                    packaged products, meats, personal care products and
                    beverages. Since, green vegetables provide necessary
                    proteins and vitamins to the body, people prefer to buy
                    vegetables and consume them, in daily food habits.
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
                    Farmers are often members of local, regional, or national
                    farmers' unions or agricultural producers' organizations and
                    can exert significant political influence. The Grange
                    movement in the United States was effective in advancing
                    farmers' agendas, especially against railroad and
                    agribusiness interests early in the 20th century.
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
