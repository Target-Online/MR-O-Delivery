import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/ImgInfoArea/ImgInfoArea.js";

import addParcels from "assets/img/service/add-parcels.png";
import realtimeTracking from "assets/img/service/real-time-tracking.png";
import dropOffs from "assets/img/service/drop-offs.png";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export const Service = () => {
  const classes = useStyles();

  return (
    <div className={classes.section} id="service">
      <GridContainer justify="center">
        <GridItem xs={12} sm={6} md={12}>
          <h2 className={classes.title}>
            Send packages to locations for one low price
          </h2>
          <h5 className={classes.description}>
            No setup fees, no minimum volume, collect from A and deliver to
            many.
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
              description="Add parcels to your bucket"
              illusrationSource={addParcels}
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={6} md={4}>
            <InfoArea
              description="Real-time tracking"
              illusrationSource={realtimeTracking}
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={6} md={4}>
            <InfoArea
              description="Route optimisation for optimal cost"
              illusrationSource={dropOffs}
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
};

export default Service;
