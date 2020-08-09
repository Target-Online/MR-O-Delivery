/* eslint-disable react/prop-types */
import React from "react";

// nodejs library that concatenates classes
import classNames from "classnames";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Home from "@material-ui/icons/Home";
import Motorcycle from "@material-ui/icons/Motorcycle";
// core components

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";

import picPlaceHolder from "assets/img/faces/user.png";

import styles from "assets/jss/material-kit-react/views/profilePage.js";

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const { driver } = props;
  return (
    <div>
      <Parallax
        disableTranform
        style={{ height: 300, marginTop: -120 }}
        image={require("assets/img/banners/banner-mockup.jpg")}
      />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12}>
                <div className={classes.profile}>
                  <div>
                    <img
                      src={
                        driver.profilePicUrl
                          ? driver.profilePicUrl
                          : picPlaceHolder
                      }
                      alt="..."
                      className={imageClasses}
                      style={{ height: 150, width: 150 }}
                    />
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>
                      {driver ? driver.displayName : ""}
                    </h3>
                    <h6>{driver ? driver.phoneNumber : ""}</h6>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                <NavPills
                  alignCenter
                  color="primary"
                  tabs={[
                    {
                      tabButton: "Address",
                      tabIcon: Home,
                      tabContent: <h3>{driver ? driver.address : ""}</h3>,
                    },
                    {
                      tabButton: "Registration",
                      tabIcon: Motorcycle,
                      tabContent: (
                        <h3>{driver ? driver.vehicleRegistration : ""}</h3>
                      ),
                    },
                  ]}
                />
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
