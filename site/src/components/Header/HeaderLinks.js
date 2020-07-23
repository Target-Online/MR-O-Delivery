/*eslint-disable*/
import React from "react";
import Button from "@material-ui/core/Button";
import { isMobile } from "react-device-detect";
import ScrollIntoView from "react-scroll-into-view";

// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Accessibility } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import CustomButton from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  return (
    <List className={classes.list}>
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
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-tooltip"
          title="Login"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.CustomButton }}
        >
          <Button
            onClick={() => props.history.push("/login-page")}
            style={{
              background: "white",
              borderColor: "#fb9011",
              color: "#fb9011",
              height: 50,
              width: 'inherit'

            }}
            variant="outlined"
          >
            Login
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          title="Create account"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.CustomButton }}
        >
          <Button
            onClick={() => props.history.push("/signup-page")}
            style={{
              marginLeft: isMobile ? 0 : 5,
              background: "#fb9011",
              color: "white",
              height: 50,
              width: 'inherit'
            }}
          >
            Sign Up
          </Button>
        </Tooltip>
      </ListItem>
    </List>
  );
}
