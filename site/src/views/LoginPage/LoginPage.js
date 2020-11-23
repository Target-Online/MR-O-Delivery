/* eslint-disable react/prop-types */
import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
import { isMobile } from "react-device-detect";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import logo from "assets/img/logo.png";
import flier from "assets/img/Flier.jpg";
import background from "assets/img/app-adverts/background-gif.gif";

import * as api from "api/authApi.js";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const classes = useStyles();
  const { ...rest } = props;

  return (
    <div
      style={{
        height: "155vh",
        background:
          "linear-gradient( rgb(0 0 0 / 27%), rgb(251 144 17 / 73%)),url(" +
          background +
          ")",
      }}
    >
      <Header absolute color="transparent" brand="Mr O Delivery" {...rest} />
      <div style={{ marginTop: isMobile ? -30 : -50 }}>
        <div className={classes.container}>
          <GridContainer justify="center">
            {!isMobile && (
              <GridItem
                style={{
                  backgroundImage: "url(" + flier + ")",
                  backgroundSize: "cover",
                  borderRadius: 6,
                  maxHeight: 517,
                  marginTop: 30,
                  width: 350,
                  backgroundRepeat: "no-repeat",
                  boxShadow:
                    "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
                }}
                xs={12}
                sm={12}
                md={4}
              />
            )}
            <GridItem xs={12} sm={12} md={4}>
              <Card style={{ marginBottom: "auto" }}>
                <form className={classes.form}>
                  <CardHeader
                    style={{
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      backgroundImage: "url(" + logo + ")",
                      height: 150,
                      backgroundSize: "contain",
                    }}
                    className={classes.cardHeader}
                  />
                  <StyledFirebaseAuth
                    uiConfig={api.uiConfig}
                    firebaseAuth={firebase.auth()}
                  />
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer />
      </div>
    </div>
  );
}
