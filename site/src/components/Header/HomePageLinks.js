/*eslint-disable*/
import React from "react";
import ScrollIntoView from "react-scroll-into-view";

// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// core components
import CustomButton from "components/CustomButtons/Button.js";

// Styles
import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <ListItem className={classes.listItem}>
        <ScrollIntoView selector="#how-it-works">
          <CustomButton
            color="transparent"
            className={classes.navLink}
          >
            How it works
        </CustomButton>
        </ScrollIntoView>
      </ListItem>
      <ListItem className={classes.listItem}>
        <ScrollIntoView selector="#solution">
          <CustomButton
            color="transparent"
            className={classes.navLink}
          >
            Solution
        </CustomButton>
        </ScrollIntoView>
      </ListItem>
      <ListItem className={classes.listItem}>
        <ScrollIntoView selector="#service">
          <CustomButton
            color="transparent"
            className={classes.navLink}
          >
            Service
          </CustomButton>
        </ScrollIntoView>
      </ListItem>
      <ListItem className={classes.listItem}>
        <ScrollIntoView selector="#about-us">
          <CustomButton
            color="transparent"
            className={classes.navLink}
          >
            About
          </CustomButton>
        </ScrollIntoView>
      </ListItem>
      <ListItem className={classes.listItem}>
        <ScrollIntoView selector="#contact-us">
          <CustomButton
            color="transparent"
            className={classes.navLink}
          >
            Contact us
          </CustomButton>
        </ScrollIntoView>
      </ListItem>
      <ListItem className={classes.listItem}>
        <ScrollIntoView selector="#drive">
          <CustomButton
            color="transparent"
            className={classes.navLink}
          >
            Drive
      </CustomButton>
        </ScrollIntoView>
      </ListItem>
    </React.Fragment>
  );
}
