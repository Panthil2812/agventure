import React from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import styled from "styled-components";

const agri1 =
  "https://images.pexels.com/photos/5425893/pexels-photo-5425893.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
const agri2 =
  "https://images.pexels.com/photos/4946628/pexels-photo-4946628.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500";
const agri3 =
  "https://images.pexels.com/photos/4054850/pexels-photo-4054850.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
const caption = [
  "Without farmers, no country can progress",
  "The life of an Indian farmer is dedicated to his fields",
  " Shaping your food",
  "Connecting you to fields",
  "Reforming conventional Agri perspective",
  "Imagine living, impossible without farming",
  "Redefining farming",
  "Become biggest food producers",
  "Reforming Agri Living",
  "Re-explore Agri with us",
  "Keep giving food to world",
  "Imagine food, imagine farming",
  "Green is always better",
  "Connecting with green is better",
  "Green is healthy",
  "Technology for farms",
  "Farming is farmers imagination",
  "Fine agriculture with a difference",
  "Grab the best way to love your field",
  "Caring field caring life",
  "May goddess nature bless farmer’s",
  "Think new Agri technology, think future",
  " Cultivate new ideas cultivate more crops",
  "New farming technology is new in",
  "Exploring cultivation discovering nature",
  "Farming is core of life",
  "Agro innovation",
  "Cultivation gives you what you want",
  "Grow more to get best",
  "Meet the farming needs",
  "Sustainability along with profitable",
  "Explore new cultivating ideas",
  "Agriculture is the most healthful work to do",
  "Agriculture? you can’t live without it",
  "Never lazy and always dedicated, he is an Indian farmer.",
  "The job most can’t handle,",
];
const slideImages = [
  {
    url: agri1,
    captionTitle: caption[(Math.random() * caption.length) | 5],
  },
  {
    url: agri2,
    captionTitle: caption[(Math.random() * caption.length) | 8],
  },
  {
    url: agri3,
    captionTitle: caption[(Math.random() * caption.length) | 2],
  },
];
// const ImageText = styled.span`
//   text-align: center;
//   transform: translate(-50%, -50%);
//   color: white;
//   font-size: 25px;
// `;
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
                {/* <br />
                <br />
                <ImageText>{slideImage.caption}</ImageText> */}
              </TextDiv>
            </div>
          </div>
        ))}
      </Fade>
    </div>
  );
};
export default Slideshow;
