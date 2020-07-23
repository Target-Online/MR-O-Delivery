import React from "react";
// react component for creating beautiful carousel
import Carousel from "react-slick";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import footerImage from "assets/img/app-adverts/4.png";

import styles from "assets/jss/material-kit-react/views/componentsSections/carouselStyle.js";

const useStyles = makeStyles(styles);

export default function FooterPoster() {
  const classes = useStyles();
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
  };
  return (
    <div
      className={classes.section}
      style={{ paddingTop: 0 }}
      id="download-app-now"
    >
      <div className={classes.container}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12} className={classes.marginAuto}>
            <Carousel {...settings}>
              <div>
                <img
                  src={footerImage}
                  alt="Footer Poster"
                  className="slick-image"
                />
              </div>
            </Carousel>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
