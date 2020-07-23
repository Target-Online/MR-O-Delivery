import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons;
import LooksOne from "@material-ui/icons/LooksOne";
import LooksTwo from "@material-ui/icons/LooksTwo";
import Looks3 from "@material-ui/icons/Looks3";
import Looks4 from "@material-ui/icons/Looks4";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import ProcessInfoStep from "components/ProcessInfoStep/ProcessInfoStep.js";

import collectionPoint from "assets/img/how-it-works/collection-point.svg";
import parcelDetails from "assets/img/how-it-works/parcel-details.png";
import dropOffPoints from "assets/img/how-it-works/drop-off-points.svg";
import deliver from "assets/img/how-it-works/deliver.png";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export const HowItWorks = () => {
  const classes = useStyles();

  return (
    <div className={classes.section} id="how-it-works">
      <GridContainer justify="center">
        <GridItem xs={12} sm={6} md={8}>
          <h2 className={classes.title}>How it works</h2>
          <h5 className={classes.description}>
            We{"'"}ve simplified the entire process from the first to last mile.
          </h5>
        </GridItem>
      </GridContainer>
      <br/>
      <br/>
      <br/>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <ProcessInfoStep
              description="Choose a collection point."
              illusrationSource={collectionPoint}
              icon={LooksOne}
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <ProcessInfoStep
              description="Enter your parcel's details."
              illusrationSource={parcelDetails}
              icon={LooksTwo}
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <ProcessInfoStep
              description="Choose drop-off point(s)"
              illusrationSource={dropOffPoints}
              icon={Looks3}
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <ProcessInfoStep
              description="We picup and deliver, fast!"
              illusrationSource={deliver}
              icon={Looks4}
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
};

export default HowItWorks;
