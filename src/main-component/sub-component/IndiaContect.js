import React from "react";
import "./IndiaContect.css";
import { Link } from "react-router-dom";
import organic from "../../assets/Images/india1.png";
import organic1 from "../../assets/Images/india2.png";
import organic2 from "../../assets/Images/india3.png";
export const IndiaContect = () => {
  return (
    <>
      <div className="projcard-container">
        <div className="projcard projcard-green">
          <div className="projcard-innerbox">
            <img className="projcard-img" src={organic} />
            <div className="projcard-textbox">
              <div className="projcard-title">Indian Agriculture</div>
              <div className="projcard-bar"></div>
              <div className="projcard-description">
                Agriculture is the primary source of livelihood for about 58% of
                India’s population. Gross Value Added by agriculture, forestry,
                and fishing was estimated at Rs. 19.48 lakh crore (US$ 276.37
                billion) in FY20. Share of agriculture and allied sectors in
                gross value added (GVA) of India at current prices stood at 17.8
                % in FY20. Consumer spending in India will return to growth in
                2021 post the pandemic-led contraction, expanding by as much as
                6.6%.
              </div>
              <div className="projcard-tagbox">
                <span>Read More</span>
              </div>
            </div>
          </div>
        </div>

        <div className="projcard projcard-green">
          <div className="projcard-innerbox">
            <img className="projcard-img" src={organic1} />
            <div className="projcard-textbox">
              <div className="projcard-title">
                Indian Agriculture Market Size
              </div>

              <div className="projcard-bar"></div>
              <div className="projcard-description">
                The Economic Survey of India 2020-21 report stated that in FY20,
                the total food grain production in the country was recorded at
                296.65 million tonnes—up by 11.44 million tonnes compared with
                285.21 million tonnes in FY19. The government has set a target
                to buy 42.74 million tonnes from the central pool in FY21; this
                is 10% more than the quantity purchased in FY20. For FY22, the
                government has set a record target for farmers to raise food
                grain production by 2% with 307.31 million tonnes of food
                grains. In FY21, production was recorded at 303.34 million
                tonnes against a target of 301 million tonnes.
              </div>
              <div className="projcard-tagbox">
                <span className="projcard-tag">Read More</span>
              </div>
            </div>
          </div>
        </div>

        <div className="projcard projcard-green">
          <div className="projcard-innerbox">
            <img className="projcard-img" src={organic2} />
            <div className="projcard-textbox">
              <div className="projcard-title">Achievements in the sector</div>
              <div className="projcard-bar"></div>
              <div className="projcard-description">
                As of October 27, 2021, the total rabi area stood at 0.53 lakh
                hectares. As per first advance estimates released by the
                Ministry of Agriculture and Farmers Welfare, record foodgrain
                production of 150.50 million tonnes is likely in the 2021-22
                kharif season. As per first advance estimates released by the
                Ministry of Agriculture and Farmers Welfare, production of rice
                was estimated at 102.36 million tonnes (MT), while production of
                food grains was estimated at 144.52 MT in the crop year 2020-21.
                In July 2021, the first commercial consignment of Kashmir's
                Mishri cherry was shipped to Dubai, paving the way to boost
                horticulture crop exports. In June 2021, India exported 24
                metric tonnes of groundnuts to Nepal from West Bengal, boosting
                groundnut exports from Eastern India. In FY21, India exported
                1.91 lakh tonnes of banana worth Rs. 619 crore (US$ 82.90
                million). Paddy procurement in Kharif Marketing Season (KMS)
                2020-21 until January 10, 2020, reached over 534.44 lakh metric
                tonnes (LMT), an increase of 26.24% against the last year
                corresponding purchase of 423.35 LMT.
              </div>
              <div className="projcard-tagbox">
                <span className="projcard-tag">Read More</span>
              </div>
            </div>
          </div>
        </div>

        {/* <div
          className="projcard projcard-customcolor"
          style={{ "--projcard-color": "#40bd00" }}
        >
          <div className="projcard-innerbox">
            <img
              className="projcard-img"
              src="https://picsum.photos/800/600?image=943"
            />
            <div className="projcard-textbox">
              <div className="projcard-title">Last Card</div>
              <div className="projcard-subtitle">
                That's the last one. Have a nice day!
              </div>
              <div className="projcard-bar"></div>
              <div className="projcard-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </div>
              <div className="projcard-tagbox">
                <span className="projcard-tag">iOS</span>
                <span className="projcard-tag">Android</span>
                <span className="projcard-tag">Cordova</span>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};
export default IndiaContect;
