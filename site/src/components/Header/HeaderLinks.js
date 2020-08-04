/*eslint-disable*/
import React, { useContext } from "react";
import Button from "@material-ui/core/Button";

// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, AccountCircle } from "@material-ui/icons";

// core components
import CustomButton from "components/CustomButtons/Button.js";
import HomePageLinks from "components/Header/HomePageLinks.js";

// Styles
import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

// Data Store
import { CurrentUserContext } from "Store.js";

import * as api from "api/authApi";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const [currentUser] = useContext(CurrentUserContext);
  const classes = useStyles();

  console.log("props", props);

  return (
    <List className={classes.list}>
      {props.includeHomePageLinks && <HomePageLinks />}
      {currentUser
        ? <ListItem className={classes.listItem}>
        <ListItem className={classes.listItem}>
          <Tooltip title="Dashboard" classes={{ tooltip: classes.tooltip }}>
            <Link to="/dashboard" color="transparent" className={classes.navLink}>
              <Apps className={classes.icons} />
            </Link>
          </Tooltip>
        </ListItem>
        <ListItem className={classes.listItem}>
            <Tooltip title={currentUser.displayName || currentUser.phoneNumber ? "Logout" : "User"} classes={{ tooltip: classes.tooltip }}>
              <Button
                color="transparent"
                onClick={() =>  api.signOut()}
                className={classes.navLink}
              >
                <AccountCircle className={classes.icons} />
                {currentUser.displayName ? currentUser.displayName : currentUser.phoneNumber}
              </Button>
            </Tooltip>
          </ListItem>
          </ListItem>
        : <ListItem className={classes.listItem}>
          <Tooltip
            id="instagram-tooltip"
            title="Login"
            placement={window.innerWidth > 959 ? "top" : "left"}
            classes={{ tooltip: classes.CustomButton }}
          >
            <Button
              color="transparent"
              onClick={() => props.history.push("/login-page")}
              className={classes.navLink}
            >
              Login
            </Button>
          </Tooltip>
        </ListItem>}
    </List>
  );
}
