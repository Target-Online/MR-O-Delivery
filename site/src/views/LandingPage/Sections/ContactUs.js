import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

import LocationDetails from "./Location Details/LocationDetails";

const useStyles = makeStyles(styles);

export const ContactUs = () => {
  const classes = useStyles();

  return (
    <div className={classes.section} id="contact-us">
      <GridContainer justify="center">
        <GridItem xs={12} sm={6} md={8}>
          <h2 className={classes.title}>Contact Us</h2>
          <h5 className={classes.description}>
            Mail, call, or visit, we’re here to chat.
          </h5>
        </GridItem>
      </GridContainer>
      <br />
      <br />
      <br />
      <LocationDetails />
    </div>
  );
};

export default ContactUs;
