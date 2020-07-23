import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export const AboutUs = () => {
  const classes = useStyles();

  return (
    <div className={classes.section} id="about-us">
      <GridContainer justify="center">
        <GridItem xs={12} sm={6} md={6}>
          <h2 className={classes.title}>About Us</h2>
          <h5 className={classes.description}>
            Mr O Delivery is a Nigerian, Asaba based people’s delivery company.
            We deliver foodstuff, ready made food, medications, alcoholic
            drinks, documents, office supplies, jewelries, clothes, shoes etc.
          </h5>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default AboutUs;
