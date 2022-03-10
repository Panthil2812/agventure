import React from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import styled, { css } from "styled-components";

const agri1 =
  "https://images.pexels.com/photos/5425893/pexels-photo-5425893.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
const agri2 =
  "https://images.pexels.com/photos/4946628/pexels-photo-4946628.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500";
const agri3 =
  "https://images.pexels.com/photos/4054850/pexels-photo-4054850.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

const slideImages = [
  {
    url: agri1,
    captionTitle: "Slide Image Title One",
    caption:
      "Learn how to create a responsive slideshow with CSS and JavaScript.",
  },
  {
    url: agri2,
    captionTitle: "Slide Image Title Two",
    caption:
      "Learn how to create a responsive slideshow with CSS and reate a responsive slideshow with CSS andJavaScript.",
  },
  {
    url: agri3,
    captionTitle: "Slide Image Title Three",
    caption:
      "Learn how to create a responsive slideshow to create a responsive with CSS and JavaScript.",
  },
];
const ImageText = styled.span`
  text-align: center;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 25px;
`;
const ImageTitle = styled.span`
  text-align: center;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 50px;
`;
const TextDiv = styled.div`
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: black;
  opacity: 0.8;
  padding: 25px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);

  border-radius: 25px;
`;
const Slideshow = () => {
  return (
    <div
      className="slide-container"
      style={{
        width: "auto",
        height: "485px",
      }}
    >
      <Fade>
        {slideImages.map((slideImage, index) => (
          <div className="each-slide" key={index}>
            <div
              style={{
                backgroundImage: `url(${slideImage.url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "auto",
                height: "485px",
              }}
            >
              <TextDiv>
                <ImageTitle>{slideImage.captionTitle}</ImageTitle>
                <br />
                <br />
                <ImageText>{slideImage.caption}</ImageText>
              </TextDiv>
            </div>
          </div>
        ))}
      </Fade>
    </div>
  );
};
export default Slideshow;
