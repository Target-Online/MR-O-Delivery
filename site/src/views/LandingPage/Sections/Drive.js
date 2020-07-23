import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { isMobile } from "react-device-detect";
import ScrollIntoView from "react-scroll-into-view";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/ImgInfoArea/ImgInfoArea.js";

import workFlexibleHours from "assets/img/drive/work-flexible-hours.png";
import app from "assets/img/drive/app.png";
import bikes from "assets/img/drive/bikes.png";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(styles);

export const Drive = () => {
  const classes = useStyles();

  return (
    <div className={classes.section} id="drive">
      <GridContainer justify="center">
        <GridItem xs={12} sm={6} md={12}>
          <h2 className={classes.title}>Drive and earn with us</h2>
          <h5 className={classes.description}>
            Take control of your time and earning potential.
          </h5>
        </GridItem>
      </GridContainer>
      <br />
      <br />
      <br />
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={4}>
            <InfoArea
              description="Work flexible hours"
              illusrationSource={workFlexibleHours}
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={6} md={4}>
            <InfoArea
              description="Go on the app and earn as much as you want"
              illusrationSource={app}
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={6} md={4}>
            <InfoArea
              description="Company bikes available for use"
              illusrationSource={bikes}
              vertical
            />
          </GridItem>
        </GridContainer>
        <br />
        <br />
        <br />
        <GridContainer style={extra_styles.card}>
          <GridItem xs={12} sm={12} md={8}>
            <h2>Join the family</h2>
            <h4>If your are interested get in touch to become a drive.</h4>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <ScrollIntoView selector="#contact-us">
              <Button style={extra_styles.button_outlined} variant="outlined">
                Become a driver
              </Button>
            </ScrollIntoView>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
};

const extra_styles = {
  button_outlined: {
    background: "white",
    borderColor: "#fb9011",
    color: "#fb9011",
    width: isMobile ? "initial" : 300,
    height: 54,
    marginTop: 5,
  },
  card: {
    border: "1px solid #e9ecef",
    borderLeft: "2px solid #fb9011",
    color: "gray",
    borderRadius: "0.25rem",
    margin: "10px",
    padding: "3rem",
    alignItems: "center",
    textAlign: "start",
  },
};

export default Drive;
